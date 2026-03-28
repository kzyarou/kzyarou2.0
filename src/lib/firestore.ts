import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  getCountFromServer } from
'firebase/firestore';
import { db } from './firebase';

export interface FeedbackData {
  name?: string;
  feedbackType: string;
  rating: number;
  message: string;
  createdAt?: any;
}

export interface InquiryData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
  createdAt?: any;
}

export const saveFeedback = async (data: FeedbackData) => {
  try {
    await addDoc(collection(db, 'feedback'), {
      ...data,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw error;
  }
};

export const saveInquiry = async (data: InquiryData) => {
  try {
    await addDoc(collection(db, 'inquiries'), {
      ...data,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    throw error;
  }
};

export const trackVisit = async () => {
  try {
    if (!sessionStorage.getItem('hasVisited')) {
      await addDoc(collection(db, 'visits'), {
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent
      });
      sessionStorage.setItem('hasVisited', 'true');
    }
  } catch (error) {
    console.error('Error tracking visit:', error);
  }
};

export const getVisitCount = async () => {
  try {
    const coll = collection(db, 'visits');
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  } catch (error) {
    console.error('Error getting visit count:', error);
    return 0;
  }
};

export const getAllFeedback = async () => {
  try {
    const q = query(collection(db, 'feedback'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting feedback:', error);
    return [];
  }
};

export const getAllInquiries = async () => {
  try {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting inquiries:', error);
    return [];
  }
};