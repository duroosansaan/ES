import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with Database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

// Validate Connection on Boot
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore successfully connected!');
  } catch (error: any) {
    if (error?.message?.includes('the client is offline')) {
      console.warn('Firebase Firestore is currently offline.');
    } else {
      console.log('Firebase Firestore connection verified.');
    }
  }
}

// Helper to save client inquiry / booking to Firebase
export async function saveClientInquiry(data: {
  name: string;
  phone: string;
  businessType?: string;
  selectedPackage?: string;
  notes?: string;
  createdAt: string;
}) {
  const { collection, addDoc } = await import('firebase/firestore');
  return addDoc(collection(db, 'orders'), {
    clientName: data.name,
    phone: data.phone,
    orderDetails: `[${data.businessType || 'استفسار'}] الباقة: ${data.selectedPackage || 'غير محدد'}`,
    notes: data.notes || '',
    status: 'new',
    createdAt: data.createdAt
  });
}
