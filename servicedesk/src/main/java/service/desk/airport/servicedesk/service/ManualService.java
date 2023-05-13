package service.desk.airport.servicedesk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.desk.airport.servicedesk.dao.ManualRepository;
import service.desk.airport.servicedesk.dto.manual.ManualCreateRequest;
import service.desk.airport.servicedesk.dto.manual.ManualResponse;
import service.desk.airport.servicedesk.entity.Manual;
import service.desk.airport.servicedesk.enums.Category;
import service.desk.airport.servicedesk.security.dao.UserRepository;

import java.time.LocalDateTime;

@Service
public class ManualService {
    @Autowired
    ManualRepository manualRepository;

    @Autowired
    UserRepository userRepository;

    public ManualResponse createManual(ManualCreateRequest request) {
        var user = userRepository.findByEmail(request.getUserEmail()).orElseThrow();
        var category = Category.valueOf(request.getCategory());
        var date = LocalDateTime.now();
        var manual = new Manual();
        manual.setCreatedBy(user);
        manual.setTitle(request.getTitle());
        manual.setContent(request.getContent());
        manual.setDateTime(date);
        manual.setCategory(category);

        manual = manualRepository.save(manual);

        return new ManualResponse(manual);
    }

    public ManualResponse updateManual(ManualCreateRequest request,Integer id) {

        var manual = manualRepository.findById(id).orElseThrow();

        if(request.getCategory()!=null) {
            var category = Category.valueOf(request.getCategory());
            manual.setCategory(category);
        }

        if(request.getTitle()!=null) {
            manual.setTitle(request.getTitle());
        }

        if(request.getContent()!=null) {
            manual.setContent(request.getContent());
        }

        var date = LocalDateTime.now();
        manual.setDateTime(date);


        manual = manualRepository.save(manual);

        return new ManualResponse(manual);
    }

    public ManualResponse getManual(Integer id) {
        return new ManualResponse(manualRepository.findById(id).orElseThrow());
    }
}
