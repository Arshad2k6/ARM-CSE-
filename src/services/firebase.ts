import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// Use the firestoreDatabaseId if provided, or default
export const db = (firebaseConfig as any).firestoreDatabaseId
  ? getFirestore(app, (firebaseConfig as any).firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth(app);

// Provider with Google Tasks scope
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/tasks');

// In-memory token storage (MANDATORY per workspace integration skill)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(p => ({
        providerId: p.providerId,
        email: p.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase client is currently offline or connecting.");
    }
  }
}
testConnection();

// Auth state management
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // User logged in, but token might need retrieval or sign-in popup
        if (onAuthSuccess) onAuthSuccess(user, '');
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      // Some auth configurations return user without separate workspace access token if scopes were granted
      cachedAccessToken = '';
    } else {
      cachedAccessToken = credential.accessToken;
    }
    return { user: result.user, accessToken: cachedAccessToken || '' };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Firestore helper functions for User Study Progress
export interface StudyProgressRecord {
  userId: string;
  topicId: string;
  subjectId: string;
  status: 'not_started' | 'in_progress' | 'mastered';
  notes?: string;
  bookmarkedResourceIds?: string[];
  updatedAt: string;
}

export async function saveTopicProgress(userId: string, progress: StudyProgressRecord) {
  const docPath = `users/${userId}/studyProgress/${progress.topicId}`;
  try {
    await setDoc(doc(db, docPath), progress);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, docPath);
  }
}

export function subscribeToUserProgress(userId: string, callback: (records: Record<string, StudyProgressRecord>) => void) {
  const collectionPath = `users/${userId}/studyProgress`;
  return onSnapshot(
    collection(db, collectionPath),
    (snapshot) => {
      const records: Record<string, StudyProgressRecord> = {};
      snapshot.forEach(docSnap => {
        records[docSnap.id] = docSnap.data() as StudyProgressRecord;
      });
      callback(records);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, collectionPath);
    }
  );
}

// Firestore helper functions for Study Tasks
export interface UserTaskRecord {
  id?: string;
  userId: string;
  topicId: string;
  title: string;
  dueDate?: string;
  googleTaskId?: string;
  completed: boolean;
  createdAt: string;
}

export async function saveStudyTask(userId: string, taskId: string, task: UserTaskRecord) {
  const docPath = `users/${userId}/studyTasks/${taskId}`;
  try {
    await setDoc(doc(db, docPath), task);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, docPath);
  }
}

export async function deleteStudyTask(userId: string, taskId: string) {
  const docPath = `users/${userId}/studyTasks/${taskId}`;
  try {
    await deleteDoc(doc(db, docPath));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, docPath);
  }
}

export function subscribeToUserTasks(userId: string, callback: (tasks: UserTaskRecord[]) => void) {
  const collectionPath = `users/${userId}/studyTasks`;
  return onSnapshot(
    collection(db, collectionPath),
    (snapshot) => {
      const tasks: UserTaskRecord[] = [];
      snapshot.forEach(docSnap => {
        tasks.push({ id: docSnap.id, ...(docSnap.data() as UserTaskRecord) });
      });
      callback(tasks);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, collectionPath);
    }
  );
}
