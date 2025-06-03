import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchControl = new FormControl<string>('', { nonNullable: true });

  @Output() searchEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        filter((value: string) => {
          return value.trim().length > 0 || value.length === 0;
        }),

        map((value: string) => value.trim()),

        distinctUntilChanged()
      )
      .subscribe((trimmed: string) => {
        this.searchEvent.emit(trimmed);
      });
  }

}
