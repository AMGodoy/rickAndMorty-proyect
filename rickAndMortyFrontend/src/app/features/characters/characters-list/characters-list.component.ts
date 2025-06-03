import { Component, inject } from '@angular/core';
import { CharactersService } from '../../../core/services/characters.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { Character } from '../../../core/interfaces/characters.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [SpinnerComponent, SearchComponent,RouterLink],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.css'
})
export class CharactersListComponent {

  characterList: Character[] = []
  spinner: boolean = true;
  message: string = '';
  private readonly characterService = inject(CharactersService)

  ngOnInit(): void {
    this.findAllCharacters();
    
  }

  findAllCharacters(){
    this.spinner = true;
    this.characterService.findAll().subscribe({
      next: (data) => {
        this.characterList=data
        this.spinner = false;
      },
      error: (err) => {console.log(err);
        this.spinner = false;
      }
    })
  }

  onSearchTerm(term: string): void {
    if (!term) {
      this.findAllCharacters();
      return;
    }

    this.spinner = true;
    this.characterService.search(term).subscribe({
      next: (data) => {
        this.characterList = data;
        this.spinner = false;
      },
      error: (err) => {
        this.characterList = [];
        this.message = `No results were found for the search for "${term}"`;
        this.spinner = false;
      },
    });
  }
  

}
