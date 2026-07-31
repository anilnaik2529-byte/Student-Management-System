import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import StudentForm from "./components/StudentForm/StudentForm";
import StudentTable from "./components/StudentTable/StudentTable";
import Register from "./components/Register/register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState, useEffect } from "react";
import api from "./services/api";

function Dashboard() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

const getStudents = async () => {
  const response = await api.get("/student/getAll");
  setStudents(response.data);
};

useEffect(() => {
  getStudents();
}, []);

  return (
    <>
      <Navbar />

      <div className="hero">
        <h1>Manage Student Records</h1>
        <p>Add, Update and Delete Students</p>
      </div>

      <div className="content">
        <StudentForm
  selectedStudent={selectedStudent}
  setSelectedStudent={setSelectedStudent}
  getStudents={getStudents}
/>

<StudentTable
  students={students}
  getStudents={getStudents}
  setSelectedStudent={setSelectedStudent}
/>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard"
element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
}
/>
      </Routes>

      <ToastContainer position="top-right" autoClose={1500} />
    </BrowserRouter>
  );
}

export default App;