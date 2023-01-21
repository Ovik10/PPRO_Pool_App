package cz.ppro.poolapp.controller;

import cz.ppro.poolapp.model.Account;
import cz.ppro.poolapp.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@CrossOrigin
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping("/add")
    public String add(@RequestBody Account account){
        accountService.saveAccount(account);
        return "You have been registred";
    }
    @GetMapping("/getAll")
    public List<Account> getAllAccounts(){
        return accountService.getAllAccounts();
    }


}
