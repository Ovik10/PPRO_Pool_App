package cz.ppro.poolapp.controller;

import cz.ppro.poolapp.model.Role;
import cz.ppro.poolapp.repository.AccountRepository;
import cz.ppro.poolapp.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/roles")
@RestController
public class RoleController {
    private RoleRepository roleRepository;
    private AccountRepository accountRepository;

    @Autowired
    public RoleController(RoleRepository roleRepository, AccountRepository accountRepository){
        this.roleRepository=roleRepository;
        this.accountRepository=accountRepository;
    }
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Role> getAll(){
        return roleRepository.findAll();
    }



}
