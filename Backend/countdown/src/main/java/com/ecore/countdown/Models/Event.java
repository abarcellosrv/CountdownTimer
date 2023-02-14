package com.ecore.countdown.Models;

import com.ecore.countdown.Utils.InvalidDateException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Entity
public class Event {


    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String name;
    @Column
    private LocalDateTime date;
    @Column
    private String description;
    @Transient
    private Datetime timeDifference;


    public Event() {}

    public Event(String name, LocalDateTime date, String description) {
        this.name = name;
        this.date = date;
        this.description = description;
        this.timeDifference = this.getTimeRemaining(this.getDate());
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Datetime getTimeDifference() {
        return timeDifference;
    }

    public void setTimeDifference(Datetime timeDifference) {
        this.timeDifference = timeDifference;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Datetime getTimeRemaining(LocalDateTime targetTime) {
        LocalDateTime now = LocalDateTime.now();
        Duration fullTimeDiff = Duration.between(now, targetTime);
        if(fullTimeDiff.isNegative()){
            return new Datetime(0,0,0,0);
        }
        Datetime timeDiff = new Datetime(fullTimeDiff);
        return new Datetime(timeDiff.getDays(), timeDiff.getHours() % 24,timeDiff.getMinutes() % 60, timeDiff.getSeconds() % 60 );
    }
}
