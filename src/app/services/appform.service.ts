import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";

@Injectable({
    providedIn:'root'
})

export class AppformService {

    constructor(private fb: FormBuilder) {}

    buildForm(config: any): FormGroup {
      //  console.log("Form Config:", config);
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
          if (validation.pattern) {validatorArray.push(Validators.pattern(validation.pattern));
          }
          if(validation.dateNotPast){
            validatorArray.push((control: AbstractControl)=>{
              if(!control.value){
                return null;
              }
              const today = new Date();
              const selectedDate = new Date(control.value);
              today.setHours(0, 0, 0, 0);
              selectedDate.setHours(0, 0, 0, 0);

              if (selectedDate < today) {
                return { dateNotPast: true };
              }
               return null;
            });
          }

        }
        group[field.name] = ['',validatorArray];
      });

    });
    // alert('Before Return');
    return this.fb.group(group);

  }


}





