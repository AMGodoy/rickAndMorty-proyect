package com.amg.mgdev.rickandmortyapi.controller.dto;

import lombok.Data;

@Data
public class CharacterDTO {
    private Integer id;
    private String name;
    private String status;
    private String species;
    private String lastKnownLocation;
    private String firstSeenIn;
    private String image;
}
