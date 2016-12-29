import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { DatePickerDirective } from './directives/date.picker.directive';
import { FormUseHtmlPostComponent } from './form-use-html-post/form-use-html-post.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DatePickerDirective,
    FormUseHtmlPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
