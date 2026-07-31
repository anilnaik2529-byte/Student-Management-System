package com.example.student.services;

import com.example.student.StudentApplication;
import com.example.student.model.Student;
import com.fasterxml.jackson.annotation.JsonTypeId;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    public Student add(Student student) {

        return studentRepository.save(student);
    }

    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    public Student findStudentById(int id) {

        return studentRepository.findById(id).orElse(null);

    }


    public void deleteStudent(int id) {
        studentRepository.deleteById(id);
    }

    public Student patchStudent(int id, Student student) {

        Student existingStudent = studentRepository.findById(id).orElseThrow();

        if (student.getName() != null) {
            existingStudent.setName(student.getName());
        }

        if (student.getGmail() != null) {
            existingStudent.setGmail(student.getGmail());
        }

        if (student.getPhone() != 0) {
            existingStudent.setPhone(student.getPhone());
        }

        if (student.getCourse() != null) {
            existingStudent.setCourse(student.getCourse());
        }

        if (student.getAge() != 0) {
            existingStudent.setAge(student.getAge());
        }

        return studentRepository.save(existingStudent);
    }
}
