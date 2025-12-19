/**
 * AUTHENTICATION SERVICE
 * Handles patient signup, login, logout, and password management
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  updatePassword
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

/**
 * Sign up a new patient
 */
export async function signupPatient(email, password, patientData) {
  try {
    // Create authentication user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Update auth profile
    await updateProfile(userCredential.user, {
      displayName: `${patientData.firstName} ${patientData.lastName}`
    });

    // Create patient document in Firestore
    const patientDoc = {
      uid,
      email,
      firstName: patientData.firstName || '',
      lastName: patientData.lastName || '',
      age: patientData.age || null,
      dateOfBirth: patientData.dateOfBirth || '',
      gender: patientData.gender || '',
      diagnosis: patientData.diagnosis || '',
      therapistEmail: patientData.therapistEmail || '',
      language: patientData.language || 'en-IN',
      theme: 'light',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginAt: new Date()
    };

    await setDoc(doc(db, 'patients', uid), patientDoc);

    // Create default empty AAC board
    const defaultBoard = {
      patientId: uid,
      title: 'My Communication Board',
      boards: {
        root: {
          id: 'root',
          title: 'Main Board',
          items: []
        }
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: false
    };
    await setDoc(doc(db, 'patients', uid, 'aacBoards', 'default'), defaultBoard);

    // Create default empty visual schedule
    const defaultSchedule = {
      patientId: uid,
      title: 'Daily Schedule',
      steps: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: false
    };
    await setDoc(doc(db, 'patients', uid, 'visualSchedules', 'default'), defaultSchedule);

    return {
      success: true,
      uid,
      user: userCredential.user,
      message: 'Patient account created successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Signup failed'
    };
  }
}

/**
 * Login a patient
 */
export async function loginPatient(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Update last login time
    await updateDoc(doc(db, 'patients', uid), {
      lastLoginAt: new Date()
    });

    // Fetch patient data
    const patientSnap = await getDoc(doc(db, 'patients', uid));
    const patientData = patientSnap.exists() ? patientSnap.data() : null;

    return {
      success: true,
      user: userCredential.user,
      patientData,
      message: 'Login successful'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Login failed'
    };
  }
}

/**
 * Logout patient
 */
export async function logoutPatient() {
  try {
    await signOut(auth);
    return {
      success: true,
      message: 'Logout successful'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Logout failed'
    };
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent. Check your email.'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to send reset email'
    };
  }
}

/**
 * Change password for logged-in user
 */
export async function changePassword(newPassword) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is currently logged in');
    }
    await updatePassword(user, newPassword);
    return {
      success: true,
      message: 'Password updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to change password'
    };
  }
}

/**
 * Get current patient
 */
export function getCurrentPatient() {
  return auth.currentUser;
}

/**
 * Get patient data from Firestore
 */
export async function getPatientData(patientId) {
  try {
    const patientSnap = await getDoc(doc(db, 'patients', patientId));
    if (patientSnap.exists()) {
      return {
        success: true,
        data: patientSnap.data()
      };
    } else {
      return {
        success: false,
        error: 'Patient not found'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch patient data'
    };
  }
}

/**
 * Update patient data
 */
export async function updatePatientData(patientId, updates) {
  try {
    await updateDoc(doc(db, 'patients', patientId), {
      ...updates,
      updatedAt: new Date()
    });
    return {
      success: true,
      message: 'Patient data updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to update patient data'
    };
  }
}

export default {
  signupPatient,
  loginPatient,
  logoutPatient,
  resetPassword,
  changePassword,
  getCurrentPatient,
  getPatientData,
  updatePatientData
};
