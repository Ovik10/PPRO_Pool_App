package cz.ppro.poolapp.controller;

import cz.ppro.poolapp.dto.AuthRequest;

import cz.ppro.poolapp.model.Account;
import cz.ppro.poolapp.service.AccountService;
import cz.ppro.poolapp.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService service;
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/add")
    public String add(@RequestBody Account account){
        service.saveAccount(account);
        return "You have been registred";
    }
    @GetMapping("/getall")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Account> getAllTheProducts() {
        return service.getAllAccounts();
    }


    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }


    }
}
