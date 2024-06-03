import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { IAutor, IAutorResponse } from '../../../interfaces/IAutor';
import { AutorService } from '../../../services/autor.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-autor-detail',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatDividerModule],
  templateUrl: './autor-detail.component.html',
  styleUrl: './autor-detail.component.scss'
})
export class AutorDetailComponent implements OnInit{
  autorService = inject(AutorService);
  autorInfo$: IAutorResponse | undefined;

  constructor(private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // Cambia 'id' por el nombre de tu parámetro
      this.autorService.getAutor(id!.toString()).subscribe(data => {
        this.autorInfo$ = data
      })
    });
  }
}
