package service.desk.airport.servicedesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.desk.airport.servicedesk.dto.ticket.TicketCreateRequest;
import service.desk.airport.servicedesk.dto.ticket.TicketResponse;
import service.desk.airport.servicedesk.service.TicketService;

import static org.springframework.security.authorization.AuthorityAuthorizationManager.hasRole;

@RestController
@RequestMapping(path="/ticket")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @PreAuthorize("hasRole('sd_user')")
    @PostMapping("/create")
    public ResponseEntity<TicketResponse> createTicket(@RequestBody TicketCreateRequest request) {

        try {
            return ResponseEntity.ok(ticketService.createTicket(request));
        } catch (Exception e) {
            return new  ResponseEntity<TicketResponse>(HttpStatus.BAD_REQUEST);
        }
    }
}
