package com.iPlant.mes.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.iPlant.mes.security.domain.User;

public class UserServiceImpl implements UserDetailsService{
	
	/* (non-Javadoc)
     * @see org.springframework.security.core.userdetails.UserDetailsService#loadUserByUsername(java.lang.String)
     */
    public UserDetails loadUserByUsername(String arg0)
            throws UsernameNotFoundException
    {
        UserDetails userDetails = new User(arg0, "");
        return userDetails;
    }

	
}
