package cz.ppro.poolapp.service;

import cz.ppro.poolapp.model.Lection;

import java.util.List;

public interface LectionService {
    public Lection saveLection(Lection lection);
    public List<Lection> getAllLections();

}
