package com.ecore.countdown.DB;

import com.ecore.countdown.Models.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EventRepository extends CrudRepository<Event, Long> {
    List<Event> findAllById(Long id);
}
