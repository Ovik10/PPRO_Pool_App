package cz.ppro.poolapp.repository;

import cz.ppro.poolapp.model.Lection;
import cz.ppro.poolapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LectionRepository extends JpaRepository<Lection, Integer> {
    @Transactional
    @Modifying
    @Query("update Lection l set l.usersBooked = ?1, l.capacity = ?2")
    void update(User usersBooked, int capacity);
}
