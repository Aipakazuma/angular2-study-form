# ハマったこと

## formGroup expects a FormGroup instance 
http://stackoverflow.com/questions/38444778/formgroup-expects-a-formgroup-instance

* `<form>`タグの中以外で宣言すると発生
* `<form [formGroup]="form">`の`[formGroup]`の値は、componentのプロパティの値にすること

２番めのやつにひっかかった。


## Cannot find name 'FormControl'.

`FormControl`をimportしたら治った。

```
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
```