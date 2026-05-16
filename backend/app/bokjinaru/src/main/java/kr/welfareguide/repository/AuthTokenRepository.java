package kr.welfareguide.repository;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import kr.welfareguide.domain.User;
import org.springframework.stereotype.Repository;

@Repository
public class AuthTokenRepository {

    private final Map<String, User> tokens = new ConcurrentHashMap<>();

    public void save(String token, User user) {
        tokens.put(token, user);
    }

    public Optional<User> findByToken(String token) {
        return Optional.ofNullable(tokens.get(token));
    }
}
