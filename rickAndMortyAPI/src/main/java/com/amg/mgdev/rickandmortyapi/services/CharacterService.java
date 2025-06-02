package com.amg.mgdev.rickandmortyapi.services;

import com.amg.mgdev.rickandmortyapi.controller.dto.CharacterDTO;

import java.util.List;


public interface CharacterService{

    List<CharacterDTO> getAllCharacters(Integer page);

    CharacterDTO getCharacterById(Integer id);

    byte[] generateCharacterPdf(CharacterDTO character);



    List<CharacterDTO> findByName(String name);
}
