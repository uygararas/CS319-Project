package com.example.CampusConnect.Filters;

import com.example.CampusConnect.Util.JwtUtil;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class TokenRequestFilter implements Filter, jakarta.servlet.Filter {

    private JwtUtil jwtUtil = new JwtUtil();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String authorizationHeader = httpRequest.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }

        if (username != null && jwtUtil.validateToken(jwt, username)) {
            // Optionally, add code to set user details in the context
        }

        chain.doFilter(request, response);
    }

    @Override
    public void doFilter(jakarta.servlet.ServletRequest servletRequest, jakarta.servlet.ServletResponse servletResponse, jakarta.servlet.FilterChain filterChain) throws IOException, jakarta.servlet.ServletException {

    }

    @Override
    public void destroy() {

    }

    // Implement other required methods like init() and destroy()
}
