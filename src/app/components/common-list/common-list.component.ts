import { Component,EventEmitter,Input, Output } from '@angular/core';

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

  @Input() totalPage: number =0;

  @Output() pageChange = new EventEmitter<number>();


headerColor: string = '#f5f6f8';
rowColor1: string = '#ffffff';
rowColor2: string = '#f3f4f6';

  

  searchText: string='';
  selectedCategory: string='';

  //sort
  sortField: string ='';
  sortDirection: string='';

  ///category search
  categorySearchText: string='';
  showCategoryDropDown: boolean= false;

  openCategoryDropdown():void{
    this.showCategoryDropDown = true;
  }
    get filtercategories(): any[]{
    const search = this.categorySearchText.toLowerCase().trim();
    if(!search){
      return this.categories;
    }
    return this.categories.filter(category=> category.name.toLowerCase().includes(search));
  }

  selectCategory(category: any):void{
    this.selectedCategory = category.name;
    this.categorySearchText= category.name;
    this.showCategoryDropDown= false;

  }

  //pagination

  currentPage: number= 1;
  pageSize: number= 10;

  get totalPages():number{
    return Math.ceil(this.filterData.length/ this.pageSize);
  }

  get pages(): number[] {
  return Array.from({ length: this.totalPages },(_, i) => i + 1);
}

  get paginatedData(): any[]{
    const startIndex =(this.currentPage -1)* this.pageSize;
    const endIndex = startIndex+ this.pageSize;
    return this.filterData.slice(startIndex,endIndex);
  }
  
  goToPage(page:number):void{
    if(page<1 || page>this.totalPages){
      return;
    }
    this.currentPage = page;
    this.pageChange.emit(page);
  }


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

  sortTable(field: string):void{
    if(this.sortField !==field){

      this.sortField=field;
      this.sortDirection='asc';
    }
    else if(this.sortDirection ==='asc'){

      this.sortDirection='desc';
    }
    else{
      this.sortField='';
      this.sortDirection='';
      return;
    }
    this.sortData();
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



  getTextColor(backgroundcolor:string):string{
    const hex = backgroundcolor.replace('#','');

    const r = parseInt(hex.substring(0,2),16);
    const g = parseInt(hex.substring(2,4),16);
    const b = parseInt(hex.substring(4,6),16);

    const brightness = (r*299 + g*587 + b*114)/1000;

    return brightness<128 ?'#ffffff' : '#000000'
  }



  
}

