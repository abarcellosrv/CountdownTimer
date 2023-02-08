package com.ecore.countdown;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication
public class CountdownApplication {

	@Value("${server.address}")
	private String serverAddress;

	@Value("${server.port}")
	private int serverPort;

	@PostConstruct
	public void init() {
		System.out.println("Server URL: " + "http://" + serverAddress + ":" + serverPort);
	}

	public static void main(String[] args) {
		SpringApplication.run(CountdownApplication.class, args);


	}

}
