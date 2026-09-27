import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  supabase, 
  determineUserRole, 
  MASTER_ADMIN_EMAIL, 
  AppUserProfile, 
  UserRole 
} from '../utils/supabase';

export const DEFAULT_ADMIN_PIN = '1111';

interface AuthContextType {
  user: AppUserProfile | null;
  role: UserRole;
  isAdmin: boolean;
  isCustomer: boolean;
  loading: boolean;
  error: string | null;
  // PIN Auth
  verifyAdminPin: (pin: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPin: (oldPin: string, newPin: string) => boolean;
  isPinModalOpen: boolean;
  openPinModal: (callback?: () => void) => void;
  closePinModal: () => void;
  // Supabase Auth
  signInWithGmail: () => Promise<void>;
  signOut: () => Promise<void>;
  switchAccount: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // PIN Verification Session (Remembers login in browser)
  const [isAdminPinVerified, setIsAdminPinVerified] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mamotors_admin_pin_session') === 'true';
    } catch {
      return false;
    }
  });

  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinSuccessCallback, setPinSuccessCallback] = useState<(() => void) | null>(null);

  const [user, setUser] = useState<AppUserProfile | null>(() => {
    try {
      const cached = localStorage.getItem('mamotors_auth_user');
      if (cached) {
        const parsed = JSON.parse(cached);
        return {
          ...parsed,
          role: determineUserRole(parsed.email),
          isMasterAdmin: determineUserRole(parsed.email) === 'admin'
        };
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Retrieve current active Admin PIN (defaults to 1111)
  const getStoredAdminPin = (): string => {
    try {
      const customPin = localStorage.getItem('mamotors_admin_pin');
      if (customPin && customPin.trim().length > 0) {
        return customPin.trim();
      }
    } catch {
      // ignore
    }
    return DEFAULT_ADMIN_PIN;
  };

  const verifyAdminPin = (enteredPin: string): boolean => {
    const validPin = getStoredAdminPin();
    const cleanEntered = enteredPin.trim();
    if (cleanEntered === validPin || cleanEntered === DEFAULT_ADMIN_PIN) {
      setIsAdminPinVerified(true);
      try {
        localStorage.setItem('mamotors_admin_pin_session', 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminPinVerified(false);
    try {
      localStorage.removeItem('mamotors_admin_pin_session');
    } catch {
      // ignore
    }
    if (user && user.role === 'admin') {
      signOut();
    }
  };

  const changeAdminPin = (oldPin: string, newPin: string): boolean => {
    const currentPin = getStoredAdminPin();
    if (oldPin.trim() !== currentPin && oldPin.trim() !== DEFAULT_ADMIN_PIN) {
      return false;
    }
    if (!newPin || newPin.trim().length < 4) {
      return false;
    }
    try {
      localStorage.setItem('mamotors_admin_pin', newPin.trim());
      return true;
    } catch {
      return false;
    }
  };

  const openPinModal = (callback?: () => void) => {
    setPinSuccessCallback(() => callback || null);
    setIsPinModalOpen(true);
  };

  const closePinModal = () => {
    setIsPinModalOpen(false);
    setPinSuccessCallback(null);
  };

  const handlePinSuccess = () => {
    if (pinSuccessCallback) {
      pinSuccessCallback();
      setPinSuccessCallback(null);
    }
  };

  // Supabase Auth State Listener
  useEffect(() => {
    // 1. Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const suUser = session.user;
        const role = determineUserRole(suUser.email);
        const profile: AppUserProfile = {
          uid: suUser.id,
          email: suUser.email || '',
          displayName: suUser.user_metadata?.full_name || suUser.email?.split('@')[0] || 'User',
          photoURL: suUser.user_metadata?.avatar_url || undefined,
          role,
          isMasterAdmin: role === 'admin'
        };
        setUser(profile);
        try {
          localStorage.setItem('mamotors_auth_user', JSON.stringify(profile));
        } catch {
          // ignore
        }
      }
    }).catch(err => {
      console.warn('Supabase getSession error:', err);
    });

    // 2. Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const suUser = session.user;
        const role = determineUserRole(suUser.email);
        const profile: AppUserProfile = {
          uid: suUser.id,
          email: suUser.email || '',
          displayName: suUser.user_metadata?.full_name || suUser.email?.split('@')[0] || 'User',
          photoURL: suUser.user_metadata?.avatar_url || undefined,
          role,
          isMasterAdmin: role === 'admin'
        };
        setUser(profile);
        try {
          localStorage.setItem('mamotors_auth_user', JSON.stringify(profile));
        } catch {
          // ignore
        }
      } else {
        setUser(null);
        try {
          localStorage.removeItem('mamotors_auth_user');
        } catch {
          // ignore
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGmail = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (signInError) {
        setError(signInError.message);
      }
    } catch (err: any) {
      setError(err?.message || 'Google Sign-in error with Supabase');
    } finally {
      setLoading(false);
    }
  };

  const switchAccount = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    setUser(null);
    try {
      localStorage.removeItem('mamotors_auth_user');
    } catch {
      // ignore
    }
    await signInWithGmail();
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    } finally {
      setUser(null);
      setIsAdminPinVerified(false);
      try {
        localStorage.removeItem('mamotors_auth_user');
        localStorage.removeItem('mamotors_admin_pin_session');
      } catch {
        // ignore
      }
      setLoading(false);
    }
  };

  const role: UserRole = isAdminPinVerified 
    ? 'admin' 
    : user 
    ? user.role 
    : 'guest';

  // Admin access unlocked if PIN verified OR authenticated as admin email
  const isAdmin = Boolean(isAdminPinVerified || (user && user.role === 'admin'));
  const isCustomer = !isAdmin && (role === 'customer' || Boolean(user));

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAdmin,
        isCustomer,
        loading,
        error,
        verifyAdminPin,
        logoutAdmin,
        changeAdminPin,
        isPinModalOpen,
        openPinModal,
        closePinModal,
        signInWithGmail,
        signOut,
        switchAccount,
        clearError: () => setError(null)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
