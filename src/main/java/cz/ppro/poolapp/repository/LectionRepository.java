package cz.ppro.poolapp.repository;

import cz.ppro.poolapp.model.Lection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectionRepository extends JpaRepository<Lection, Integer> {
}
