/**
 * PATIENT DATA SERVICE
 * Handles all CRUD operations for patient-related data in Firestore
 */

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { getPatientData } from './authService';

// ============= AAC BOARD OPERATIONS =============

/**
 * Save or update AAC board for a patient
 */
export async function saveAACBoard(patientId, boardData, boardId = 'default') {
  try {
    const boardRef = doc(db, 'patients', patientId, 'aacBoards', boardId);
    
    await setDoc(boardRef, {
      ...boardData,
      patientId,
      updatedAt: Timestamp.now()
    }, { merge: true });

    return {
      success: true,
      boardId,
      message: 'AAC board saved successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to save AAC board'
    };
  }
}

/**
 * Get AAC board for a patient
 */
export async function getAACBoard(patientId, boardId = 'default') {
  try {
    const boardSnap = await getDoc(doc(db, 'patients', patientId, 'aacBoards', boardId));
    
    if (boardSnap.exists()) {
      return {
        success: true,
        data: boardSnap.data()
      };
    } else {
      return {
        success: false,
        error: 'Board not found'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch AAC board'
    };
  }
}

/**
 * Get all AAC boards for a patient
 */
export async function getPatientAACBoards(patientId) {
  try {
    const boardsQuery = query(collection(db, 'patients', patientId, 'aacBoards'));
    const querySnapshot = await getDocs(boardsQuery);
    
    const boards = [];
    querySnapshot.forEach((doc) => {
      boards.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return {
      success: true,
      data: boards
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch boards'
    };
  }
}

// ============= VISUAL SCHEDULE OPERATIONS =============

/**
 * Save or update visual schedule for a patient
 */
export async function saveVisualSchedule(patientId, scheduleData, scheduleId = 'default') {
  try {
    const scheduleRef = doc(db, 'patients', patientId, 'visualSchedules', scheduleId);
    
    await setDoc(scheduleRef, {
      ...scheduleData,
      patientId,
      updatedAt: Timestamp.now()
    }, { merge: true });

    return {
      success: true,
      scheduleId,
      message: 'Visual schedule saved successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to save visual schedule'
    };
  }
}

/**
 * Get visual schedule for a patient
 */
export async function getVisualSchedule(patientId, scheduleId = 'default') {
  try {
    const scheduleSnap = await getDoc(doc(db, 'patients', patientId, 'visualSchedules', scheduleId));
    
    if (scheduleSnap.exists()) {
      return {
        success: true,
        data: scheduleSnap.data()
      };
    } else {
      return {
        success: false,
        error: 'Schedule not found'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch visual schedule'
    };
  }
}

/**
 * Get all visual schedules for a patient
 */
export async function getPatientVisualSchedules(patientId) {
  try {
    const schedulesQuery = query(collection(db, 'patients', patientId, 'visualSchedules'));
    const querySnapshot = await getDocs(schedulesQuery);
    
    const schedules = [];
    querySnapshot.forEach((doc) => {
      schedules.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return {
      success: true,
      data: schedules
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch schedules'
    };
  }
}

// ============= ACTIVITY OPERATIONS =============

/**
 * Save or create a new activity for a patient
 */
export async function saveActivity(patientId, activityData, activityId = null) {
  try {
    const id = activityId || `activity_${Date.now()}`;
    const activityRef = doc(db, 'patients', patientId, 'activities', id);
    
    await setDoc(activityRef, {
      ...activityData,
      patientId,
      updatedAt: Timestamp.now()
    }, { merge: true });

    return {
      success: true,
      activityId: id,
      message: 'Activity saved successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to save activity'
    };
  }
}

/**
 * Get a single activity
 */
export async function getActivity(patientId, activityId) {
  try {
    const activitySnap = await getDoc(doc(db, 'patients', patientId, 'activities', activityId));
    
    if (activitySnap.exists()) {
      return {
        success: true,
        data: activitySnap.data()
      };
    } else {
      return {
        success: false,
        error: 'Activity not found'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch activity'
    };
  }
}

/**
 * Get all activities for a patient
 */
export async function getPatientActivities(patientId, category = null) {
  try {
    let activitiesQuery;
    
    if (category) {
      activitiesQuery = query(
        collection(db, 'patients', patientId, 'activities'),
        where('category', '==', category)
      );
    } else {
      activitiesQuery = query(collection(db, 'patients', patientId, 'activities'));
    }
    
    const querySnapshot = await getDocs(activitiesQuery);
    
    const activities = [];
    querySnapshot.forEach((doc) => {
      activities.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return {
      success: true,
      data: activities
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch activities'
    };
  }
}

/**
 * Delete an activity
 */
export async function deleteActivity(patientId, activityId) {
  try {
    await deleteDoc(doc(db, 'patients', patientId, 'activities', activityId));
    
    return {
      success: true,
      message: 'Activity deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to delete activity'
    };
  }
}

// ============= PROGRESS & SESSION OPERATIONS =============

/**
 * Save session progress
 */
export async function saveSessionProgress(patientId, progressData, sessionId = null) {
  try {
    const id = sessionId || `session_${Date.now()}`;
    const progressRef = doc(db, 'patients', patientId, 'progress', id);
    
    await setDoc(progressRef, {
      ...progressData,
      patientId,
      createdAt: Timestamp.now()
    }, { merge: true });

    return {
      success: true,
      sessionId: id,
      message: 'Session progress saved'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to save session progress'
    };
  }
}

/**
 * Get session progress
 */
export async function getSessionProgress(patientId, sessionId) {
  try {
    const progressSnap = await getDoc(doc(db, 'patients', patientId, 'progress', sessionId));
    
    if (progressSnap.exists()) {
      return {
        success: true,
        data: progressSnap.data()
      };
    } else {
      return {
        success: false,
        error: 'Session not found'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch session progress'
    };
  }
}

/**
 * Get all progress records for a patient, optionally for specific activity
 */
export async function getPatientProgress(patientId, activityId = null, limitCount = 50) {
  try {
    let progressQuery;
    
    if (activityId) {
      progressQuery = query(
        collection(db, 'patients', patientId, 'progress'),
        where('activityId', '==', activityId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    } else {
      progressQuery = query(
        collection(db, 'patients', patientId, 'progress'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    }
    
    const querySnapshot = await getDocs(progressQuery);
    
    const progress = [];
    querySnapshot.forEach((doc) => {
      progress.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return {
      success: true,
      data: progress
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch progress data'
    };
  }
}

// ============= UTILITY FUNCTIONS =============

/**
 * Export all patient data as JSON
 */
export async function exportPatientData(patientId) {
  try {
    const patient = await getPatientData(patientId);
    const boards = await getPatientAACBoards(patientId);
    const schedules = await getPatientVisualSchedules(patientId);
    const activities = await getPatientActivities(patientId);
    const progress = await getPatientProgress(patientId);

    const exportData = {
      patient: patient.data,
      aacBoards: boards.data,
      visualSchedules: schedules.data,
      activities: activities.data,
      progress: progress.data,
      exportedAt: new Date().toISOString()
    };

    return {
      success: true,
      data: exportData
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to export patient data'
    };
  }
}

/**
 * Get patient summary statistics
 */
export async function getPatientSummary(patientId) {
  try {
    const activities = await getPatientActivities(patientId);
    const progress = await getPatientProgress(patientId);
    
    let totalSessions = 0;
    let averageAccuracy = 0;
    let totalActivitiesCompleted = 0;
    let categoryStats = {};

    if (progress.success && progress.data.length > 0) {
      totalSessions = progress.data.length;
      const accuracies = progress.data.filter(p => p.accuracy !== undefined).map(p => p.accuracy);
      if (accuracies.length > 0) {
        averageAccuracy = accuracies.reduce((a, b) => a + b, 0) / accuracies.length;
      }
      
      // Count completed activities
      totalActivitiesCompleted = new Set(progress.data.map(p => p.activityId)).size;
    }

    // Calculate stats by category
    if (activities.success && activities.data.length > 0) {
      activities.data.forEach(activity => {
        const category = activity.category || 'uncategorized';
        if (!categoryStats[category]) {
          categoryStats[category] = 0;
        }
        categoryStats[category]++;
      });
    }

    return {
      success: true,
      data: {
        totalSessions,
        totalActivitiesCompleted,
        averageAccuracy: Math.round(averageAccuracy * 100) / 100,
        categoryStats,
        timestamp: new Date()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to get summary'
    };
  }
}

export default {
  // AAC Board
  saveAACBoard,
  getAACBoard,
  getPatientAACBoards,
  
  // Visual Schedule
  saveVisualSchedule,
  getVisualSchedule,
  getPatientVisualSchedules,
  
  // Activities
  saveActivity,
  getActivity,
  getPatientActivities,
  deleteActivity,
  
  // Progress
  saveSessionProgress,
  getSessionProgress,
  getPatientProgress,
  
  // Utilities
  exportPatientData,
  getPatientSummary
};
