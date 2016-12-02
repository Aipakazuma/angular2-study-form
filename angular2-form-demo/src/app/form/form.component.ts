import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { formatDate, TimeMath } from '../util/functions';

declare var Pikaday: any;

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
  datetime: string[];
  private elementRef: ElementRef;

  constructor(private formBuilder: FormBuilder, elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.myForm = this.formBuilder.group({
      'sku': [, Validators.compose([
        Validators.required,
        skuValidator
      ])],
      'test_field_1': [, Validators.compose([
        Validators.required
      ])],
      'test_datetime_validate_start': ['09:00', Validators.compose([
        Validators.required
      ])],
      'test_datetime_validate_end': ['12:30', Validators.compose([
        Validators.required
      ])],
      'test_datetime_picker': [, Validators.compose([
        Validators.required
      ])],
      'test_datetime_group': this.formBuilder.array([
        this.initTestDatetimeGroup()
      ]),
      'addresses': this.formBuilder.array([
        this.initAddress()
      ])
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

    this.myForm.controls['test_datetime_validate_start'].valueChanges.subscribe(
      (value: string) => {
        if (! TimeMath.sub(this.myForm.controls['test_datetime_validate_end'].value, value)) {
          this.myForm.controls['test_datetime_validate_start'].setValue(this.myForm.controls['test_datetime_validate_end'].value);
        }
      }
    );

    this.myForm.controls['test_datetime_validate_end'].valueChanges.subscribe(
      (value: string) => {
        if (! TimeMath.sub(value, this.myForm.controls['test_datetime_validate_start'].value)) {
          this.myForm.controls['test_datetime_validate_end'].setValue(this.myForm.controls['test_datetime_validate_start'].value);
        }
      }
    );

    this.myForm.controls['test_datetime_picker'].valueChanges.subscribe(
      (value: string) => {
        console.log(value);
      }
    );
    // safe
    // console.log(this.myForm.controls['test_datetime_group']);
    // out! Property 'controls' does not exist on type 'AbstractControl'.
    // console.log(this.myForm.controls['test_datetime_group'].controls[0]);
    // safe !?
    // console.log(this.myForm.controls['test_datetime_group']['controls']);
    // safe !!
    // console.log(this.myForm.controls['test_datetime_group']['controls'][0]['controls']['start']);
    // this.myForm.controls['test_datetime_group']['controls'][0]['controls']['start'].valueChanges.subscribe(
    //   (value: string) => {
    //     console.log(value);
    //   }
    // );
  }

  ngOnInit() {
    console.log(this.myForm.controls['test_datetime_group'].value);
    this.setDatetime();
    var picker = new Pikaday({
      field: this.elementRef.nativeElement.querySelector('#test_datetime_picker'),
      format: 'YYYY/MM/DD',
      i18n: {
        previousMonth : '先月',
        nextMonth     : '来月',
        months        : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        weekdays      : ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
        weekdaysShort : ['日','月','火','水','木','金','土']
      },
      onSelect: (date) => {
        this.myForm.controls['test_datetime_picker'].setValue(picker.toString());
      }
    });
  }

  initTestDatetimeGroup() {
    return this.formBuilder.group({
      'date': [],
      'start': [],
      'end': []
    })
  }

  addDatetimeGroup() {
    const control = <FormArray>this.myForm.controls['test_datetime_group'];
    let group = this.initTestDatetimeGroup();
    console.log(group.controls['start']);
    control.push(group);
  }

  removeDatetimeGroup(i: number) {
    const control = <FormArray>this.myForm.controls['test_datetime_group'];
    control.removeAt(i);
  }

  initAddress() {
    return this.formBuilder.group({
      'street': ['', Validators.required],
      'postcode': ['']
    });
  }

  addAddress() {
    const control = <FormArray>this.myForm.controls['addresses'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    const control = <FormArray>this.myForm.controls['addresses'];
    control.removeAt(i);
  }

  setDatetime(): void {
    this.datetime = [
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30'
    ];
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
