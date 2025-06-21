import { Component, OnInit, inject } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { OccasionsService } from '../../core/services/occasions/occasions.service';
import { Ioccasions } from '../../shared/interfaces/i-occasions';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-occasions',
  standalone: true,
  imports: [
    FormsModule,
    InputIconModule,
    InputTextModule,
    TableModule,
    PaginatorModule,
    RouterLink,
  ],
  templateUrl: './occasions.component.html',
  styleUrls: ['./occasions.component.scss'],
})
export class OccasionsComponent implements OnInit {
  private readonly occasionsService = inject(OccasionsService);
  searchQuery: string = '';
  filteredOccasions: Ioccasions[] = [];
  allOccasions: Ioccasions[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loadOccasions();
  }

  loadOccasions(): void {
    this.loading = true;
    this.occasionsService.getAllOccasions().subscribe({
      next: (res) => {
        this.allOccasions = res.occasions;
        this.filteredOccasions = [...this.allOccasions];

        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }
filterOccasions(): void {
  if (!this.searchQuery.trim()) {
    this.filteredOccasions = [...this.allOccasions];
    return;
  }

  const query = this.searchQuery.toLowerCase().trim();
  this.filteredOccasions = this.allOccasions.filter(occasion =>
    occasion.name.toLowerCase().includes(query) ||
    occasion.productsCount?.toString().includes(query)
  );
}
  deleteOccasion(id: string): void {
    this.occasionsService.deleteOccasion(id).subscribe({
      next: () => this.loadOccasions(),
      error: (err) => console.log(err),
    });
  }
}
