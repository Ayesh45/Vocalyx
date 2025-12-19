/**
 * PATIENT DATA MODELS
 * Defines the structure of all patient-related data stored in Firestore
 */

/**
 * PATIENT RECORD
 * Top-level document for each patient
 */
export const patientSchema = {
  // Authentication & Basic Info
  uid: "firebaseAuthUID",
  email: "patient@email.com",
  username: "patient_username",
  password: "hashed_password", // Only stored server-side via Firebase Auth
  
  // Personal Information
  firstName: "John",
  lastName: "Doe",
  age: 8,
  dateOfBirth: "2016-01-15",
  gender: "Male",
  profileImageUrl: "gs://firebase-url/profile.jpg",
  
  // Medical/Therapy Info
  diagnosis: "Speech Delay",
  therapyType: "Speech Therapy",
  therapistName: "Dr. Smith",
  therapistEmail: "therapist@email.com",
  
  // Status & Timestamps
  status: "active", // active, inactive, archived
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLoginAt: new Date(),
  
  // References to subcollections
  aacBoardId: "board_123",
  visualScheduleId: "schedule_123",
  
  // Settings
  language: "en-IN",
  theme: "light",
  notificationsEnabled: true
};

/**
 * AAC BOARD RECORD
 * Customized AAC board for each patient
 * Stored in: patients/{patientId}/aacBoards/{boardId}
 */
export const aacBoardSchema = {
  id: "board_123",
  patientId: "patient_uid",
  title: "My Communication Board",
  description: "Customized for patient",
  
  // Board structure
  boards: {
    root: {
      id: "root",
      title: "Main Board",
      items: [
        {
          id: "family_button",
          label: "Family",
          categoryId: "family", // References aacResources.json
          itemId: "mom", // Specific item from category
          icon: "gs://firebase-url/mom.jpg",
          audio: "gs://firebase-url/mom.mp3",
          nextBoard: "family_board",
          position: 0
        }
      ]
    },
    family_board: {
      id: "family_board",
      title: "Family Members",
      items: [
        {
          id: "mom_button",
          label: "Mom",
          categoryId: "family",
          itemId: "mom",
          icon: "gs://firebase-url/mom.jpg",
          audio: "gs://firebase-url/mom.mp3",
          position: 0
        }
      ]
    }
  },
  
  // Metadata
  createdAt: new Date(),
  updatedAt: new Date(),
  version: 1,
  isPublished: false
};

/**
 * VISUAL SCHEDULE RECORD
 * Step-by-step visual schedule for activities
 * Stored in: patients/{patientId}/visualSchedules/{scheduleId}
 */
export const visualScheduleSchema = {
  id: "schedule_123",
  patientId: "patient_uid",
  title: "Morning Routine",
  description: "Daily morning activities",
  
  // Steps in the schedule
  steps: [
    {
      id: "step_1",
      order: 1,
      title: "Wake Up",
      description: "Time to wake up",
      icon: "gs://firebase-url/wake-up.jpg",
      duration: 5, // in minutes
      completionAudio: "gs://firebase-url/step-complete.mp3",
      completed: false,
      completedAt: null
    },
    {
      id: "step_2",
      order: 2,
      title: "Breakfast",
      description: "Eat breakfast",
      icon: "gs://firebase-url/breakfast.jpg",
      duration: 20,
      completionAudio: "gs://firebase-url/step-complete.mp3",
      completed: false,
      completedAt: null
    }
  ],
  
  // Settings
  repeatDaily: true,
  repeatWeekly: [],
  showTimer: true,
  playAudioOnCompletion: true,
  
  // Metadata
  createdAt: new Date(),
  updatedAt: new Date(),
  isPublished: false
};

/**
 * DIGITAL ACTIVITY RECORD
 * Interactive activities for therapy
 * Stored in: patients/{patientId}/activities/{activityId}
 */
export const digitalActivitySchema = {
  id: "activity_123",
  patientId: "patient_uid",
  title: "Color Naming",
  description: "Learn to identify and name colors",
  category: "speech", // speech, learning, motor, social, behavior
  
  // Activity content
  type: "matching", // matching, sequence, sorting, identification, etc.
  difficulty: "easy", // easy, medium, hard
  items: [
    {
      id: "item_1",
      question: "What color is this?",
      questionImage: "gs://firebase-url/red-box.jpg",
      options: [
        { id: "opt_1", label: "Red", image: "gs://firebase-url/red.jpg", correct: true },
        { id: "opt_2", label: "Blue", image: "gs://firebase-url/blue.jpg", correct: false },
        { id: "opt_3", label: "Yellow", image: "gs://firebase-url/yellow.jpg", correct: false }
      ],
      audio: "gs://firebase-url/question-audio.mp3"
    }
  ],
  
  // Feedback and rewards
  correctAnswerAudio: "gs://firebase-url/correct.mp3",
  incorrectAnswerAudio: "gs://firebase-url/incorrect.mp3",
  rewardAnimation: "confetti", // confetti, stars, etc.
  
  // Progress tracking
  totalAttempts: 0,
  correctAnswers: 0,
  accuracy: 0,
  
  // Settings
  timeLimit: 60, // seconds, 0 = no limit
  allowRetry: true,
  showHints: true,
  
  // Metadata
  createdAt: new Date(),
  updatedAt: new Date(),
  isPublished: false
};

/**
 * PATIENT PROGRESS RECORD
 * Tracks patient activity and progress
 * Stored in: patients/{patientId}/progress/{sessionId}
 */
export const progressSchema = {
  id: "progress_123",
  patientId: "patient_uid",
  sessionId: "session_123",
  
  // Activity tracking
  activityId: "activity_123",
  activityType: "color_naming",
  
  // Results
  startedAt: new Date(),
  completedAt: new Date(),
  duration: 300, // seconds
  items: [
    {
      itemId: "item_1",
      selected: "opt_1",
      correct: true,
      timeSpent: 5,
      attempts: 1
    }
  ],
  
  // Summary
  totalItems: 10,
  correctAnswers: 9,
  accuracy: 90,
  score: 90,
  
  // Notes
  therapistNotes: "Great progress!",
  caregiverNotes: "Child was engaged"
};

/**
 * EXAMPLE FIRESTORE COLLECTION STRUCTURE
 * 
 * /patients
 *   /{patientId}
 *     - Basic patient data
 *     /aacBoards
 *       /{boardId}
 *         - AAC board configuration
 *     /visualSchedules
 *       /{scheduleId}
 *         - Schedule steps and configuration
 *     /activities
 *       /{activityId}
 *         - Activity configuration
 *     /progress
 *       /{sessionId}
 *         - Session results and progress
 *     /logs
 *       /{logId}
 *         - Activity logs and access logs
 */

export default {
  patientSchema,
  aacBoardSchema,
  visualScheduleSchema,
  digitalActivitySchema,
  progressSchema
};
