package com.amg.mgdev.rickandmortyapi.controller.dto;

import com.amg.mgdev.rickandmortyapi.models.Character;
import com.amg.mgdev.rickandmortyapi.models.Info;
import lombok.Data;

import java.util.List;

@Data
public class CharacterListResponse {

    private Info info;
    private List<Character> results;
}
