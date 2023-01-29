package cz.ppro.poolapp.service;

import cz.ppro.poolapp.config.JwtService;
import cz.ppro.poolapp.model.Lection;
import cz.ppro.poolapp.model.LectionType;
import cz.ppro.poolapp.model.User;
import cz.ppro.poolapp.repository.LectionRepository;
import cz.ppro.poolapp.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
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
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Course must be in a future"
            );
        }
            lectionRepository.save(lection);
            return "Course has been added";

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
        if(lection.getName().isEmpty() || lection.getDescription().isEmpty() || lection.getBeginDate().equals(null) || lection.getCapacity() == 0 ||lection.getPrice() == 0)
        {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "You must fill all the fields"
            );
        }
        LocalDateTime beginDate = null;
        LocalDateTime localDate = LocalDateTime.now();
        if(!lection.getBeginDate().equals(null))
        {
        beginDate = convertToLocalDateTimeViaInstant(lection.getBeginDate());}
        if (localDate.isAfter(beginDate)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Course must be in a future"
            );
        }

        if(lection.getPrice() < 0)
        {throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Price must be >= 0"
        );}
        if(lection.getCapacity() < 1)
        {throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Capacity must be > 0"
        );}

            Lection l = lectionRepository.findById(id).get();
            l.setName(lection.getName());
            l.setCapacity(lection.getCapacity());
            l.setBeginDate(lection.getBeginDate());
            l.setPrice(lection.getPrice());
            l.setDescription(lection.getDescription());
            lectionRepository.save(l);
            return "Course has been updated";

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
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Not enough credits"
            );
        }

        if (l.getCapacity() - 1 < 0) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No free capacity"
            );
        }

        if (localDate.isAfter(beginDate)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "The course is gone"
            );
        }

        if (l.getUsersBooked().contains(userEmail)) {
            lectionRepository.save(l).setId(id);
            userRepository.save(u);
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Already booked"
            );
        }

            l.setCapacity(l.getCapacity() - 1);
            u.setCredits(u.getCredits() - l.getPrice());
            l.getUsersBooked().add(userEmail);
            lectionRepository.save(l).setId(id);
            userRepository.save(u);
            return "Booked";

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
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Already unbooked"
            );
        }
            l.setCapacity(l.getCapacity() + 1);
            u.setCredits(u.getCredits() + l.getPrice());
            l.getUsersBooked().remove(userEmail);
            lectionRepository.save(l).setId(id);
            userRepository.save(u);
            return "Unbooked";

    }
    @Scheduled(cron = "0 0 18 * * *")
    @Override
    public void dailyUpdate() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.HOUR_OF_DAY, 14);
        Lection lection1 = new Lection(10000, LectionType.WHIRLPOOL, "Whirlpool","Whirlpool session", cal.getTime(),100,5,null);
        Lection lection3 = new Lection(10002, LectionType.SAUNA, "Sauna","Sauna session", cal.getTime(),100,5,null);
        lectionRepository.save(lection1);
        lectionRepository.save(lection3);
        cal.add(Calendar.HOUR_OF_DAY, 1);
        Lection lection2 = new Lection(10001, LectionType.WHIRLPOOL, "Whirlpool","Whirlpool session", cal.getTime(),100,5,null);
        Lection lection4 = new Lection(10003, LectionType.SAUNA, "Sauna","Sauna session", cal.getTime(),100,5,null);
        lectionRepository.save(lection2);
        lectionRepository.save(lection4);







    }
}
