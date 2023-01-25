package cz.ppro.poolapp.controller;

import cz.ppro.poolapp.model.Lection;
import cz.ppro.poolapp.service.LectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/course")
public class LectionController {
    @Autowired
    private LectionService lectionService;

    @PostMapping("/add")
    public String add(@RequestBody Lection lection){
        lectionService.saveLection(lection);
        return "Your lection has been created";
    }
    @GetMapping("/getAll")
    public List<Lection> getAllAccounts(){
        return lectionService.getAllLections();
    }
    @GetMapping("/get/{id}")
    public @ResponseBody Optional<Lection> getLection( @PathVariable int id){
        return lectionService.getLection(id);

    }
    @PutMapping("/update/{id}")
    public String update(@RequestBody Lection lection, @PathVariable int id){
        lectionService.updateLection(lection, id);
        return "Lection has been updated";
    }
    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable int id){
        lectionService.deleteLection(id);
        return "Lection has been deleted";
    }


}
