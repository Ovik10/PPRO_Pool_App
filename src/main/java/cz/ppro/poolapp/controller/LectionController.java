package cz.ppro.poolapp.controller;

import cz.ppro.poolapp.model.Lection;
import cz.ppro.poolapp.service.LectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
@CrossOrigin
public class LectionController {
    @Autowired
    private LectionService lectionService;

    @PostMapping("/add")
    public String add(@RequestBody Lection lection){
        lectionService.saveLection(lection);
        return "Your lection has been registred";
    }
    @GetMapping("/getAll")
    public List<Lection> getAllAccounts(){
        return lectionService.getAllLections();
    }


}
