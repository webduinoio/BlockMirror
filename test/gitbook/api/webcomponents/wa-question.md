###### tags: `egame`,`lit`

顯示程式題目
=====

## 1.調用後端API，取得程式題目並顯示出來

## 2.畫面長相
<img src="https://md.webduino.io/uploads/upload_91b68506eb8ebe3072a0b94b1c467788.png" alt="" width="40%"> <img src="https://md.webduino.io/uploads/upload_d1b1db0d277fab05a32ba0082b8002fc.png" alt="" width="55%">

題目來源 [題庫試算表](https://docs.google.com/spreadsheets/d/13ITebhnLsVrfw90cqwyFro0TYBd_fV0nr-Brv2KAYNo/edit#gid=0)

## 3.使用範例 [連結](https://webduinoio.github.io/BlockMirror/test/coms/wa-question)
```html
<wa-question id="exam" idx="3" bind="Main"></wa-question>
```
## 4.使用說明
- idx是試算表的列數
- 透過js更新題目，例如 exam.updateExam(10)