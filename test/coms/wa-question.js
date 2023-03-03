import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

/**
 * filename：wa-question.js
 * descript：顯示題目
 * associate: fetch ./exam/q001.json
 * Author: Marty
 * Date: 2022/02
 * stringify tool: https://onlinetexttools.com/json-stringify-text
 */
export class Question extends LitElement {

    static properties = {
        idx: {},
        url: {},
        bind: {}
    };

    constructor() {
        super();
    }

    static styles = [css`
    :host {
        font-size:18px;
        height: calc(100% - 10px);
        display: block;
    }
    .container {
        margin:10px;
    }
    `
        ,
    css`
    .header-content{
        margin:10px;
    }
    .header-theinput{
        margin:10px;
    }
    .header-theoutput{
        margin:10px;
    }
    .content{
        margin:20px;
    }
    .theinput{
        margin:20px;
    }
    .theoutput{
        margin:20px;
    }
    .header-sampleinput {
        margin:10px;
    }
    .header-sampleoutput {
        margin:10px;
    }
    .header-sample{
        margin:10px;
    }
    .header-hint {
        margin:10px;
    }
    .header-hash {
        margin:10px;
    }
    .hint {
        margin:20px;
    }
    .hash {
        margin:20px;
    }
    .sample-box {
        margin:15px;
        min-width: 100px;
        border:1px dotted #009FCC;
        background-color:#333;
        color:#eee;
    }
  `];

    getInfo() {
        return this.info;
    }

    updateExam(idx) {
        var self = this;
        self.idx = idx;
        if (this.url == '' || typeof (this.url) == 'undefined')
            this.url = 'https://mopcon.nodered.vip/api/data/qry?row=';

        function ele(id, data) {
            var ele = self.renderRoot.getElementById(id);
            ele.innerHTML = data[id];
        }

        function eleHide(self, className) {
            self.renderRoot.querySelector(className).style['display'] = "none";
        }

        function processSample(self, data) {
            let eleSample = self.renderRoot.querySelector('.sample');
            let sample = JSON.parse(data['sample']);
            var cnt = '';
            for (var i = 0; i < sample.length; i = i + 2) {
                cnt = cnt + "<br><div class='header-sample'>範例輸入 #" + ((i / 2) + 1) + "</div>";
                cnt = cnt + ("<div class='sample-box'>" + sample[i].join('<br>') + "</div>");
                cnt = cnt + "<div class='header-sample'>範例輸出 #" + ((i / 2) + 1) + "</div>";
                cnt = cnt + ("<div class='sample-box'>" + sample[i + 1].join('<br>') + "</div>");
            }
            eleSample.innerHTML = cnt;
        }

        function prepareExam(data) {
            //console.log("data:", data);
            ele('title', data);
            ele('content', data);
            ele('theinput', data);
            ele('theoutput', data);
            if (data['hint'] == '') {
                eleHide(self, '.header-hint');
            } else {
                ele('hint', data);
            }
            if (data['hash'] == '') eleHide(self, '.header-hash');
            ele('hash', data);
            processSample(self, data);

            self.info = data;
            if (typeof (editor) != "undefined" &&
                typeof (data['samplecode']) != "undefined")
                editor.setCode(data['samplecode']);
        }

        fetch(this.url + this.idx)
            .then(response => response.json())
            .then(data => prepareExam(data))
            .catch(error => console.error(error));
    }

    firstUpdated() {
        this.updateExam(this.idx);
        if (typeof (this.bind) != "undefined") {
            eval(this.bind)[this.id] = this;
        }
    }

    render() {
        return html`     
        <div class="container">
            <div class="header-title">題目：<span id="title"></span></div>
            <br></div>
            <pre class="header-content">內容</pre>
            <div class="content" id="content"></div>
            <div class="header-theinput">輸入說明</div>
            <div class="theinput" id="theinput"></div>
            <div class="header-theoutput">輸出說明</div>
            <div class="theoutput" id="theoutput"></div>

            <div class="sample" id="sample"></div>
            <div class="sampleinput" id="sampleinput"></div>
            <div class="sampleoutput" id="sampleoutput"></div>
            <div class="sample"></div>
            <div class="header-hint">提示</div>
            <div class="hint" id="hint"></div>
            <div class="header-hash">標籤</div>
            <div class="hash" id="hash"></div>
        </div>
`;
    }
}
// 
customElements.define('wa-question', Question);
