import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup,Validators } from "@angular/forms";

@Injectable({
    providedIn:'root'
})

export class AppformService {

    constructor(private fb: FormBuilder) {}

    buildForm(config: any): FormGroup {

    const group: any = {};

    config.sections.forEach((section: any) => {

      section.fields.forEach((field: any) => {

        const validatorArray = [];

        const validation = field.validation;

        if (validation) {

          if (validation.required) {
            validatorArray.push(Validators.required);
          }

          if (validation.minLength) {
            validatorArray.push(Validators.minLength(validation.minLength));
          }

          if (validation.maxLength) {
            validatorArray.push(Validators.maxLength(validation.maxLength));
          }

          if (validation.min != null) {validatorArray.push(Validators.min(validation.min));
          }

          if (validation.max != null) {validatorArray.push(Validators.max(validation.max));
          }

          if (field.type === 'email') {validatorArray.push(Validators.email);
          }

        }
        group[field.name] = ['',validatorArray];
      });

    });
    return this.fb.group(group);

  }



    // constructor(private fb: FormBuilder){}

    // buildForm(config: any): FormGroup {
    //     const group: any ={};
    //     config.sections.forEach((section: any)=>{
    //         section.fields.forEach((field: any)=>{
    //             const validatorArray=[];

    //             if(field.required){
    //                 validatorArray.push(Validators.required);
    //             }

    //             if(field.minLength){
    //                 validatorArray.push(Validators.minLength(field.minLength));
    //             }

    //             if (field.maxLength) {validatorArray.push(Validators.maxLength(field.maxLength));
    //              }

    //             if (field.min) {validatorArray.push(Validators.min(field.min));
    //             }

    //              if (field.max) {validatorArray.push(Validators.max(field.max));
    //             }

    //              if (field.type === 'email') {validatorArray.push(Validators.email);
    //             }

    //             group[field.name]=['',validatorArray];

    //         });
    //     });

    //     return this.fb.group(group);
    // }



}





