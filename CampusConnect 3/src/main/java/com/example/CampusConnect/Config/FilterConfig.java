package com.example.CampusConnect.Config;

import com.example.CampusConnect.Filters.TokenRequestFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<TokenRequestFilter> tokenFilter(){
        FilterRegistrationBean<TokenRequestFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new TokenRequestFilter());
        registrationBean.addUrlPatterns("/api/*"); // Define the URL patterns for which the filter applies
        return registrationBean;
    }
}
