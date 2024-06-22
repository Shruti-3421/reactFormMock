import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './validators/validatorPattern';
import { NoSpaceValidator } from './validators/noSpaceValidator';
import { Icount } from './models/country.interface';
import { COUNTRIES_META_DATA } from './const/countryData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'reactFormMock';
  signUpForm !: FormGroup;
  // gendersArr: Array<string>=['male', 'female', 'others'];
  countriesArr: Array<Icount>=COUNTRIES_META_DATA;
  constructor(){}
  ngOnInit(): void {
    this.createSignUpForm();
    this.isAddSameHandler();
    this.patchPerAddHandler();
    this.isPasswordHandlr();
  }
  createSignUpForm(){
   this.signUpForm= new FormGroup({
     userName: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.username),
      Validators.minLength(6), Validators.maxLength(14), NoSpaceValidator.noSpace
    ]),
    email: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)]),
    gender: new FormControl(null, [Validators.required]),
    isAddSame: new FormControl({value:false, disabled:true}, [Validators.required]),
    currentAddress: new FormGroup({
      country: new FormControl("India", [Validators.required]),
      state:new FormControl(null, [Validators.required]),
      city:new FormControl(null, [Validators.required]),
      pincode:new FormControl(null, [Validators.required]),
    }),
    permanantAddress: new FormGroup({
      country:new FormControl("India", [Validators.required]),
      state:new FormControl(null, [Validators.required]),
      city:new FormControl(null, [Validators.required]),
      pincode:new FormControl(null, [Validators.required]),
    }),
    skills: new FormArray([new FormControl(null)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
    confirmPassword: new FormControl(null)

    })
  }
  isAddSameHandler(){
    this.f['currentAddress'].valueChanges
      .subscribe(res => {
        // console.log(res)
        if(this.f['currentAddress'].valid){
          this.f['isAddSame'].enable()
        }else{
          this.f['isAddSame'].disable()

        }
     })
  }
  patchPerAddHandler(){
    this.f['isAddSame'].valueChanges
      .subscribe(res => {
        if(res){
          let currentObj= this.f['currentAddress'].value;
          console.log(currentObj);
          this.f['permanantAddress'].patchValue(currentObj);
          this.f['permanantAddress'].disable();
        }else{
          this.f['permanantAddress'].enable();
          this.f['permanantAddress'].reset();
          
        }
      })  
  }
  isPasswordHandlr(){
    this.f['password'].valueChanges
      .subscribe(res => {
        console.log(res);
        if(this.f['password'].valid){
          this.f['confirmPassword'].enable()
        }else{
          this.f['confirmPassword'].disable()

        }
      })
  }
  onSignUp(){
    // if(this.signUpForm.valid){
     console.log(this.signUpForm.value)
    }
  // }
  get f(){
    return this.signUpForm.controls;
  }
  get skillsArray(){
    return this.signUpForm.get('skills') as FormArray
  }
  onAddskill(){
   if(this.skillsArray.length < 5){
    let skillcontrol=new FormControl(null);
    this.skillsArray.push(skillcontrol);
   }
  }
  onRemoveSkill(i:number){
     console.log(i);
      this.skillsArray.removeAt(i)
  }
}
