package service.desk.airport.servicedesk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class ServicedeskApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServicedeskApplication.class, args);
	}

}
