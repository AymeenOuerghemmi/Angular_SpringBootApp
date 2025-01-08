package tn.iit.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import tn.iit.dto.StudentDto;

@Service
public class StudentService {

	private List<StudentDto> students = new ArrayList<>();

	public StudentService() {
		students.add(new StudentDto(1, "Abid", "Khalil"));
	}

	public void save(StudentDto studentDto) {
		students.add(studentDto);
	}

	public List<StudentDto> findAll() {
		return students;
	}

	public void delete(int id) {
		students.removeIf(s -> s.getId() == id);
	}

	public Optional<StudentDto> findById(int id) {
		return students.stream().filter(s -> s.getId() == id).findFirst();
	}

	public void update(StudentDto studentDto) {
		students.set(students.indexOf(studentDto), studentDto);

	}

	public List<StudentDto> search(String search) {

		return students.stream().filter
				(s -> s.getFirstName().contains(search) || s.getLastName().contains(search))
				.collect(Collectors.toList());
	}
}
