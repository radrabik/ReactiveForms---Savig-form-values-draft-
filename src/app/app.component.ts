import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  bioSection = this.fb.group({
    firstName: [''],
    lastName: [''],
    age: [''],
    stackDetails: this.fb.group({
      stack: [''],
      experience: [''],
    }),
    address: this.fb.group({
      country: [''],
      city: [''],
    }),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    // if cached draft of form exists in local storage => prepopulate all fields
    const draft = localStorage.getItem("form_values");
    if(draft) {
      this.bioSection.setValue(JSON.parse(draft));
    }

    // save form field into local storage if values are valid
    this.bioSection.valueChanges
    .pipe(
      // filter the changes which are not valid using .pipe
      // only when inputs are valid we will save them
      filter(()=> this.bioSection.valid)
    )
    .subscribe( val => {
      localStorage.setItem("form_values", JSON.stringify(val))
    });


  }

  callingFunction() {
    console.log(this.bioSection.value);
  }
}
