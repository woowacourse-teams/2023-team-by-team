package team.teamby.teambyteam.teamplace.domain;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Random;

@Component
public final class RandomInviteCodeGenerator {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int LENGTH = 8;

    private final Random random = new SecureRandom();

    public String generateRandomString() {
        final StringBuilder randomString = new StringBuilder();

        for (int i = 0; i < LENGTH; i++) {
            final int randomIndex = random.nextInt(CHARACTERS.length());
            final char randomChar = CHARACTERS.charAt(randomIndex);
            randomString.append(randomChar);
        }

        return randomString.toString();
    }
}
