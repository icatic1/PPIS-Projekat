package service.desk.airport.servicedesk.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.desk.airport.servicedesk.dao.TicketRepository;
import service.desk.airport.servicedesk.dto.ticket.TicketCreateRequest;
import service.desk.airport.servicedesk.dto.ticket.TicketResponse;
import service.desk.airport.servicedesk.dto.ticketcomment.TicketCommentResponse;
import service.desk.airport.servicedesk.entity.Ticket;
import service.desk.airport.servicedesk.enums.Category;
import service.desk.airport.servicedesk.enums.PriorityLevel;
import service.desk.airport.servicedesk.enums.TicketStatus;
import service.desk.airport.servicedesk.enums.TicketTag;
import service.desk.airport.servicedesk.security.dao.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TicketService {
    @Autowired
    TicketRepository ticketRepository;
    @Autowired
    UserRepository userRepository;

    public Ticket getTicket(Integer ticketId) {

        return ticketRepository.findById(ticketId).orElseThrow();
    }

    public TicketResponse createTicket(TicketCreateRequest request) {
        var user = userRepository.findByEmail(request.getUserEmail()).orElseThrow();
        var tag = TicketTag.valueOf(request.getTag());
        var priority = PriorityLevel.valueOf(request.getPriorityLevel());
        var category = Category.valueOf(request.getCategory());
        var code = "T-" + request.getTag().charAt(0) + "- " +  UUID.randomUUID().toString();
        var status = TicketStatus.ACTIVE;
        var date = LocalDateTime.now();

        var ticket = new Ticket(code,request.getTitle(),request.getDescription(),status,priority,category,tag,date,user);
        ticketRepository.save(ticket);

        return new TicketResponse(ticket);
    }

    public List<TicketResponse>  getActiveTicketsForUser(Integer userId) {
        return ticketRepository
                .findActiveTicketsByUserId(userId)
                .stream()
                .map(t -> new TicketResponse(t))
                .collect(Collectors.toList());
    }

    public List<TicketResponse>  getProcessedTicketsForUser(Integer userId) {
        return ticketRepository
                .findProcessedTicketsByUserId(userId)
                .stream()
                .map(t -> new TicketResponse(t))
                .collect(Collectors.toList());
    }

    public List<TicketResponse>  getOtherTicketsForUser(Integer userId) {
        return ticketRepository
                .findOtherActiveTicketsByUserId(userId)
                .stream()
                .map(t -> new TicketResponse(t))
                .collect(Collectors.toList());
    }


}
