import { Component, OnInit, inject } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { ICategoriaResponse } from '../../../interfaces/ICategoria';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-categoria-detail',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatCardModule],
  templateUrl: './categoria-detail.component.html',
  styleUrl: './categoria-detail.component.scss'
})
export class CategoriaDetailComponent implements OnInit{
  categoriaService = inject(CategoriaService);
  categoriaInfo$: ICategoriaResponse | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // Cambia 'id' por el nombre de tu parámetro
      this.categoriaService.getCategoria(id!.toString()).subscribe(data => {
        this.categoriaInfo$ = data
      })
    });
  }
}
