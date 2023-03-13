###### tags: `egame` `lit`

CRUD 試算表
=====

## 1.功能
提供拖拉改變數字 (目前是用來調整 codeMirror 字型大小)

## 2.畫面長相
<img src="https://md.webduino.io/uploads/upload_5adb5c4e01b4ef0b7ee03fce264ffcec.png" alt="" width="">

## 3.使用範例 
```html
<wa-range id="range" value="16px"></wa-range>
```
## 4.使用說明
元件初始化後，會呼叫 window.Main.ready 通知元件初始化完成
註冊元件 onSlider(...) 方法就可以即時收到調整的值

wa-range 元件初始化
<img src="https://md.webduino.io/uploads/upload_7f4cd35e9086895c22c497a596a84ea3.png" alt="" width="70%">


參考Main.js 程式72行
<img src="https://md.webduino.io/uploads/upload_9cb326262957eca78d4da38e2ed1478f.png" alt="" width="">
