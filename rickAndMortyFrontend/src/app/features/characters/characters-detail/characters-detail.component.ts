import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../../../core/services/characters.service';
import { Character } from '../../../core/interfaces/characters.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-characters-detail',
  standalone: true,
  imports: [],
  templateUrl: './characters-detail.component.html',
  styleUrl: './characters-detail.component.css'
})
export class CharactersDetailComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private characterService = inject(CharactersService);

  characterId!: number;
  errorMsg: string | null = null;
  characterDetail!: Character;
  downloadFileName = 'character.pdf';

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const idParam = paramMap.get('id');

      if (!idParam) {
        this.mostrarError('No se recibió ningún id en la URL.');
        return;
      }

      const enteroPositivoRegex = /^[1-9]\d*$/;
      if (!enteroPositivoRegex.test(idParam)) {
        this.mostrarError('El id debe ser un entero positivo mayor que cero.');
        return;
      }
      
      const idNum = parseInt(idParam, 10);

      this.characterId = idNum;
      this.errorMsg = null; 

      this.cargarPersonaje(this.characterId);
    });
  }

  private mostrarError(mensaje: string) {

    this.errorMsg = mensaje;

  }

  private cargarPersonaje(id: number) {
    this.characterService.getCharacterById(id).subscribe({
      next: personaje => {
        console.log('Datos del personaje:', personaje);
        this.characterDetail = personaje;
      },
      error: err => {
        this.mostrarError('No se pudo cargar el personaje (error de la API).');
        console.error(err);
      }
    });
  }
async downloadPdf(id: number) {
    this.errorMsg = null;

    try {
      const blob: Blob = await firstValueFrom(
        this.characterService.getCharacterPdf(id)
      );

      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = this.downloadFileName; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Error al descargar el PDF:', err);
      this.errorMsg = 'No se pudo descargar el PDF. Intenta nuevamente.';
    }
  }


}
