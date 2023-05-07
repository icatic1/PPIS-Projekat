package service.desk.airport.servicedesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.dto.ticket.TicketCreateRequest;
import service.desk.airport.servicedesk.dto.ticket.TicketFilterRequest;
import service.desk.airport.servicedesk.dto.ticket.TicketResponse;
import service.desk.airport.servicedesk.security.service.JwtService;
import service.desk.airport.servicedesk.service.TicketService;

import java.util.List;

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

    @GetMapping("/active/user/{id}")
    public ResponseEntity<List<TicketResponse>> getActiveTicketsForUser(
            @PathVariable("id") Integer userId
    ) {
        return ResponseEntity.ok(ticketService.getActiveTicketsForUser(userId));
    }

    @GetMapping("/processed/user/{id}")
    public ResponseEntity<List<TicketResponse>> getProcessedTicketsForUser(
            @PathVariable("id") Integer userId
    ) {
        return ResponseEntity.ok(ticketService.getProcessedTicketsForUser(userId));
    }

    @GetMapping("/others/user/{id}")
    public ResponseEntity<List<TicketResponse>> getOtherTicketsForUser(
            @PathVariable("id") Integer userId
    ) {
        return ResponseEntity.ok(ticketService.getOtherTicketsForUser(userId));
    }

    @PreAuthorize("hasRole('sd_user')")
    @PostMapping("/assign/{id}")
    public ResponseEntity<TicketResponse> assignTicket(
            @PathVariable("id") Integer ticketId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            var userEmail = jwtService.extractUsername(token.substring(7));
            return ResponseEntity.ok(ticketService.assignTicket(userEmail, ticketId));
        } catch (Exception e) {
            return new  ResponseEntity<TicketResponse>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('sd_user')")
    @PostMapping("/verify/{id}")
    public ResponseEntity<TicketResponse> verifyTicket(
            @PathVariable("id") Integer ticketId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            return ResponseEntity.ok(ticketService.verifyTicket(ticketId));
        } catch (Exception e) {
            return new  ResponseEntity<TicketResponse>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('sd_user')")
    @PostMapping("/close/{id}")
    public ResponseEntity<TicketResponse> closeTicket(
            @PathVariable("id") Integer ticketId) {

            return ResponseEntity.ok(ticketService.closeTicket(ticketId));

    }

    @GetMapping("/all")
    public ResponseEntity<List<TicketResponse>> getAllTickets() {
        try {
            return ResponseEntity.ok(ticketService.getAllTickets());
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/filter")
    public ResponseEntity<List<TicketResponse>> getFilteredTickets(
            @RequestBody TicketFilterRequest request){
        try {
            return ResponseEntity.ok(ticketService.filteredSortedTickets(request));
        } catch (Exception e) {
            return new  ResponseEntity<List<TicketResponse>>(HttpStatus.BAD_REQUEST);
        }
    }
}
