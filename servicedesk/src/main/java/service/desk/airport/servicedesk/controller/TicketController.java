package service.desk.airport.servicedesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.dto.ticket.TicketCreateRequest;
import service.desk.airport.servicedesk.dto.ticket.TicketResponse;
import service.desk.airport.servicedesk.security.service.JwtService;
import service.desk.airport.servicedesk.service.TicketService;

@RestController
@RequestMapping(path="/ticket")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @Autowired
    private JwtService jwtService;

    @PreAuthorize("hasRole('sd_user')")
    @PostMapping("/create")
    public ResponseEntity<TicketResponse> createTicket(
            @RequestBody TicketCreateRequest request,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {

        var email = jwtService.extractUsername(token.substring(7));
        request.setUserEmail(email);
        try {
            return ResponseEntity.ok(ticketService.createTicket(request));
        } catch (Exception e) {
            return new  ResponseEntity<TicketResponse>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponse> getTicketById(@PathVariable("id")Integer ticketId) {
        try {
            return ResponseEntity.ok(new TicketResponse(ticketService.getTicket(ticketId)));
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
