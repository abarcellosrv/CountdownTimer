package com.ecore.countdown;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.ecore.countdown.DB.EventRepository;
import com.ecore.countdown.Models.Event;
import com.google.gson.Gson;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class CountdownController {

    private final EventRepository eventRepository;

    public CountdownController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping("/countdown/events")
    public String getTimeRemaining(@RequestParam("targetDateTime") String targetDateTime) {
        LocalDateTime target = LocalDateTime.parse(targetDateTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(now, target);
        long seconds = duration.getSeconds();
        long minutes = seconds / 60;
        long hours = minutes / 60;
        long days = hours / 24;
        return String.format("%d days, %d hours, %d minutes, and %d seconds", days, hours % 24, minutes % 60, seconds % 60);
    }

    @PostMapping("/countdown/events")
    public @ResponseBody String calculateTime(@RequestBody Event event) {
        Event savedEvent = eventRepository.save(event);
        String timeDiff = new Gson().toJson(event.getTimeRemaining(event.getDate()));
        System.out.println(timeDiff);
        //System.out.println(eventRepository.findAllById(event.getId()));
        return timeDiff;
    }
}

