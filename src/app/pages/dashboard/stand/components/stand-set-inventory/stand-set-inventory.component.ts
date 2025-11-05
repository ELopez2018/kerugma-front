import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { InventoryApiService } from './services/api/inventory-api.service';
import { Inventory, Stand } from '../../interfaces/stand.interface';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-stand-set-inventory',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './stand-set-inventory.component.html',
  styleUrl: './stand-set-inventory.component.css',
  standalone: true
})
export class StandSetInventoryComponent implements OnInit  {
  @Input({ required: true }) stand!: Stand;
  items = signal<Inventory[]>([]);
  editingId = signal<number | null>(null);
  loading = signal(false);
  creating = signal(false);
  standSelected = signal<Stand | null>(null); ;
  types = ['FOLLETO','LIBRO','REVISTA','TRATADO'];

  fb = new FormBuilder();

  form = this.fb.group({
    id: [null],
    title: ['', [Validators.required, Validators.minLength(3)]],
    stock: [0, [Validators.required]],
    type: ['', Validators.required],
    stand: [<Stand>{}],
  });

  constructor(private api: InventoryApiService) { }

  ngOnInit(): void {
    this.loadItems();

  }

  loadItems(): void {
    this.loading.set(true);
    this.api
      .getAll$()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.items.set(data),
        error: (err) => console.error(err),
      });
  }

  startCreate(): void {
    this.creating.set(true);
    this.editingId.set(null);
    this.form.reset({ stock: 0 });
  }

  startEdit(item: Inventory): void {
    this.editingId.set(item.id!);
    this.creating.set(false);
    this.form.patchValue(item);
  }

  cancel(): void {
    this.form.reset();
    this.creating.set(false);
    this.editingId.set(null);
  }

  save(): void {

    if (this.form.invalid) {
       console.log(this.form.value);
      console.error("Invalid");
      this.form.markAllAsTouched();
      return;
    }

    const body = {...this.form.value, stand: this.stand } as Inventory;
    this.loading.set(true);

    const req$ = this.creating()
      ? this.api.save$(body)
      : this.api.update$(body, body.id!,);

    req$
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.loadItems();
          this.cancel();
        },
        error: (err) => console.error(err),
      });
  }

  delete(item: Inventory): void {
    if (!confirm(`¿Eliminar "${item.title}"?`)) return;
    this.loading.set(true);
    this.api
      .delete$(item.id!)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.loadItems(),
        error: (err) => console.error(err),
      });
  }
}
