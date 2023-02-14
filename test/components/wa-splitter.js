import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

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
        float: left;
        height: calc(100vh - 40px)
    }`]

    firstUpdated() {
        let isDragging = false;
        let startX, startWidth;

        const splitter = this.renderRoot.querySelector(".splitter");
        const leftFrame = document.querySelector("#left-frame");
        const rightFrame = document.querySelector("#right-frame");
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
