package kr.welfareguide.controller;

import kr.welfareguide.dto.DemoLoginRequest;
import kr.welfareguide.dto.DemoLoginResponse;
import kr.welfareguide.dto.UserDto;
import kr.welfareguide.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/demo-login")
    public DemoLoginResponse demoLogin(@RequestBody DemoLoginRequest request) {
        return authService.demoLogin(request);
    }

    @GetMapping("/me")
    public UserDto me(@RequestHeader("Authorization") String authorization) {
        return authService.getCurrentUser(authorization);
    }
}
