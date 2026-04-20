import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
  writeBatch } from
'firebase/firestore';
import { db } from './firebase';

// Log a single page visit to Firestore.
// Silently fails so visitors never see errors.
export async function logVisit(path: string) {
  try {
    await addDoc(collection(db, 'visits'), {
      path,
      createdAt: serverTimestamp(),
      userAgent:
      typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      referrer: typeof document !== 'undefined' ? document.referrer : ''
    });
  } catch (e) {
    console.warn('[analytics] visit log failed', e);
  }
}

export interface ContactPayload {
  intent: 'feedback' | 'work';
  name: string;
  email: string;
  company?: string;
  budget?: string;
  rating?: string;
  message: string;
}

export async function saveContactSubmission(payload: ContactPayload) {
  // Strip undefined values — Firestore rejects them
  const clean: Record<string, any> = {
    read: false,
    createdAt: serverTimestamp()
  };
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined) clean[key] = value;
  }
  await addDoc(collection(db, 'contacts'), clean);
}

export async function markContactRead(id: string, read: boolean) {
  await updateDoc(doc(db, 'contacts', id), { read });
}

export async function deleteContact(id: string) {
  await deleteDoc(doc(db, 'contacts', id));
}

// Bulk delete by IDs — chunks writes into batches of 450 (under Firestore's 500 limit)
async function deleteByIds(collectionName: string, ids: string[]) {
  const chunks: string[][] = [];
  for (let i = 0; i < ids.length; i += 450) {
    chunks.push(ids.slice(i, i + 450));
  }
  for (const chunk of chunks) {
    const batch = writeBatch(db);
    chunk.forEach((id) => batch.delete(doc(db, collectionName, id)));
    await batch.commit();
  }
}

export async function deleteVisits(ids: string[]) {
  if (ids.length === 0) return;
  await deleteByIds('visits', ids);
}

export async function deleteAllVisits() {
  const snap = await getDocs(collection(db, 'visits'));
  await deleteByIds(
    'visits',
    snap.docs.map((d) => d.id)
  );
}

export async function deleteContacts(ids: string[]) {
  if (ids.length === 0) return;
  await deleteByIds('contacts', ids);
}

export async function deleteAllContacts() {
  const snap = await getDocs(collection(db, 'contacts'));
  await deleteByIds(
    'contacts',
    snap.docs.map((d) => d.id)
  );
}