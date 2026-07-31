import { useState } from "react";
import api from "../../services/api";
import "./StudentTable.css";

function StudentTable({ students, getStudents, setSelectedStudent }) {
  
  const [search, setSearch] = useState("");
  const[currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;


  const deleteStudent = async (id) => {
  
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this student?");
      if (!confirmDelete) return;
      await api.delete(`/student/${id}`);
      getStudents(); // Refresh the student table
    } catch (error) {
      alert("Error deleting student");
      console.error(error);
    }
  };
 const filteredStudents = students.filter((student) => 
      student.id.toString().includes(search) ||
      student.name.toLowerCase().includes(search.toLowerCase()) || 
      student.gmail.toLowerCase().includes(search.toLowerCase()) ||
      student.phone.toString().includes(search) ||
      student.course.toLowerCase().includes(search.toLowerCase()) ||
      student.age.toString().includes(search)
    );
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  return (
    <div className="table-container">
      <h2>All Students</h2>
      <input
        type="text"
        placeholder="Search by ID, Name, Gmail, Phone, Course or Age..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gmail</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.gmail}</td>
              <td>{student.phone}</td>
              <td>{student.course}</td>
              <td>{student.age}</td>
              <td>
                <button className="edit-btn" 
                        onClick={() => setSelectedStudent(student)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteStudent(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={currentPage === index + 1 ? "active-page" : ""}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>
    </div>
  );
}

export default StudentTable;