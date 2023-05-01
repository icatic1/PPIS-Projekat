package service.desk.airport.servicedesk.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import service.desk.airport.servicedesk.entity.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {
}
