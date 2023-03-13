###### tags: `egame`,`lit`

顯示Markdown文件
=====

## 1.功能
讀取 md 文件，轉成 html 方式顯示出來

## 2.畫面長相
<img src="https://md.webduino.io/uploads/upload_34f9dc1393cfc079f31d7a5695d6b157.png" alt="" width="45%"> 


## 3.使用範例 [連結](https://webduinoio.github.io/BlockMirror/test/coms/wa-markdown#)
```html
<wa-markdown path="../md/" default="index.md"></wa-markdown>
```
## 4.使用說明
- path: 指定檔案路徑，可以是 URL
- default: 預設建立元件後，就會載入該檔案
- markdown元件有監聽 hashchange 事件，當 hashchange事件改變時可以進行處理
