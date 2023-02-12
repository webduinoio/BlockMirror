import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
export class MenuBar extends LitElement {

    constructor() {
        super();
    }

    static styles = [css`
    #menubar {
        top: 5px;
        height: 40px;
        color: #fff;
        text-decoration: none;
        background: #058;
        z-index: 100;
    }
  `];

    firstUpdated() {

    }

    render() {
        return html`
    <div id='menubar' class="btn-group" data-toggle="buttons" data-bind="visible: !assignment.upload()">
        <div style="padding-top: 10px;">
            <label onclick="editor.setMode('block');">
                <input type="radio" name="blockpy-mode-set" autocomplete="off"> Blocks
            </label>
            <label onclick="editor.setMode('split');">
                <input type="radio" name="blockpy-mode-set" autocomplete="off" checked> Split
            </label>
            <label onclick="editor.setMode('text');">
                <input type="radio" name="blockpy-mode-set" autocomplete="off"> Text
            </label>
            <slot></slot>
        </div>
    </div>
    `;
    }
}
customElements.define('wa-menubar', MenuBar);
