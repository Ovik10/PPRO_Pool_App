package cz.ppro.poolapp.service;

import cz.ppro.poolapp.model.Lection;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;

public interface LectionService {
    public Lection saveLection(Lection lection);
    public List<Lection> getAllLections();
    public void updateLection(Lection lection, int id);
    public void deleteLection(int id);

    public Optional<Lection> getLection(int id);
    public void book(Lection lection, int id, HttpServletRequest request);

}
