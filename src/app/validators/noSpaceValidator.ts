import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NoSpaceValidator{
    static noSpace(controls:AbstractControl): ValidationErrors | null{
      
    //    console.log(controls)
    let val= controls.value as string
    if(!val){
        return null
    }
    if(val.includes(' ')){
        return{
            noSpaceErr: `space is not allowed`
        }
    }else{
        return null
    }
      
    }
}