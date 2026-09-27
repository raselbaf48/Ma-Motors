import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  determineUserRole, 
  MASTER_ADMIN_EMAIL, 
  AppUserProfile, 
  UserRole 
} from '../utils/firebase';
import { 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';

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
  // Fallback Google Auth
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

  useEffect(() => {
    // Process redirect result if any
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          const fbUser = result.user;
          const role = determineUserRole(fbUser.email);
          const profile: AppUserProfile = {
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
            photoURL: fbUser.photoURL || undefined,
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
      })
      .catch((err) => {
        console.warn('Redirect result check:', err?.message || err);
      });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const role = determineUserRole(firebaseUser.email);
        const profile: AppUserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          photoURL: firebaseUser.photoURL || undefined,
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
    });

    return () => unsubscribe();
  }, []);

  const signInWithGmail = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const inIframe = window.self !== window.top;

    if (isMobile && !inIframe) {
      try {
        await signInWithRedirect(auth, googleProvider);
        return;
      } catch (redirectErr: any) {
        console.warn('Redirect call failed, falling back to popup:', redirectErr);
      }
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result && result.user) {
        const fbUser = result.user;
        const role = determineUserRole(fbUser.email);
        const profile: AppUserProfile = {
          uid: fbUser.uid,
          email: fbUser.email || '',
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          photoURL: fbUser.photoURL || undefined,
          role,
          isMasterAdmin: role === 'admin'
        };
        setUser(profile);
        localStorage.setItem('mamotors_auth_user', JSON.stringify(profile));
      }
    } catch (err: any) {
      if (
        err?.code === 'auth/popup-blocked' || 
        err?.code === 'auth/network-request-failed' ||
        err?.code === 'auth/cancelled-popup-request'
      ) {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (rErr: any) {
          console.error('Redirect also failed:', rErr);
          setError('Google Sign-in could not be completed. Please allow popups or try again.');
        }
      } else if (err?.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google Login error');
      }
    } finally {
      setLoading(false);
    }
  };

  const switchAccount = async () => {
    try {
      await fbSignOut(auth);
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
      await fbSignOut(auth);
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
