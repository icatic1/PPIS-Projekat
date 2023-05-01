package service.desk.airport.servicedesk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import service.desk.airport.servicedesk.dao.DepartmentRepository;
import service.desk.airport.servicedesk.dao.RoleRepository;
import service.desk.airport.servicedesk.dao.UserRepository;
import service.desk.airport.servicedesk.entity.Department;
import service.desk.airport.servicedesk.entity.Role;
import service.desk.airport.servicedesk.entity.User;

@EnableJpaRepositories("service.desk.airport.servicedesk.dao")
@EntityScan(basePackages = "service.desk.airport.servicedesk.entity")
@SpringBootApplication//(exclude = {DataSourceAutoConfiguration.class })
public class ServicedeskApplication implements CommandLineRunner {

	@Autowired
	UserRepository userRepository;

	@Autowired
	DepartmentRepository departmentRepository;

	@Autowired
	RoleRepository roleRepository;


	public static void main(String[] args) {
		SpringApplication.run(ServicedeskApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception
	{
		cleanup();
		startingData();
	}
	private void cleanup() {
		userRepository.deleteAll();
	}

	private void startingData() {
		Department depadmin = new Department("admindepartment");
		departmentRepository.save(depadmin);
		Role roladmin = new Role("admin");
		roleRepository.save(roladmin);
		User admin = new User("Admin","Admin","admin@admin.com", "adminpass", depadmin, roladmin);
		userRepository.save(admin);
	}

}
