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
    .toolMenu {
        float: right;
        box-sizing: border-box;
        font-size: 15px;
        position: relative;
        background: none;
        cursor: pointer;
        color: #fff;
        margin: 0 5px;
        transition: .3s;
        text-decoration: none;
        z-index: 100;
    }
    svg {
        fill: #eee;
        width: 24px;
        height: 24px;
    }  
    .btn {
        transition: all 0.5s ease;
        cursor: pointer;
        color: #eee;
        float:left;
        font-size: 16px;
        display: flex;
        align-items: center; 
        width:70px;
    }
    .btn:hover {
        transform: translateY(-3px);
        color: #fff;
    }
    .btn svg + span {
        margin-left: 1px;
      }    
  `];

    firstUpdated() {

    }

    render() {
        return html`
        <div id='menubar' data-toggle="buttons">
        <div style='float:left;padding:4px;position:absolute'>
            <img width='36' height='36' src='https://webbit.webduino.io/blockly/media/logo3.png'>
        </div>
        <div style="padding-top: 10px;">
            <div class="toolMenu">
                <div class='btn' onclick="editor.setMode('text');">
                    <svg viewBox="0 0 24 24">
                        <path
                            d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                    <span>程式</span>
                </div>
                <div class='btn' onclick="editor.setMode('block');">
                    <svg viewBox="0 0 24 24">
                        <rect x="3" y="3" width="6" height="6" />
                        <rect x="13" y="3" width="6" height="6" />
                        <rect x="3" y="13" width="6" height="6" />
                        <rect x="13" y="13" width="6" height="6" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                    <span>積木</span>
                </div>
                <div class='btn' onclick="editor.setMode('split');">
                    <svg viewBox="0 0 24 24">
                        <path
                            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                    <span>分割</span>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
    `;
    }
}
customElements.define('wa-menubar', MenuBar);
