package com.ecore.countdown;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ecore.countdown.DB.EventRepository;
import com.ecore.countdown.Models.Event;
import com.ecore.countdown.Utils.InvalidDateException;
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
    public List<Event> getAllEvents() {
        return eventRepository.findAll();}

    @PostMapping("/events")
    public @ResponseBody Long addNewEvent(@RequestBody Event event) {
        eventRepository.save(event);
        return event.getId();
    }

    @GetMapping("/events/timer/{id}")
    public @ResponseBody String updateTimer(@PathVariable Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        return new Gson().toJson(event.getTimeRemaining(event.getDate()));
    }
    /*S*/

    @GetMapping("/events/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("Event not found with id:" + id));
        return ResponseEntity.ok(event);
    }

    @PutMapping("/events/{id}")
    public @ResponseBody ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails){
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

    @DeleteMapping("/events")
    public ResponseEntity<Map<String, Boolean>> deleteAll(){
        eventRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PutMapping("events/completed/{id}")
    public ResponseEntity<Event> setCompletedEvent(@PathVariable Long id, @RequestBody Boolean completed) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        event.setCompleted(completed);
        event.setDate(LocalDateTime.now());
        Event updatedEvent = eventRepository.save(event);
        return ResponseEntity.ok(updatedEvent);
    }
}

