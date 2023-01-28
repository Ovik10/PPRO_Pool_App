package cz.ppro.poolapp;

import cz.ppro.poolapp.model.Lection;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.Scheduled;

// @EnableJpaRepositories("cz.ppro.poolapp.model")
//@ComponentScan("cz.ppro.poolapp.model")
//@EntityScan("cz.ppro.poolapp.model")
@SpringBootApplication
public class PoolappApplication {
    public static void main(String[] args) {
        SpringApplication.run(PoolappApplication.class, args);
    }
}