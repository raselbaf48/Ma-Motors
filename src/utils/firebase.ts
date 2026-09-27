import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

export const MASTER_ADMIN_EMAIL = 'raselbaf48@gmail.com';
export const DEFAULT_ADMIN_EMAILS = [
  'raselbaf48@gmail.com',
  'rasel399486@gmail.com'
];

export function getAdminEmails(): string[] {
  try {
    const custom = localStorage.getItem('mamotors_admin_emails');
    if (custom) {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return Array.from(new Set([MASTER_ADMIN_EMAIL.toLowerCase(), ...parsed.map(e => String(e).trim().toLowerCase())]));
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_ADMIN_EMAILS.map(e => e.toLowerCase());
}

export function isEmailAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  return getAdminEmails().includes(cleanEmail);
}

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth Provider with account selection prompt
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export type UserRole = 'admin' | 'customer' | 'guest';

export interface AppUserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  isMasterAdmin: boolean;
}

export function determineUserRole(email: string | null | undefined): UserRole {
  if (!email) return 'guest';
  return isEmailAdmin(email) ? 'admin' : 'customer';
}

export async function loginWithGmail(): Promise<AppUserProfile> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  const role = determineUserRole(user.email);

  const profile: AppUserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || user.email?.split('@')[0] || 'User',
    photoURL: user.photoURL || undefined,
    role,
    isMasterAdmin: role === 'admin'
  };

  // Cache user info in localStorage for instant retrieval
  try {
    localStorage.setItem('mamotors_auth_user', JSON.stringify(profile));
  } catch {
    // ignore
  }

  return profile;
}

export async function logoutUser(): Promise<void> {
  await fbSignOut(auth);
  try {
    localStorage.removeItem('mamotors_auth_user');
  } catch {
    // ignore
  }
}
