package com.example.student.controllers;

import com.example.student.model.Student;
import com.example.student.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    public StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<Student> add(@RequestBody Student student){
        Student student1= studentService.add(student);
        return  ResponseEntity.ok().body(student1);
    }

    @GetMapping("/getAll")
    public List<Student> get(){
        return studentService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable int id){
        Student student = studentService.findStudentById(id);
        return  ResponseEntity.ok().body(student);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Student> patchStudent(@PathVariable int id,
                                                @RequestBody Student student) {

        Student updatedStudent = studentService.patchStudent(id, student);

        return ResponseEntity.ok(updatedStudent);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id) {

        studentService.deleteStudent(id);

        return ResponseEntity.ok().body("Student Deleted Successfully");
    }
}
