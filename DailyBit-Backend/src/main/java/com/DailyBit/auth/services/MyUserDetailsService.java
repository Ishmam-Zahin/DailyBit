package com.DailyBit.auth.services;


import com.DailyBit.auth.models.MyUserDetails;
import com.DailyBit.auth.models.User;
import com.DailyBit.auth.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    @Autowired
    public MyUserDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUserName(username).orElse(null);
        if (user == null) {
            user = userRepo.findByEmail(username).orElse(null);
        }
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        return  new MyUserDetails(user);
    }

}
