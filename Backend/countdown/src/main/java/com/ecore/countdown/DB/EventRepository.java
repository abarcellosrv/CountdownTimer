package com.ecore.countdown.DB;

import com.ecore.countdown.Models.Event;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EventRepository extends JpaRepository<Event, Long> {

}
