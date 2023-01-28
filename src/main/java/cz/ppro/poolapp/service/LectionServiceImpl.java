package cz.ppro.poolapp.service;

import cz.ppro.poolapp.config.JwtService;
import cz.ppro.poolapp.model.Lection;
import cz.ppro.poolapp.model.User;
import cz.ppro.poolapp.repository.LectionRepository;
import cz.ppro.poolapp.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Component
public class LectionServiceImpl implements LectionService {

    @Autowired
    private LectionRepository lectionRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public LectionServiceImpl(JwtService jwtService, UserRepository repository) {
        this.jwtService = jwtService;
        this.userRepository = repository;
    }

    @Override
    public String saveLection(Lection lection) {
        LocalDateTime localDate = LocalDateTime.now();
        final LocalDateTime beginDate = convertToLocalDateTimeViaInstant(lection.getBeginDate());
        if (localDate.isAfter(beginDate)) {
            return "Course must be in the future";
        } else {
            lectionRepository.save(lection);
            return "Course has been added";

        }
    }

    @Override
    public List<Lection> getAllLections() {

        return lectionRepository.findAll();
    }

    @Override
    public Optional<Lection> getLection(int id) {
        return lectionRepository.findById(id);
    }

    @Override
    public String updateLection(Lection lection, int id) {
        LocalDateTime localDate = LocalDateTime.now();
        final LocalDateTime beginDate = convertToLocalDateTimeViaInstant(lection.getBeginDate());
        if (localDate.isAfter(beginDate)) {
            return "The course must be in the future";
        } else {
            Lection l = lectionRepository.findById(id).get();
            l.setName(lection.getName());
            l.setCapacity(lection.getCapacity());
            l.setBeginDate(lection.getBeginDate());
            l.setPrice(lection.getPrice());
            l.setDescription(lection.getDescription());
            lectionRepository.save(l);
            return "Course has been updated";
        }
    }

    public LocalDateTime convertToLocalDateTimeViaInstant(Date dateToConvert) {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }

    @Override
    public void deleteLection(int id) {

        lectionRepository.deleteById(id);
    }

    @Override
    public String book(Lection lection, int id, HttpServletRequest request) {
        LocalDateTime localDate = LocalDateTime.now();
        String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);
        Lection l = lectionRepository.findById(id).get();
        User u = userRepository.findByEmail(userEmail).orElse(null);
        final LocalDateTime beginDate = convertToLocalDateTimeViaInstant(l.getBeginDate());
        if (u.getCredits() - l.getPrice() < 0) {
            return "Not enough credits";
        }
        if (localDate.isAfter(beginDate)) {
            return "The Course is already gone";
        }

        if (l.getUsersBooked().contains(userEmail)) {
            lectionRepository.save(l).setId(id);
            userRepository.save(u);
            return "Already booked";
        } else {
            l.setCapacity(l.getCapacity() - 1);
            u.setCredits(u.getCredits() - l.getPrice());
            l.getUsersBooked().add(userEmail);
            lectionRepository.save(l).setId(id);
            userRepository.save(u);
            return "Booked";
        }

    }

    @Override
    public String unbook(Lection lection, int id, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);
        Lection l = lectionRepository.findById(id).get();
        User u = userRepository.findByEmail(userEmail).orElse(null);
        if (!l.getUsersBooked().contains(userEmail)) {
            lectionRepository.save(l).setId(id);
            userRepository.save(u);
            return "Already unbooked";
        } else {
            l.setCapacity(l.getCapacity() + 1);
            u.setCredits(u.getCredits() + l.getPrice());
            l.getUsersBooked().remove(userEmail);
            lectionRepository.save(l).setId(id);
            userRepository.save(u);
            return "Unbooked";
        }
    }
}
