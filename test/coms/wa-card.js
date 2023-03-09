import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

/**
 * filename：wa-card.js
 * descript：
 * associate: fetch ./exam/q001.json
 * Author: Marty
 * Date: 2022/02
 */
export class waCard extends LitElement {

    static properties = {
        height: {},
        width: {}
    };

    static styles = [css`
    .title {
        background-color: lightskyblue;
    }
    .card {
        padding: 10px;
        margin: 10px;
        background-color: #eee;
        position: fixed;
        display:block;
    } 
  `];

    drag(event, self) {
        if (!self.dragStart) {
            self.dragOffsetX = event.offsetX;
            self.dragOffsetY = event.offsetY;
            self.dragStart = true;
        }
        event.target.style.display = 'none';
        // 取得拖拉元素的位置
        var ele = event.srcElement;
        const dragX = event.clientX;
        const dragY = event.clientY;
        console.log(self.dragOffsetY);
        // 更新要移動的元素的位置
        self.style.left = (event.clientX - self.dragOffsetX+3) + "px";
        self.style.top = (event.clientY - self.dragOffsetY+2) + "px";
    }

    firstUpdated() {
        // this.output = this.renderRoot.getElementById("output-console");
        // const card = this.renderRoot.querySelector("card");
        var self = this;
        this.style['position'] = 'fixed';
        this.style['display'] = 'block';
        this.eleTitle = this.renderRoot.querySelector(".title");
        this.eleCard = this.renderRoot.querySelector(".card");
        self.dragStart = false;
        this.eleTitle.addEventListener("drag", function (evt) {
            self.drag(evt, self);
        });
    }

    render() {
        return html`
        <div class='title' draggable="true">
            <span>Title</span>
        </div>
         <div class='card'>
		    <slot></slot>
	     </div>
        `
    }
}
// 
customElements.define('wa-card', waCard);
