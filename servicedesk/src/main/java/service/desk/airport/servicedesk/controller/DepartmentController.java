package service.desk.airport.servicedesk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.dao.DepartmentRepository;
import service.desk.airport.servicedesk.entity.Department;


@Controller
@RequestMapping(path="/department")
public class DepartmentController {
    private DepartmentRepository departmentRepository;

    @PostMapping(path="/add")
    public @ResponseBody
    String addNewDepartment (@RequestParam String name) {
        Department newdepartment = new Department(name);
        departmentRepository.save(newdepartment);
        return "Added department";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
}
