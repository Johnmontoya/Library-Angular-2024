import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ILibro } from '../../../interfaces/ILibro';
import { IValidationError } from '../../../interfaces/IValidationError';
import { AsyncPipe, NgForOf } from '@angular/common';
import { CategoriaService } from '../../../services/categoria.service';
import { Observable, map, startWith } from 'rxjs';
import { ICategoria } from '../../../interfaces/ICategoria';
import { AutorService } from '../../../services/autor.service';
import { IAutor } from '../../../interfaces/IAutor';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgForOf,
    AsyncPipe,
    MatDialogModule,
  ],
  templateUrl: './libro-form.component.html',
  styleUrl: './libro-form.component.scss',
})
export class LibroFormComponent implements OnInit, OnChanges {
  libroForm: FormGroup;
  errorMessage: IValidationError[];
  name$: string;

  myControl = new FormControl('');
  myControlAutor = new FormControl('');
  categoryService = inject(CategoriaService);
  autorService = inject(AutorService);
  listCategoria$: Observable<string[]> = this.categoryService
    .selectCategorias()
    .pipe(
      map((data: ICategoria[]) =>
        data.map((categoria: ICategoria) => categoria.Nombre)
      )
    );
  listAutor$: Observable<string[]> = this.autorService
    .selectAutor()
    .pipe(map((data: IAutor[]) => data.map((autor: IAutor) => autor.Nombre)));
  categorias: ICategoria[] = [];
  autores: IAutor[] = [];
  filteredOptions!: Observable<string[]>;
  filteredOptionsAutors!: Observable<string[]>;
  @Input({ required: true }) libro!: ILibro;

  constructor(
    @Optional() private dialogRef: MatDialogRef<LibroFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      libros: ILibro;
      errorMessage: IValidationError[];
      edit: string;
    },
    private fb: FormBuilder
  ) {
    this.libroForm = this.fb.group({
      Id: [data.libros.Id],
      CategoriaId: [data.libros.CategoriaId],
      Categoria: [data.libros.Categoria],
      Nombre: [data.libros.Nombre],
      Editorial: [data.libros.Editorial],
      AutorId: [data.libros.AutorId]
    });
    this.name$ = data.edit;
    this.errorMessage = data.errorMessage;
  }

  ngOnInit(): void {
    this.categoryService.selectCategorias().subscribe((data) => {
      this.categorias = data;
      this.setFormValues();
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCategoria(value || ''))
      );
    });

    this.autorService.selectAutor().subscribe((data) => {
      this.autores = data;
      this.setFormValues();
      this.filteredOptionsAutors = this.myControlAutor.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterAutor(value || ''))
      )
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.errorMessage = this.data.errorMessage || [];
      this.setFormValues();
    }
  }

  private getCategoriaId(nombre: string): string {
    const categoria = this.categorias.find(c => c.Nombre === nombre);
    return categoria ? categoria.Id : '';
  }

  private getAutorId(nombre: string): string {
    console.log('get', nombre)
    const autor = this.autores.find(a => a.Nombre === nombre);
    return autor ? autor.Id : '';
  }

  save() {
    const formData = this.libroForm.value;
    if (this.libroForm.valid) {
      const categoriaId = this.getCategoriaId(formData.CategoriaId);
      const autorId = this.getAutorId(formData.AutorId);
      
      const updateFormData = {
        ...formData,
        CategoriaId: categoriaId,
        AutorId: autorId
      }
      this.dialogRef.close(updateFormData);
    } else {
      this.libroForm.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close();
  }

  private setFormValues() {
    if(this.categorias.length > 0 && this.autores.length > 0) {
      this.libroForm.patchValue({
        CategoriaId: this.getCategoriaNombre(this.libroForm.value.CategoriaId),
        AutorId: this.getAutorNombre(this.libroForm.value.AutorId)
      })
    }
  }

  private getCategoriaNombre(id: string): string {
    const categoria = this.categorias.find(c => c.Id === id);
    return categoria ? categoria.Nombre : '';
  }

  private _filterCategoria(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categorias
      .map((categoria) => categoria.Nombre)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }

  private getAutorNombre(id: string): string {
    const autor = this.autores.find(a => a.Id === id);
    return autor ? autor.Nombre : '';
  }

  private _filterAutor(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.autores
      .map((autor) => autor.Nombre)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }
}

/**
 * 
 * 
  ngOnInit(): void {
    this.categoryService.selectCategorias().subscribe((data) => {
      this.categorias = data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCategoria(value || ''))
      );

      // Patchear los valores iniciales del formulario si estamos editando un libro
      if (this.libro) {
        this.patchFormValues(this.libro);
      }
    });

    this.autorService.selectAutor().subscribe((data) => {
      this.autores = data;
      this.filteredOptionsAutors = this.myControlAutor.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterAutor(value || ''))
      )

      if(this.libro){
        this.patchFormValuesAutor(this.libro)
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['libro'] && changes['libro'].currentValue) {
      this.patchFormValues(changes['libro'].currentValue);
    }

    if (changes['libro'] && changes['libro'].currentValue) {
      this.patchFormValuesAutor(changes['libro'].currentValue);
    }
  }

  private patchFormValues(libro: ILibro): void {
    console.log(libro)
    const categoria = this.categorias.find((c) => c.Id === libro.CategoriaId);
    if (categoria) {
      this.myControl.setValue(categoria.Nombre);
    }
  }

  private patchFormValuesAutor(libro: ILibro): void {
    const autors = this.autores.find((a) => a.Id === libro.AutorId);
    if(autors) {
      this.myControlAutor.setValue(autors.Nombre)
    }
  }

  save() {
    const selectedCategoria = this.categorias.find(
      (categoria) => categoria.Nombre === this.myControl.value
    );
    if (selectedCategoria) {
      this.libro.CategoriaId = selectedCategoria.Id;
    }

    const selectedAutor = this.autores.find(
      (autores) => autores.Nombre === this.myControlAutor.value
    );
    if(selectedAutor) {
      this.libro.AutorId = selectedAutor.Id
    }

    this.addLibro.emit(this.libro);
    this.myControl.reset();
    this.myControlAutor.reset();
  }

  private _filterCategoria(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categorias
      .map((categoria) => categoria.Nombre)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }

  private _filterAutor(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.autores
      .map((autor) => autor.Nombre)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }
 */
