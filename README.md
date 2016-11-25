# 学びの箇条書き

* formGroupとformControlは暗黙的に`<form>`タグに属性を用意する。（これは`FormsModule`をimportするだけでおｋ）
  * formには`#f='ngForm'`
  * input formには、`ngModel`
* ↑を拡張したいんだったら、FormBuilderを使いなさい（これは`ReactiveFormsModule`もimportしなければならない）
  * メンバー変数にFormGroupの変数を用意して、フォームの値それぞれにデフォルト値やバリデーション、カスタムバリデーションなどが用意できる
  * formの属性は`[formGroup]`に変更になる。また渡す値はメンバー変数で定義した名前にすること
    * formには`[formGroup]='myForm'`
    * input formには、`[formControl]=''`
* バリデーションを組むときには２つ手法がある
  * 1. メンバー変数を増やして設定する
    * メンバー変数の方は`AbstractControl`
    * viewでは`[formControl]="sku"`のように属性と値を設定する
    * すると、validateには`sku.valid`のように直接扱える
  * 2. メンバー変数を増やさずに、`myForm.controls['sku']`のように、form変数からたどる
    * たどればおｋだが、冗長な感が拭えない
* カスタムバリデーションは関数を使って、`Validators.compose()`を使って、関数を合成して渡す
* `myForm.controls['sku']`には、watchしている関数があるので、それに処理をフック（？）することができる。
  * `myForm.controls['sku'].valueChanges.subscribe()`で、処理を与えればよい
  * formにもある`myForm.valueChanges.subscribe`


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

# 試したこと

## 試したいこと

todo

* Enter keyを無効にしたい
* from ~ toのようなフォームの場合、矛盾が起きないようにカスタムバリデーションを用意したい
  * 09:00 ~ 10:00はおｋ
  * 10:00 = 09:00はダメみたいな
* datepickerと組み合わせたinput formがほしい
  * http://dbushell.github.io/Pikaday/
  * pikadayってやつがいまのところよさそう

## Enter keyを無効にしたい

```html
<form [formGroup]="myForm"
      (ngSubmit)="onSubmit(myForm.value)"
      (keydown.enter)="keyDown($event)" <!-- 追加 -->
      class="ui form"></form>
```

コンポーネントに下記関数を追加

```javascript
keyDown(event: any): void {
  console.log('You just clicked entry.');
  return event.preventDefault();
}
```

## 他の入力情報と比較してvalidateしたい

`controls.valueChanges`を使って、他の項目と比較することができました。

```javascript
// 日付入力項目が２つあって
// start ~ end の項目を用意
// endはstartを下回ってはいけないので、endの変更を検知して、startと比較する
this.myForm.controls['test_datetime_validate_end'].valueChanges.subscribe(
  (value: string) => {
    if (! TimeMath.sub(value, this.myForm.controls['test_datetime_validate_start'].value)) {
      this.myForm.controls['test_datetime_validate_end'].setValue(this.myForm.controls['test_datetime_validate_start'].value);
    }
  }
);
```
