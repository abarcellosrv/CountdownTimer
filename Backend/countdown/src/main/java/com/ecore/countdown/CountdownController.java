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

    @PostMapping("/countdown/events")
    public @ResponseBody String calculateTime(@RequestBody Event event) {
        String timeDiff = new Gson().toJson(event.getTimeRemaining(event.getDate()));
        System.out.println(timeDiff);
        return timeDiff;
    }
}

