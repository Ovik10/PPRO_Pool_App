package cz.ppro.poolapp.service;

import cz.ppro.poolapp.model.Lection;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;

public interface LectionService {
    String saveLection(Lection lection);

    List<Lection> getAllLections();

    String updateLection(Lection lection, int id);

    void deleteLection(int id);

    Optional<Lection> getLection(int id);

    String book(Lection lection, int id, HttpServletRequest request);

    String unbook(Lection lection, int id, HttpServletRequest request);

    void dailyUpdate();

}
