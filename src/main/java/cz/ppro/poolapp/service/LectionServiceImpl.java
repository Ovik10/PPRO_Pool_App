package cz.ppro.poolapp.service;

import cz.ppro.poolapp.model.Lection;
import cz.ppro.poolapp.repository.LectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
