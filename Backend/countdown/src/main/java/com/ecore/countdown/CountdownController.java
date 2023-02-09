package com.ecore.countdown;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ecore.countdown.DB.EventRepository;
import com.ecore.countdown.Models.Event;
import com.ecore.countdown.Test.Employee;
import com.ecore.countdown.Utils.ResourceNotFoundException;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/countdown/")
public class CountdownController {

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/events")
    public List<Event> getAllEvents() { return eventRepository.findAll();}

    @PostMapping("/events")
    public @ResponseBody String calculateTime(@RequestBody Event event) {
        eventRepository.save(event);
        String timeDiff = new Gson().toJson(event.getTimeRemaining(event.getDate()));
        System.out.println(timeDiff);
        return timeDiff;
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("Event not found with id:" + id));
        return ResponseEntity.ok(event);
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails){
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        event.setName(eventDetails.getName());
        event.setDate(eventDetails.getDate());
        event.setDescription(eventDetails.getDescription());

        Event updatedEvent = eventRepository.save(event);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEvent(@PathVariable Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        eventRepository.delete(event);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}

