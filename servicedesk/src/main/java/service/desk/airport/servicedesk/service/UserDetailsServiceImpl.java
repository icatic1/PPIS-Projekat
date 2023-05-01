package service.desk.airport.servicedesk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import service.desk.airport.servicedesk.authorization.AirportUserDetails;
import service.desk.airport.servicedesk.dao.UserRepository;
import service.desk.airport.servicedesk.entity.User;

import java.util.List;

public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<User> user = userRepository.findByEmail(username);

        if (user == null || user.isEmpty()) {
            throw new UsernameNotFoundException("Could not find user");
        }

        return new AirportUserDetails(user.get(0));
    }
}
