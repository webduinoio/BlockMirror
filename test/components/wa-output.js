import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
export class Output extends LitElement {
    constructor() {
        super();
    }

    static styles = [css`
    #output-title {
        width: 100%;
        font-size: 20px;
        height: 32px;
        line-height: 32px;
        color: #Fefefe;
        padding-left: 10px;
        background-color: #707070;
    }
    #output-console {
        height: calc(100% - 32px);
        width: 100%;
        color: #Fefefe;
        background-color: #303030;
        padding-left: 10px;
    }
  `];

    firstUpdated() {
        //const splitter = this.renderRoot.querySelector(".splitter");
    }

    render() {
        return html`
    <div id='output-title'>Python 終端輸出</div>
    <div id="output-console"><slot></slot></div>
`;
    }
}
// 
customElements.define('wa-output', Output);
