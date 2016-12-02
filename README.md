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


## `Error: Can't resolve all parameters for AnyComponent: (FormBuilder, ?).`

とあるComponentにて、`constructor`にてDIしているサービス（？）の型を宣言していなかった（°ω°
```javascript
  constructor(private formBuilder:FormBuilder, private elementRef) { // <- 忘れている
  }
```


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

* [Enter keyを無効にしたい](#enter-keyを無効にしたい)
* [from ~ toのようなフォームの場合、矛盾が起きないようにカスタムバリデーションを用意したい](#他の入力情報と比較してvalidateしたい)
  * 09:00 ~ 10:00はおｋ
  * 10:00 = 09:00はダメみたいな
* [datepickerと組み合わせたinput formがほしい](#datepickerと組み合わせたinput-formがほしい)
  * http://dbushell.github.io/Pikaday/
  * pikadayってやつがいまのところよさそう
* 動的にフォームを追加する
* [動的に追加したフォームにpikadayを紐付ける](#動的に追加したフォームにpikadayを紐付ける)

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
## datepickerと組み合わせたinput formがほしい
### Pikadayを使う

3rd party libraryの使い方になるとか。あと`moment.js`も依存しているらしいので、これもいれないといけない。

```sh
$ npm install pikaday moment --save-dev
```

- angular-cli.json
```
"app": [{ 
      "scripts": [
        "../node_modules/pikaday/pikaday.js"
      ]
}]
```

これでおｋ


あとは使いたいところで

```
// 宣言？
declare var Pikaday: any;

var picker = new Pikaday({
  // ElementRefからbindするhtmlタグをセット
  field: this.elementRef.nativeElement.querySelector('#test_datetime_picker'),
  // momentを使ったフォーマット変更
  format: 'YYYY/MM/DD',
  // 日本語化
  i18n: {
    previousMonth : '先月',
    nextMonth     : '来月',
    months        : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    weekdays      : ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
    weekdaysShort : ['日','月','火','水','木','金','土']
  },
  onSelect: (date) => {
    // コールバックで値をセット。じゃないと変更が検知できないし、値がセットされない。
    this.myForm.controls['test_datetime_picker'].setValue(picker.toString());
  }
});
```

って、やれば使えるようになりました。日本語化も対応。

## 動的にフォームを追加する

参考URL。すばらしい（まだ試していないけど）
(How to Build Nested Model-driven Forms in Angular 2)[https://scotch.io/tutorials/how-to-build-nested-model-driven-forms-in-angular-2]


動的に追加したときの`FormControl`属性。ながい
```html
<div class="form-group">
  <label>dynamic form test start</label>
  <input type="text"
    id="test_datetime_group_start_{{i}}"
    [formControl]="myForm.controls['test_datetime_group'].controls[i].controls['start']">
</div>
```

## 動的に追加したフォームにpikadayを紐付ける

Directiveを使えばいけました。


```javascript
import { Directive, ElementRef, Input }  from '@angular/core';

declare const Pikaday: any;

@Directive({
  selector: '[datePicker]'
})

export class DatePickerDirective {
  @Input('datePicker') datePickerField: any;

  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    var picker = new Pikaday({
      field: this.elementRef.nativeElement,
      format: 'YYYY/MM/DD',
      i18n: {
        previousMonth : '先月',
        nextMonth     : '来月',
        months        : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        weekdays      : ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
        weekdaysShort : ['日','月','火','水','木','金','土']
      },
      onSelect: (date) => {
        this.datePickerField.setValue(picker.toString());
      }
    });
  }
}
```

directiveを使うviewがformControlで実装した場合は、pikadayはコールバックで選択したあとにformControlへ値を渡さないと認識されない。
色々方法はあると思うが、今回はdirectiveに`@Input('datePicker') datePickerField: any;`を用意して、viewから値を受けれるように実装しました。

```html
<div class="form-group">
  <label>dynamic form test date</label>
  <input type="text"
    [datePicker]="myForm.controls['test_datetime_group'].controls[i].controls['date']"
    [formControl]="myForm.controls['test_datetime_group'].controls[i].controls['date']">
</div>
```

