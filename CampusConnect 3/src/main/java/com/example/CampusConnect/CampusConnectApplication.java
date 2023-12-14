package com.example.CampusConnect;

import com.example.CampusConnect.Config.DatabaseSeeder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class CampusConnectApplication {

	public static void main(String[] args) {
		SpringApplication.run(CampusConnectApplication.class, args);
	}
	@Bean
	public CommandLineRunner commandLineRunner(DatabaseSeeder databaseSeeder) {
		return args -> {
			databaseSeeder.seedDatabase();
		};
	}
}
