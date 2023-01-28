package cz.ppro.poolapp.authentication;

import cz.ppro.poolapp.config.JwtService;
import cz.ppro.poolapp.model.Role;
import cz.ppro.poolapp.model.User;
import cz.ppro.poolapp.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .credits(request.getCredits())
                .role(Role.USER)
                .build();
        if (repository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.IM_USED, "E-mail je již obsazen");
        } else {
            repository.save(user);
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .credits(user.getCredits())
                    .email(user.getEmail())
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .role(user.getRole())
                    .build();
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Vámi zadaný email neexistuje"));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .credits(user.getCredits())
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .role(user.getRole())
                .build();
    }

    public void deleteUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);
        repository.deleteById(userEmail);
    }

    public UpdateUserResponse updateUser(User user, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);
        User u = repository.findByEmail(userEmail).orElse(null);
        u.setFirstname(user.getFirstname());
        u.setLastname(user.getLastname());
        if (user.getPassword() != null) {
            u.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        repository.save(u);
        return UpdateUserResponse.builder()
                .credits(u.getCredits())
                .email(u.getEmail())
                .firstname(u.getFirstname())
                .lastname(u.getLastname())
                .role(u.getRole())
                .build();
    }

    public IncreaseCreditsResponse increaseCredits(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);
        User u = repository.findByEmail(userEmail).orElse(null);
        u.setCredits(u.getCredits() + 100);
        repository.save(u);
        return IncreaseCreditsResponse.builder()
                .credits(u.getCredits())
                .email(u.getEmail())
                .build();
    }

}

