import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StuformService } from '../../services/stuform.service';

@Component({
  selector: 'app-dy-form',
  standalone: false,
  templateUrl: './dy-form.component.html',
  styleUrl: './dy-form.component.css'
})
export class DyFormComponent {

  // form! : FormGroup;
  // formConfig: any;

  // constructor(private formService: StuformService ){}

  //   ngOnInit(): void {
  //     this.loadForm();
  //   }

  //   loadForm():void {
  //      this.formService.getForm().subscribe((response) => {

  //     this.formConfig = response;

  //     this.createForm();

  //   });

  //   }

  //   createForm(): void{
  //     const group: any={};
  //     this.formConfig.sections.forEach((section:any) => {
  //       section.fields.forEach((field:any)=>{
  //         const validators =[];

  //         if(field.required){
  //           validators.push(Validators.required);
  //         }

  //         group[field.name] = new FormControl('',validators);

  //       });
  //     });
  //     this.form = new FormGroup(group);
  //   }


}
