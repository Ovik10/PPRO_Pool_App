package cz.ppro.poolapp.authentication;


import cz.ppro.poolapp.model.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @DeleteMapping("/delete")
    public String delete(HttpServletRequest request) {
        service.deleteUser(request);
        return "User has been deleted";
    }

    @PutMapping("/update")
    public ResponseEntity<UpdateUserResponse> update(@RequestBody User user, HttpServletRequest request) {
        return ResponseEntity.ok(service.updateUser(user, request));
    }

    @PutMapping("/increase")
    public ResponseEntity<IncreaseCreditsResponse> update(HttpServletRequest request) {
        return ResponseEntity.ok(service.increaseCredits(request));
    }
    @GetMapping("/get")
    public ResponseEntity<UpdateUserResponse> get( HttpServletRequest request) {
        return ResponseEntity.ok(service.get(request));
    }
}
