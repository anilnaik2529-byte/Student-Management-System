import { useState,useEffect } from "react";
import api from "../../services/api";
import "./StudentForm.css";
import { toast } from "react-toastify";
function StudentForm({
  selectedStudent,
  setSelectedStudent,
  getStudents
}) {

  const [student, setStudent] = useState({
    id: "",
    name: "",
    gmail: "",
    phone: "",
    course: "",
    age: ""
  });
   const[errors, setErrors] = useState({
    name: "",
    gmail: "",
    phone: "",
    course: "",
    age: ""
   });

  useEffect(() => {
    if (selectedStudent) {
      setStudent(selectedStudent);
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };
   
  const validate = () => {
  let newErrors = {};

  if (!student.name.trim()) newErrors.name = "Name is required";
  if (!student.gmail.trim()) newErrors.gmail = "Gmail is required";
  else if (!/\S+@\S+\.\S+/.test(student.gmail))
    newErrors.gmail = "Invalid Gmail";

  if (!student.phone.toString().trim()) newErrors.phone = "Phone is required";
  else if (!/^\d{10}$/.test(student.phone))
    newErrors.phone = "Phone must be 10 digits";

  if (!student.course) newErrors.course = "Select a course";

  if (!student.age) newErrors.age = "Age is required";
  else if (student.age < 12 || student.age > 60)
    newErrors.age = "Age must be between 12 and 60";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const saveStudent = async () => {
    if (!validate()) 
      return;

    try {
      if(student.id){
        await api.patch(`/student/${student.id}`, student);
        toast.success("Student Updated Successfully");
      } else{
          console.log(student);
        await api.post("/student/add", student);
        toast.success("Student Added Successfully");
       
      }
await getStudents();
      setStudent({
        id: "",
        name: "",
        gmail: "",
        phone: "",
        course: "",
        age: ""
      });
       setSelectedStudent(null);  
         setErrors({});
        
    } catch (error) {
      toast.error("Error Adding Student");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Student</h2>

      <label>Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Enter student Name"
        value={student.name}
        onChange={handleChange}
      />
       {errors.name && <p className="error">{errors.name}</p>}

      <label>Gmail:</label>
      <input
        type="email"
        name="gmail"
        placeholder="Enter student Email"
        value={student.gmail}
        onChange={handleChange}
      />
      {errors.gmail && <p className="error">{errors.gmail}</p>}

      <label>Phone:</label>
      <input
        type="text"
        name="phone"
        placeholder="Enter student Phone"
        value={student.phone}
        onChange={handleChange}
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <label>Course:</label>
      <select
        name="course"
        value={student.course}
        onChange={handleChange}
      >
     <option value="">Select Course</option>
<option value="CSE">CSE</option>
<option value="IT">IT</option>
<option value="ECE">ECE</option>
<option value="EEE">EEE</option>
<option value="ME">ME</option>
<option value="CE">CE</option>
<option value="AI & DS">AI & DS</option>
      </select>
      {errors.course && <p className="error">{errors.course}</p>}

      <label>Age:</label>
      <input
        type="number"
        name="age"
        placeholder="Enter Age"
        value={student.age}
        onChange={handleChange}
      />
      {errors.age && <p className="error">{errors.age}</p>}

      <button onClick={saveStudent}>
        {student.id ? "Update Student" : "Add Student"}
      </button>
    </div>
  );
}

export default StudentForm;