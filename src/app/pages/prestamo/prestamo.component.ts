import { Component, inject } from '@angular/core';
import { PrestamoListComponent } from '../../components/prestamo/prestamo-list/prestamo-list.component';
import { PrestamosService } from '../../services/prestamo.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-prestamo',
  standalone: true,
  imports: [PrestamoListComponent, AsyncPipe],
  templateUrl: './prestamo.component.html',
  styleUrl: './prestamo.component.scss'
})
export class PrestamoComponent{
  prestamoService = inject(PrestamosService);
  prestamos$ = this.prestamoService.getPrestamo();
}
