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
    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable int id){
        service.deleteUser(id);
        return "User has been deleted";
    }
    @PutMapping("/update")
    public String update(@RequestBody User user, HttpServletRequest request){
        service.updateUser(user, request);
        return "User has been updated";
    }
}
