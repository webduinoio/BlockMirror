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
    svg {
        fill: #eee;
        width: 24px;
        height: 24px;
    }
    #clear {
        transition: transform 0.3s ease-out; /* 添加過渡效果，0.3s 為過渡時間，ease-out 為過渡效果 */
    }      
    #clear:hover {
        transform: rotate(45deg);
    }    
  `];

    scrollBottom() {
        //this.output.scrollTop = this.output.scrollHeight;
        const distance = this.output.scrollHeight - this.output.scrollTop;
        const speed = distance / 300; // 每毫秒滾動的距離
        const interval = 10; // 每 10 毫秒滾動一次
        let currentPosition = this.output.scrollTop;
        var self = this;
        const scroll = setInterval(function () {
            currentPosition += speed * interval;
            self.output.scrollTop = currentPosition;
            if (currentPosition >= self.output.scrollHeight) {
                clearInterval(scroll);
            }
        }, interval);

    }

    cls() {
        this.output.innerHTML = '';
    }

    show(msg) {
        this.output.innerHTML = this.output.innerHTML + msg + "<br>";
    }

    showErr(msg) {
        this.output.innerHTML = this.output.innerHTML +
            "<span style='color:red'>" + msg + "</span><br>";
    }

    firstUpdated() {
        //*
        this.output = this.renderRoot.getElementById("output-console");
        this.clear = this.renderRoot.getElementById("clear");
        var self = this;
        this.clear.addEventListener('click', function () {
            self.output.innerHTML = '';
        })
        //*/
    }

    render() {
        return html`
    <div id='output-title'>Python 終端輸出
        <svg id='clear' viewBox="0 0 24 24" width="24" height="24" style='float:right;padding:4px'>
            <path d="M19.28 4.68a10 10 0 0 0-14.2 1.42l1.41 1.41a8 8 0 0 1 11.32-1.13L16 7h6V1l-1.42 1.42z"/>
            <path d="M4.7 19.28a10 10 0 0 0 14.2-1.42l-1.41-1.41a8 8 0 0 1-11.31 1.13L8 17H2v6l1.42-1.42z"/>
        </svg>    
    </div>
    <div id="output-console"><slot></slot></div>
`;
    }
}
// 
customElements.define('wa-output', Output);
