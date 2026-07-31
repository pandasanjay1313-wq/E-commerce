import { Component } from '@angular/core';
import { AfterContentInit } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone:false
})
export class FooterComponent implements AfterContentInit{

  footerStatus ='';

  ngAfterContentInit(): void {
    this.footerStatus = 'Footer Content Loaded Successfully';
  }
  

}
