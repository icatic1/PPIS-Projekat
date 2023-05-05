package service.desk.airport.servicedesk.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import service.desk.airport.servicedesk.entity.Ticket;
import service.desk.airport.servicedesk.security.entity.Department;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
}
