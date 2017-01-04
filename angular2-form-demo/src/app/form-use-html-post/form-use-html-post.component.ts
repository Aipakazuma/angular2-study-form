import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-form-use-html-post',
  templateUrl: './form-use-html-post.component.html',
  styleUrls: ['./form-use-html-post.component.css']
})
export class FormUseHtmlPostComponent implements OnInit {
  private myForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: Http) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      'submit': ['テスト', Validators.required]
    });
  }

  onSubmit(formGroup: FormGroup) {
    console.log(formGroup);
  }
}
