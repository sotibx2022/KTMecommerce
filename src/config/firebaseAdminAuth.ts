import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { config } from './configuration';
// Initialize outside the conditional for better type safety
let app: App | undefined;
let adminAuth: Auth | undefined;
if (!getApps().length) {
  try {
    app = initializeApp({
      credential: cert({
        projectId: config.firebase.projectId,
        clientEmail: config.firebase.firebaseclientEmail, // Changed from firebaseclientEmail
        privateKey: config.firebase.firebaseprivateKey.replace(/\\n/g, '\n') // Removed optional chaining
      }),
    });
    adminAuth = getAuth(app);
  } catch (error) {
    throw new Error(`Firebase Admin initialization failed: ${error instanceof Error ? error.message : String(error)}`);
  }
} else {
  app = getApps()[0];
  adminAuth = getAuth(app);
}
if (!adminAuth) {
  throw new Error('Firebase Admin Auth not initialized');
}
export { adminAuth, app };