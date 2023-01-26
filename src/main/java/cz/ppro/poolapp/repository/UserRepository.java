package cz.ppro.poolapp.repository;

import cz.ppro.poolapp.model.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    @Override
    Optional<User> findById(String s);

    @Override
    void deleteById(String s);
}
