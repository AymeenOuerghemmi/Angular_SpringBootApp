package tn.iit.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.AllArgsConstructor;
import tn.iit.dto.StudentDto;
import tn.iit.exception.StudentNotFoundException;
import tn.iit.service.StudentService;

@AllArgsConstructor
@Controller
@RequestMapping("/students")
public class StudentController {

	private final StudentService studentService;

	@ResponseBody // retour est Json (utilisation de Jackson)
	@GetMapping("/all-json")
	public List<StudentDto> findAllJson() {
		return studentService.findAll();
	}

	@GetMapping({ "/", "/all" })
	public String findAll(Model model) {
		model.addAttribute("students", studentService.findAll());
		return "students";
	}

	@GetMapping("")
	public String check() {
		return "redirect:/students/";
	}

	@PostMapping("/save")
	public String save(@RequestParam("id") int id, @RequestParam("firstName") String firstName,
			@RequestParam("lastName") String lastName) {

		StudentDto studentDto = new StudentDto(id, firstName, lastName);
		studentService.save(studentDto);
		return "redirect:/students/";
	}

	@PostMapping("/update")
	public String update(@ModelAttribute StudentDto studentDto) {

		studentService.update(studentDto);
		return "redirect:/students/";
	}

	@PostMapping("/edit")
	public String edit(@RequestParam int id, Model model) {
		Optional<StudentDto> studentOpt = studentService.findById(id);

		if (studentOpt.isPresent()) {
			model.addAttribute("student", studentOpt.get());
		} else {
			throw new StudentNotFoundException("id = " + id + " is not found");
		}
		return "student-edit";
	}
	
	@PostMapping("/search")
	public String search(@RequestParam String search, Model model) {
		model.addAttribute("students", studentService.search(search));
		return "students";
	}


	@GetMapping("/delete/{id}")
	public String delete(@PathVariable int id) {
		studentService.delete(id);
		return "redirect:/students/";
	}

}
