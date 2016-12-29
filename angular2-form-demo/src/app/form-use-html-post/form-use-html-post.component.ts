import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-use-html-post',
  templateUrl: './form-use-html-post.component.html',
  styleUrls: ['./form-use-html-post.component.css']
})
export class FormUseHtmlPostComponent implements OnInit {

  private myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      'submit': ['テスト', Validators.required]
    });
  }

  onSubmit(myForm: FormGroup) {
    console.log(myForm.value);
  }
}
