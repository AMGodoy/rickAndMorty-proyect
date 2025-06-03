package com.amg.mgdev.rickandmortyapi.controller;

import com.amg.mgdev.rickandmortyapi.controller.dto.CharacterDTO;
import com.amg.mgdev.rickandmortyapi.services.CharacterService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/characters")
@RestController
public class CharacterController {

    private final CharacterService characterService;

    public CharacterController(CharacterService characterService) {
        this.characterService = characterService;
    }

    @GetMapping
    public ResponseEntity<List<CharacterDTO>> getAllCharacters(@RequestParam(defaultValue = "1") Integer page) {
        return ResponseEntity.ok(characterService.getAllCharacters(page));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CharacterDTO> getCharacterById(@PathVariable Integer id){
        return ResponseEntity.ok(characterService.getCharacterById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<CharacterDTO>> searchCharacter(@RequestParam String name) {
        List<CharacterDTO> characterDTOList = characterService.findByName(name);
        return ResponseEntity.ok(characterDTOList);
    }

    @GetMapping("/character/pdf")
    public ResponseEntity<byte[]> getCharacterPdf(@RequestParam Integer id) {
        CharacterDTO character = characterService.getCharacterById(id);

        byte[] pdfBytes = characterService.generateCharacterPdf(character);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + character.getName() + ".pdf")
                .body(pdfBytes);
    }


}
