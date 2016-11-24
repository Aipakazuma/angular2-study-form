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
      ])]
    });
  }

  ngOnInit() {
  }

  onSubmit(value: string): void {
    console.log('you submitted value:', value);
  }

}