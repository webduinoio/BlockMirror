class IDraggable {
    static list = [];
    static saveTmpLeftTop(draggable) {
        var left = draggable.eleTitle.style.left;
        var top = draggable.eleTitle.style.top;
        draggable.tmp = {
            left: left == '' ? '0px' : left,
            top: top == '' ? 'opx' : top
        }
    }

    static loadTmpLeftTop(draggable) {
        draggable.eleTitle.style.left = draggable.tmp.left;
        draggable.eleTitle.style.top = draggable.tmp.top;
        delete draggable.tmp;
    }

    static updateLeftTop(draggable, dx, dy) {
        var x = draggable.eleTitle.style.left;
        var y = draggable.eleTitle.style.top;
        x = parseInt(x.replace('px', '')) + dx;
        y = parseInt(y.replace('px', '')) + dy;
        draggable.eleTitle.style.left = x + "px";
        draggable.eleTitle.style.top = y + "px";
    }

    constructor(id) {
        //console.log("create Draggable:", id);
        this.id = id;
        this.eleDrag = document.getElementById(id);
        this.eleTitle = this.createTitleToBody();
        window[id] = this;
        IDraggable.list.push(this);
    }

    createTitleToBody() {
        var eleTitle = document.createElement('div');
        eleTitle.classList.add("title");
        eleTitle.style['width'] = this.eleDrag.offsetWidth + "px";
        eleTitle.style['height'] = this.eleDrag.offsetHeight + "px";
        this.body = document.getElementsByTagName('body')[0];
        this.body.appendChild(eleTitle);
        return eleTitle;
    }

    checkNearestContainer(self) {
        var distance = 100;
        var ctxList = Container.list;
        for (var i in ctxList) {
            var ctx = ctxList[i];
            var x1 = self.eleTitle.offsetLeft;
            var y1 = self.eleTitle.offsetTop;
            var x2 = ctx.eleCtx.offsetLeft;
            var y2 = ctx.eleCtx.offsetTop;
            var calDistance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            if (calDistance <= distance) {
                ctx.eleCtx.style['border'] = '3px solid #f47';
                ctx.swapPos = true;
            } else {
                ctx.eleCtx.style['border'] = '1px solid #000';
                ctx.swapPos = false;
            }
        }
    }

    startDrag() {
        var self = this;
        // mousedown event
        this.startDragEvent = function (evt) {
            evt.preventDefault();
            if (evt.srcElement != self.eleTitle) {
                return;
            }
            self.isDragging = true;
            //紀錄滑鼠按下的座標位置(畫面x,y)
            self.tmpClientX = evt.clientX;
            self.tmpClientY = evt.clientY;
            IDraggable.saveTmpLeftTop(self);
        };

        // mousemove event
        this.dragingEvent = function (evt) {
            evt.preventDefault();
            if (self.isDragging) {
                // Calculate the new position of the box
                var dx = evt.clientX - self.tmpClientX;
                var dy = evt.clientY - self.tmpClientY;
                // Update the position of the box
                IDraggable.updateLeftTop(self, dx, dy);
                self.tmpClientX = evt.clientX;
                self.tmpClientY = evt.clientY;
                self.checkNearestContainer(self);
            }
        }

        // mouseup event
        this.stopDragEvent = function (evt) {
            evt.preventDefault();
            if (self.isDragging) {
                var ctx = self.hasNestestContainer();
                if (ctx != null) {
                    self.swapDraggable(self, ctx);
                }
                IDraggable.loadTmpLeftTop(self);
                delete self.tmpClientX;
                delete self.tmpClientY;
            }
            self.isDragging = false;
        };
        this.eleTitle.addEventListener("mousedown", this.startDragEvent);
        this.body.addEventListener("mousemove", this.dragingEvent);
        this.body.addEventListener("mouseup", this.stopDragEvent);
    }

    update() {

    }

    start() {
        this.eleTitle.style['display'] = 'block';
        this.eleTitle.style['left'] = this.eleDrag.getBoundingClientRect()['x'] + 'px';
        this.eleTitle.style['top'] = this.eleDrag.getBoundingClientRect()['y'] + 'px';
        this.startDrag();
    }

    stop() {
        console.log("stop...", this.id);
        this.eleTitle.style['display'] = 'none';
    }

    static on() {
        for (var i in Draggable.list) {
            Draggable.list[i].start();
        }
    }

    static off() {
        for (var i in Draggable.list) {
            Draggable.list[i].stop();
        }
    }
}