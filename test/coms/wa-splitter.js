import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

/**
 * filename：wa-splitter.js
 * descript：垂直分割卷軸，可以讓這卷軸左右的div區塊，可以改變顯示區塊大小
 * Author: Marty
 * Date: 2022/02
 */
export class Splitter extends LitElement {

    constructor() {
        super();
    }

    static styles = [css`
    .splitter {
        float: left;
        width: 3px;
        background-color: #9f9f9f;
        cursor: col-resize;
        height: calc(100vh - 40px)
    }`]

    firstUpdated() {
        let isDragging = false;
        let startX, startWidth;

        const splitter = this.renderRoot.querySelector(".splitter");
        let ele = this.parentElement;
        let leftFrame = ele.children[0];
        let rightFrame = ele.children[2];
        leftFrame.style.width = startWidth + "px";
        rightFrame.style.width = `calc(100% - ${leftFrame.offsetWidth + 3}px)`;
        editor.blockEditor.resized();

        splitter.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.clientX;
            startWidth = leftFrame.offsetWidth;
        });
        splitter.addEventListener("touchstart", (e) => {
            isDragging = true;
            startX = e.clientX;
            startWidth = leftFrame.offsetWidth;
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const diffX = e.clientX - startX;
            leftFrame.style.width = startWidth + diffX + "px";
            rightFrame.style.width = `calc(100% - ${leftFrame.offsetWidth + 3}px)`;
            editor.blockEditor.resized();
        });

        document.addEventListener("mouseup", (e) => {
            isDragging = false;
        });
    }

    render() {
        return html`<div class="splitter"></div>`;
    }
}
customElements.define('wa-splitter', Splitter);