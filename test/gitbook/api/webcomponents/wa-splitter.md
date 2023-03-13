###### tags: `egame`,`lit`

拖拉左右面板
=====

## 1.功能
在兩個 div (左右) 中間插入一個拉吧，可以調整兩個 div 寬度

## 2.畫面長相
<img src="https://md.webduino.io/uploads/upload_d69040417869b9c4f3d05b2cb9e262ab.png" alt="" width="45%"> <img src="https://md.webduino.io/uploads/upload_aa114a8a4121d56bf0289352816412b9.png" alt="" width="45%">

## 3.使用範例 [連結](https://webduinoio.github.io/BlockMirror/test/coms/wa-splitter.html)

```html
左右面板捲軸拖拉測試
<div id="content">
    <div id="b1"></div>
    <wa-splitter></wa-splitter>
    <div id="b2"></div>
</div>
```
## 4.使用說明
要注意 css 調整，此範例調整如下
```css=
#content {
    height: 420px;
    width: 420px;
}

#b1 {
    float: left;
    width: 50%;
    height: 100%;
    background-color: aqua;
}

#b2 {
    float: left;
    width: calc(50% - 3px);
    height: 100%;
    background-color: antiquewhite;
}
```