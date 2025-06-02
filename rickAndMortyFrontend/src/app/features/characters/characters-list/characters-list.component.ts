import { Component } from '@angular/core';
import { CharactersService } from '../../../core/services/characters.service';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.css'
})
export class CharactersListComponent {

  characterList:any[]=[]
  constructor( private characterService: CharactersService){
    
  }

  ngOnInit(): void {
    this.findAllCharacters();
    
  }

  findAllCharacters(){
    this.characterService.findAll().subscribe({
      next: (data) => {
        this.characterList=data
      },
      error: (err) => {console.log(err);
      }
    })
  
  }
  

}
