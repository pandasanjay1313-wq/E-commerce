import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-common-list',
  standalone: false,
  templateUrl: './common-list.component.html',
  styleUrl: './common-list.component.css'
})
export class CommonListComponent {

  @Input() data: any[] =[];
  
  @Input() columns: any[] =[];

  @Input() categories: any[] = [];

  searchText: string='';
  selectedCategory: string='';

  //sort
  sortField: string ='';
  sortDirection: string='';


   getValue(item: any, field: string): any {
  return field.split('.').reduce((value, key) => value?.[key], item);
}
 
   get filterData(): any[] {
    
    let result = this.data;

    if (this.searchText.trim()) {
      const searchValue = this.searchText.toLowerCase().trim();
      result = result.filter(item =>
        this.columns.some(column => {
          const value = this.getValue(item, column.field);

          return String(value ?? '').toLowerCase().includes(searchValue);
        })
      );
    }

    // Category filter
    if (this.selectedCategory) {

      result = result.filter(item => {
        const categoryName =this.getValue(item, 'category.name');
        return categoryName === this.selectedCategory;
      });
    }
    return result;
  }

  sortData():void{
    if(!this.sortField || !this.sortDirection){
      return;
    }
    this.data.sort((a,b)=>{
      const valueA = this.getValue(a,this.sortField);
      const valueB = this.getValue(b,this.sortField);

      if(valueA ==null) return 1;
      if(valueB == null) return -1;

      if(typeof valueA ==='number' && typeof valueB ==='number'){
        return this.sortDirection ==='asc'? valueA - valueB : valueB - valueA;
      }

      const comparison = String(valueA).toLowerCase().localeCompare(String(valueB).toLowerCase());

      return this.sortDirection ==='asc'? comparison : -comparison;
    });
  }
}

