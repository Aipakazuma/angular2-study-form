import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

function skuValidator(control: FormControl): { [s: string]: boolean } {
  if (control.value) {
    if (! control.value.match(/^123/)) {
      return {invalidSku: true};
    }
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  myForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      'sku': [, Validators.compose([
        Validators.required,
        skuValidator
      ])],
      'test_field_1': [, Validators.compose([
        Validators.required
      ])]
    });

    this.myForm.controls['sku'].valueChanges.subscribe(
      (value: string) => {
        console.log('sku changed to:', value);
      }
    );

    this.myForm.valueChanges.subscribe(
      (form: any) => {
        console.log('form changed to:', form);
      }
    );
  }

  ngOnInit() {
  }

  onSubmit(value: string): void {
    event.preventDefault();
    console.log('you submitted value:', value);
  }

  keyDown(event: any): void {
    console.log('You just clicked entry.');
    return event.preventDefault();
  }
}