package cz.ppro.poolapp.controller;

import cz.ppro.poolapp.model.Lection;
import cz.ppro.poolapp.repository.LectionRepository;
import cz.ppro.poolapp.service.LectionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
    @CrossOrigin
    @GetMapping("/getAll")
    public List<Lection> getAll(){
        return lectionService.getAllLections();
    }
    @GetMapping("/get/{id}")
    public @ResponseBody Optional<Lection> get( @PathVariable int id){
        return lectionService.getLection(id);

    }
    @PutMapping("/update/{id}")
    public String update(@RequestBody Lection lection, @PathVariable int id){
        lectionService.updateLection(lection, id);
        return "Lection has been updated";
    }
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id){
        lectionService.deleteLection(id);
        return "Lection has been deleted";
    }
    @PutMapping("/book/{id}")
    public String book(Lection lection, @PathVariable int id, HttpServletRequest request){
        return lectionService.book(lection, id, request);

    }

    @PutMapping("/unbook/{id}")
    public String unbook(Lection lection, @PathVariable int id, HttpServletRequest request){
        return lectionService.unbook(lection, id, request);

    }


}
