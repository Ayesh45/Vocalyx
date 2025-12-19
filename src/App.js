import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import PatientDetail from "./PatientDetail";
import AddPatientForm from "./AddPatientForm";
import Home from "./Home";
import AACBoardBuilder from "./aac/AACBoardBuilder";
import ScheduleHome from "./schedule/ScheduleHome";
import ScheduleEditor from "./schedule/ScheduleEditor";
<<<<<<< HEAD
import DigitalActivities from "./digital/DigitalActivities";
import FestivalsWorksheet from "./patientside/FestivalsWorksheet";
import FoodWorksheet from "./patientside/FoodWorksheet";
import AACDemo from "./patientside/AACDemo";
import TeacherWorksheet from "./patientside/TeacherWorksheet";
import StudentWorksheet from "./patientside/StudentWorksheet";
=======
import {
  AACDemo,
  TeacherWorksheet,
  StudentWorksheet,
  FestivalsWorksheet,
  FoodWorksheet,
} from "./patientside";
import DigitalActivities from "./digital/DigitalActivities";
>>>>>>> 95f49840ce41efa044abbde449f2143982384982

import "./styles/aac.css";
import "./styles/aacTheme.css";
import "./styles/worksheets.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-patient" element={<AddPatientForm />} />
        <Route path="/patient/:patientId" element={<PatientDetail />} />
        <Route path="/app" element={<Home />} />
        <Route path="/aac" element={<AACBoardBuilder />} />
        {/* Legacy patientside demo/components converted to React under src/patientside */}
        <Route path="/patientside/aac" element={<AACDemo />} />
        <Route path="/patientside/teacher" element={<TeacherWorksheet />} />
        <Route path="/patientside/student" element={<StudentWorksheet />} />
        <Route path="/patientside/festivals" element={<FestivalsWorksheet />} />
        <Route path="/patientside/food" element={<FoodWorksheet />} />
        <Route path="/digital" element={<DigitalActivities />} />
        <Route path="/schedule" element={<ScheduleHome />} />
        <Route path="/schedule/:id" element={<ScheduleEditor />} />
        <Route path="/digital" element={<DigitalActivities />} />
        <Route path="/patientside/festivals" element={<FestivalsWorksheet />} />
        <Route path="/patientside/food" element={<FoodWorksheet />} />
        <Route path="/patientside/aac" element={<AACDemo />} />
        <Route path="/patientside/teacher" element={<TeacherWorksheet />} />
        <Route path="/patientside/student" element={<StudentWorksheet />} />
      </Routes>
    </BrowserRouter>
  );
}
