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

interface AuthContextType {
  user: AppUserProfile | null;
  role: UserRole;
  isAdmin: boolean;
  isCustomer: boolean;
  loading: boolean;
  error: string | null;
  signInWithGmail: () => Promise<void>;
  signOut: () => Promise<void>;
  switchAccount: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Process redirect result when returning from Google's page
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
      } else {
        const cached = localStorage.getItem('mamotors_auth_user');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            setUser(parsed);
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setLoading(false);
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

    // Mobile outside iframe: direct redirect to Google page (accounts.google.com)
    if (isMobile && !inIframe) {
      try {
        await signInWithRedirect(auth, googleProvider);
        return;
      } catch (redirectErr: any) {
        console.warn('Redirect call failed, falling back to popup:', redirectErr);
      }
    }

    // Desktop or inside iframe: open Google account chooser popup
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
      console.warn('Popup login attempt:', err?.code, err?.message);
      // If popup was blocked or failed with network-request-failed on mobile, fallback to signInWithRedirect
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
    // Directly go to Google's page with select_account prompt
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
      try {
        localStorage.removeItem('mamotors_auth_user');
      } catch {
        // ignore
      }
      setLoading(false);
    }
  };

  const role: UserRole = user ? user.role : 'guest';
  const isAdmin = role === 'admin';
  const isCustomer = role === 'customer';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAdmin,
        isCustomer,
        loading,
        error,
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
