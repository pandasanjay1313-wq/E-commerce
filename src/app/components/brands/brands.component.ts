import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/brand.model';



@Component({
  selector: 'app-brands',
  standalone: false,
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {

brands: Brand[] =[];
selectedBrandId: number = 0;
constructor(private brandservice : BrandService){}
 
ngOnInit(): void {
  this.getBrands();
}
 getBrands(): void {
    this.brandservice.getBrands().subscribe({
      next: (response) => {
        this.brands = response.brands;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  

onBrandChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  this.selectedBrandId = Number(selectElement.value);
  console.log('Selected Brand Id:', this.selectedBrandId);
}
  

}
