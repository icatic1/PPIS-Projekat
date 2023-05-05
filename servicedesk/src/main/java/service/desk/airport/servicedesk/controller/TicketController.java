package service.desk.airport.servicedesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.desk.airport.servicedesk.dto.ticket.TicketCreateRequest;
import service.desk.airport.servicedesk.dto.ticket.TicketResponse;
import service.desk.airport.servicedesk.entity.Ticket;
import service.desk.airport.servicedesk.security.dto.AuthResponse;
import service.desk.airport.servicedesk.security.dto.RegisterRequest;
import service.desk.airport.servicedesk.service.TicketService;

@RestController
@RequestMapping(path="/ticket")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @PostMapping("/create")
    public ResponseEntity<TicketResponse> createTicket(@RequestBody TicketCreateRequest request) {

        try {
            return ResponseEntity.ok(ticketService.createTicket(request));
        } catch (Exception e) {
            return (ResponseEntity<TicketResponse>) ResponseEntity.badRequest();
        }
    }
}
