package com.amg.mgdev.rickandmortyapi.services;

import com.amg.mgdev.rickandmortyapi.controller.dto.CharacterDTO;
import com.amg.mgdev.rickandmortyapi.controller.dto.CharacterListResponse;

import com.amg.mgdev.rickandmortyapi.models.Character;
import com.amg.mgdev.rickandmortyapi.models.Episode;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayOutputStream;
import java.net.URL;
import java.util.stream.Collectors;

import java.util.List;

@Service
public class CharacterServiceImpl implements CharacterService{

    @Value("${api.rickmorty.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate;

    public CharacterServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    @Override
    public List<CharacterDTO> getAllCharacters(Integer page) {
        String url = baseUrl + "/character?page=" + page;
        CharacterListResponse response = restTemplate.getForObject(url, CharacterListResponse.class);
        return response.getResults().stream().map(this::mapToDto).collect(Collectors.toList());
    }


    @Override
    public CharacterDTO getCharacterById(Integer id) {
        String url =  baseUrl + "/character/" + id;
        Character character = restTemplate.getForObject(url, Character.class);


        return mapToDto(character);
    }

    @Override
    public List<CharacterDTO> findByName(String name) {
        String url = baseUrl + "/character/?name=" + name;

        CharacterListResponse response = restTemplate.getForObject(url,CharacterListResponse.class);
        List<CharacterDTO> characters = response.getResults().stream().
                map(this::mapToDto).toList();
        if (characters.isEmpty()) {
            throw new RuntimeException("No character found with name: " + name);
        }

        return characters;
    }

    private CharacterDTO mapToDto(Character character){
        CharacterDTO characterDTO = new CharacterDTO();

        characterDTO.setId(character.getId());
        characterDTO.setName(character.getName());
        characterDTO.setImage(character.getImage());
        characterDTO.setStatus(character.getStatus());
        characterDTO.setSpecies(character.getSpecies());
        characterDTO.setLastKnownLocation(character.getLocation().getName());

        String episodeName = "Unknow";
        String urlPrimerEpisodio = character.getEpisode().get(0);
        Episode episodio = restTemplate.getForObject(urlPrimerEpisodio, Episode.class);
        episodeName = episodio.getName();

        characterDTO.setFirstSeenIn(episodeName);
        return characterDTO;
    }

    @Override
    public byte[] generateCharacterPdf(CharacterDTO character) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();

            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            // Título
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Información del Personaje", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" ")); // Espacio en blanco

            // Descargar y agregar la imagen
            try {
                Image image = Image.getInstance(new URL(character.getImage()));
                image.scaleToFit(150, 150); // Escalar la imagen (editar a gusto)
                image.setAlignment(Element.ALIGN_CENTER);
                document.add(image);
            } catch (Exception imgEx) {
                // Si falla, agrega solo el texto de la URL
                document.add(new Paragraph("Image: " + character.getImage()));
            }

            // Contenido del personaje
            document.add(new Paragraph("Name: " + character.getName()));
            document.add(new Paragraph("Status: " + character.getStatus()));
            document.add(new Paragraph("Species: " + character.getSpecies()));
            document.add(new Paragraph("Last known location: " + character.getLastKnownLocation()));
            document.add(new Paragraph("First seen in: " + character.getFirstSeenIn()));

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error al generar PDF", e);
        }
    }

}
