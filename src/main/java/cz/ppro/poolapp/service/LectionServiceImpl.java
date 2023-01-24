package cz.ppro.poolapp.service;

import cz.ppro.poolapp.model.Lection;
import cz.ppro.poolapp.repository.LectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Component
public class LectionServiceImpl implements LectionService {

    @Autowired
    private LectionRepository lectionRepository;

    @Override
    public Lection saveLection(Lection lection) {
        return lectionRepository.save(lection);
    }
    @Override
    public List<Lection> getAllLections() {
        return lectionRepository.findAll();
    }
    @Override
    public Optional<Lection> getLection(int id){
        return lectionRepository.findById(id);
    }

    @Override
    public void updateLection(Lection lection, int id){
        Lection l = lectionRepository.findById(id).get();
            l.setName(lection.getName());
            l.setCapacity(lection.getCapacity());
            l.setBeginDate(lection.getBeginDate());
            l.setPrice(lection.getPrice());
            l.setDescription(lection.getDescription());
        lectionRepository.save(l);
    }
    public void deleteLection(int id){
        lectionRepository.deleteById(id);

    }
}
