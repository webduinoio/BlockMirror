import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
export class Output extends LitElement {
    constructor() {
        super();
    }

    static styles = [css`
    #output-title {
        width: calc(100% - 10px);
        font-size: 20px;
        height: 32px;
        line-height: 32px;
        color: #Fefefe;
        background-color: #707070;
        padding-left: 10px;
    }
    #output-console {
        font-size: 20px;
        height: calc(100% - 52px);
        width: calc(100% - 20px);
        color: #Fefefe;
        background-color: #303030;
        padding: 10px;
        overflow: scroll;
    }
  `];

    scrollBottom() {
        //this.output.scrollTop = this.output.scrollHeight;
        const distance = this.output.scrollHeight - this.output.scrollTop;
        const speed = distance / 300; // 每毫秒滾動的距離
        const interval = 10; // 每 10 毫秒滾動一次
        let currentPosition = this.output.scrollTop;
        var self = this;
        const scroll = setInterval(function() {
          currentPosition += speed * interval;
          self.output.scrollTop = currentPosition;
          if (currentPosition >= self.output.scrollHeight) {
            clearInterval(scroll);
          }
        }, interval);

    }

    firstUpdated() {
        this.output = this.renderRoot.getElementById("output-console");
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
