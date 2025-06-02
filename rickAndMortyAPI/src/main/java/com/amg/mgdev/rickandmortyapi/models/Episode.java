package com.amg.mgdev.rickandmortyapi.models;

import lombok.Data;

import java.util.List;

@Data
public class Episode {
    private Integer id;
    private String name;
    private String air_date;
    private String episode;
    private List<String> character;
    private String url;
    private String created;
}
