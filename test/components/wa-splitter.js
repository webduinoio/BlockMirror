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
        const codeFrame = document.querySelector("#code-frame");
        const outputFrame = document.querySelector("#output-frame");
        splitter.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.clientX;
            startWidth = codeFrame.offsetWidth;
        });
        splitter.addEventListener("touchstart", (e) => {
            isDragging = true;
            startX = e.clientX;
            startWidth = codeFrame.offsetWidth;
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const diffX = e.clientX - startX;
            codeFrame.style.width = startWidth + diffX + "px";
            outputFrame.style.width = `calc(100% - ${codeFrame.offsetWidth + 3}px)`;
            editor.blockEditor.resized();
        });

        document.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            const diffX = e.clientX - startX;
            codeFrame.style.width = startWidth + diffX + "px";
            outputFrame.style.width = `calc(100% - ${codeFrame.offsetWidth + 3}px)`;
            editor.blockEditor.resized();
        });

        document.addEventListener("mouseup", (e) => {
            isDragging = false;
        });
        document.addEventListener("touchend", (e) => {
            isDragging = false;
        });
    }

    render() {
        return html`<div class="splitter"></div>`;
    }
}
customElements.define('wa-splitter', Splitter);
