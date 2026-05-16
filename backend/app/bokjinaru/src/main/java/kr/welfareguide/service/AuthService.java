package kr.welfareguide.service;

import java.util.UUID;
import kr.welfareguide.domain.User;
import kr.welfareguide.dto.DemoLoginRequest;
import kr.welfareguide.dto.DemoLoginResponse;
import kr.welfareguide.dto.UserDto;
import kr.welfareguide.exception.UnauthorizedException;
import kr.welfareguide.repository.AuthTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final String DEMO_USERNAME = "demo";
    private static final String DEMO_PASSWORD = "demo1234";

    private final AuthTokenRepository authTokenRepository;

    public DemoLoginResponse demoLogin(DemoLoginRequest request) {
        if (!DEMO_USERNAME.equals(request.getUsername()) || !DEMO_PASSWORD.equals(request.getPassword())) {
            throw new UnauthorizedException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        User user = User.builder()
                .id("user-demo")
                .name("데모 사용자")
                .email("demo@bokjiro.local")
                .role("USER")
                .build();

        String token = UUID.randomUUID().toString();
        authTokenRepository.save(token, user);

        return DemoLoginResponse.builder()
                .token(token)
                .user(toDto(user))
                .build();
    }

    public UserDto getCurrentUser(String authorizationHeader) {
        String token = extractBearerToken(authorizationHeader);
        User user = authTokenRepository
                .findByToken(token)
                .orElseThrow(() -> new UnauthorizedException("유효하지 않은 토큰입니다."));
        return toDto(user);
    }

    private String extractBearerToken(String authorizationHeader) {
        if (!StringUtils.hasText(authorizationHeader) || !authorizationHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Authorization 헤더가 필요합니다.");
        }
        String token = authorizationHeader.substring("Bearer ".length()).trim();
        if (!StringUtils.hasText(token)) {
            throw new UnauthorizedException("유효하지 않은 토큰입니다.");
        }
        return token;
    }

    private UserDto toDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
