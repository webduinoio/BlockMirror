import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

export class SplitV extends LitElement {

    constructor() {
        super();
    }

    static styles = [css`
    .container {
        display: flex;
        flex-direction: column;
        height: 50vh;
      }
      .header  {
        background-color: lightgray;
        width: 100%;
        height: 50%; 
      }
      .splitter {
        background-color: black;
        width: 100%;
        height: 5px;
        cursor: row-resize;
      }
      .body {
        background-color: lightblue;
        width: 100%;
        flex: 1;
        overflow: auto;
      }
    `]

    firstUpdated() {
        const container = this.renderRoot.querySelector(".container");
        const splitter = this.renderRoot.getElementById("splitter");
        const header = this.renderRoot.querySelector(".header");
        const body = this.renderRoot.querySelector(".body");
        container.style.height = this.parentElement.scrollHeight + 'px';
        let isResizing = false;
        let currentY;
        let originalTop;
        let originalHeight;
        let originalBodyHeight;

        const slot = this.renderRoot.querySelector('slot');
        let slots = slot.assignedElements({ flatten: true });
        let parentElement = slots[0].parentElement;
        let slotHead = parentElement.removeChild(slots[0])
        let slotBody = parentElement.removeChild(slots[1])
        header.append(slotHead);
        body.append(slotBody);

        splitter.addEventListener("mousedown", function (e) {
            isResizing = true;
            currentY = e.clientY;
            originalTop = splitter.offsetTop;
            originalHeight = splitter.offsetHeight;
            originalBodyHeight = splitter.previousElementSibling.offsetHeight;
        });

        document.addEventListener("mouseup", function () {
            isResizing = false;
        });

        document.addEventListener("mousemove", function (e) {
            if (!isResizing) return;
            const delta = e.clientY - currentY;
            splitter.style.top = originalTop + delta + "px";
            splitter.previousElementSibling.style.height = originalBodyHeight + delta + "px";
        });
    }

    render() {
        return html`
    <div class="container">
        <slot></slot>
        <div class="header"></div>
        <div class="splitter" id="splitter"></div>
        <div class="body"></div>
    </div>
        `;
    }
}
customElements.define('wa-split-v', SplitV);
