package cz.ppro.poolapp.authentication;

import cz.ppro.poolapp.config.JwtService;
import cz.ppro.poolapp.model.Role;
import cz.ppro.poolapp.model.User;
import cz.ppro.poolapp.repository.UserRepository;
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
        if(repository.findByEmail(user.getEmail()).isPresent()){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "E-mail je již obsazen");
        } else
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
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(()-> new ResponseStatusException(
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

    public void deleteUser(int id){
        repository.deleteById(id);
    }
    public void updateUser(User user, int id){
        if (user.getId() == id ) {
            User u = repository.findById(id).get();
            u.setEmail(user.getEmail());
            u.setFirstname(user.getFirstname());
            u.setLastname(user.getLastname());
            u.setPassword(passwordEncoder.encode(user.getPassword()));
            repository.save(u);
        }
    }
}
