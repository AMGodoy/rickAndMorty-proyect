package com.amg.mgdev.rickandmortyapi.models;

import lombok.Data;

import java.util.List;

@Data
public class Location {
    private Integer id;
    private String name;
    private String type;
    private String dimension;
    private List<String> residents;
    private String url;
    private String created;
}
