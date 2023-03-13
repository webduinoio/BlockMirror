###### tags: `egame`

拖拉面板元件
=======
## 1.功能
可指定 div 成為div的容器或可拖拉的div，拖拉完可以儲存最後的位置。

## 2.畫面長相
<img src="https://md.webduino.io/uploads/upload_35208cc23ac48e09259dd12542a5ec20.png" alt="" width="30%">


## 3.使用範例 [連結](https://webduinoio.github.io/BlockMirror/test/coms/wa-crud)

```html
<div class="demo">
    <div id='c1' class="container">
        <div id="drag1" class="draggable">
            <div id="cnt1">
                <span style='font-size:90px'>1</span>
            </div>
        </div>
    </div>
</div>
<div class="demo">
    <div id='c2' class="container">
        <div id="drag2" class="draggable">
            <div id="cnt2">
                <span style='font-size:90px'>2</span>
            </div>
        </div>
    </div>
</div>
<div class="demo">
    <div id='c3' class="container">
        <div id="drag3" class="draggable">
            <div id="cnt3">
                <span style='font-size:90px'>3</span>
            </div>
        </div>
    </div>
</div>
```

初始化拖拉設定，設定有哪容器，容器裡面有沒有可拖拉的 div
```js
Container.init({
'c1': 'drag1', 'c2': 'drag2', 'c3': 'drag3'
});
```
執行 Draggable.on() 就會在容器上面增加一條紅色的 title bar，
就可以進行拖拉。
執行 Draggable.off() 就會關閉拖拉功能。
目前預設拖拉一次就會關閉，程式碼在這邊
```js
// mouseup event
this.stopDragEvent = function (evt) {
    evt.preventDefault();
    if (self.isDragging) {
        var ctx = self.hasNestestContainer();
        if (ctx != null) {
            self.swapDraggable(self, ctx);
            Container.save();
            Draggable.off();
            .
            .
            .
```
<br><br>
拖拉完的結果會保存起來json格式，可以透過 load(json) 就可以顯示拖拉玩的狀態 (也就是可以保存最後拖拉的狀態)
```js
Container.load(jsonString);
```
<img src="https://md.webduino.io/uploads/upload_bd4adac458dcda5dabd54f6231f6e4a3.png" alt="" width="">

## 4.使用說明

### [線上拖拉範例](https://webduinoio.github.io/BlockMirror/test/draggable.html)
### [範例影片](https://www.youtube.com/shorts/pWA7xTIRavk)

