package com.amg.mgdev.rickandmortyapi.models;

import lombok.Data;

@Data
public class Info {
    private Integer count;
    private Integer pages;
    private String next;
    private String prev;
}
