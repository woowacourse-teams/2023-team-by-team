package team.teamby.teambyteam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableJpaAuditing
@SpringBootApplication
public class TeamByTeamApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeamByTeamApplication.class, args);
    }

}
