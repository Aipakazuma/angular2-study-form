export function formatDate(date:Date, format?:string):string {
    if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
    format = format.replace(/YYYY/g, date.getFullYear().toString());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2).toString());
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2).toString());
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2).toString());
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2).toString());
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2).toString());
    if (format.match(/S/g)) {
        var milliSeconds = ('00' + date.getMilliseconds()).slice(-3).toString();
        var length = format.match(/S/g).length;
        for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
}

export class TimeMath {

    static sum(a:string, b:string):any {
      var passFunction = (result:number, second:number, i:number):number => {
        if (i === 0) {
          result = second;
        } else {
          result += second;
        }
        return result;
      }
      return this.calc(a, b, passFunction);
    }

    static sub(a:string, b:string):any {
      var passFunction = (result:number, second:number, i:number):number => {
        if (i === 0) {
          result = second;
        } else {
          result -= second;
        }
        return result;
      }
      return this.calc(a, b, passFunction);
    }

    static multipy(a:string, b:string):any {
      var passFunction = (result:number, second:number, i:number):number => {
        if (i === 0) {
          result = second;
        } else {
          result *= second;
        }
        return result;
      }
      return this.calc(a, b, passFunction);
    }

    static division(a:string, b:string):any {
      var passFunction = (result:number, second:number, i:number):number => {
        if (i === 0) {
          result = second;
        } else {
          result /= second;
        }
        return result;
      }
      return this.calc(a, b, passFunction);
    }

    static calc(a: string, b:string, func:any):any {
        var result, second, i;
        var all = [a, b];
        var that = this;
        all.forEach(function(v, i) {
          if (! v.match(/^[0-9]{2}:[0-9]{2}$/)) {
            return;
          }
          var times = v.split(':');
          second = that.toSecond(Number(times[0]), Number(times[1]));

          if ((!second && second !== 0)) {
            return;
          }

          result = func(result, second, i);
        });
        return that.toTimeFormat(result);
    }


    // 時間を秒に変換
    static toSecond(hour:number, minute:number):any {
        if ((!hour && hour !== 0) || (!minute && minute !== 0) ||
            hour === null || minute === null ||
            typeof hour === 'boolean' ||
            typeof minute === 'boolean' ||
            typeof Number(hour) === 'NaN' ||
            typeof Number(minute) === 'NaN') {
          return;
        }
 
        return (hour * 60 * 60) + (minute * 60);
    }
 
    // 秒を時間（hh:mm）のフォーマットに変換
    static toTimeFormat(fullSecond:number):any {
        if ((!fullSecond && fullSecond !== 0) || !String(fullSecond).match(/^[\-0-9][0-9]*?$/)) {
          return;
        }
 
        var paddingZero = (n:number):string => {
            return (n < 10)  ? '0' + String(n) : String(n);
        };
 
        var hour = Math.floor(Math.abs(fullSecond) / 3600);
        var minute = Math.floor(Math.abs(fullSecond) % 3600 / 60);
 
        var minuteString = paddingZero(minute);

        // ありえない数値はbooleanを返す
        if (24 <= hour || fullSecond < 0) {
          return false;
        }
 
        return String(hour) + ':' + minuteString;
    }
}
