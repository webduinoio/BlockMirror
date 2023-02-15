import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

/**
 * filename：wa-exam.js
 * descript：顯示題目
 * associate: fetch ./exam/q001.json
 * Author: Marty
 * Date: 2022/02
 * stringify tool: https://onlinetexttools.com/json-stringify-text
 */
export class Exam extends LitElement {

    static properties = {
        path: {},
    };

    constructor() {
        super();
    }

    static styles = [css`
    :host {
        font-size:18px;
        overflow:auto;
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
        border:1px dotted #009FCC;
        background-color:#333;
        color:#eee;
    }
  `];

    getInfo() {
        return this.info;
    }

    updateExam(examFile) {
        var self = this;
        if (this.path == '' || typeof (this.path) == 'undefined')
            this.path = './exam/';

        function ele(id, data) {
            var ele = self.renderRoot.getElementById(id);
            ele.innerHTML = data[id];
        }

        function eleHide(self, className) {
            self.renderRoot.querySelector(className).style['display'] = "none";
        }

        function processSample(self, data) {
            //ele('sample', data);
            let eleSample = self.renderRoot.querySelector('.sample');
            let sample = data['sample'];
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
            ele('title', data);
            ele('content', data);
            ele('theinput', data);
            ele('theoutput', data);
            if (data['hint'] == '') eleHide(self, '.header-hint');
            ele('hint', data);
            if (data['hash'] == '') eleHide(self, '.header-hash');
            ele('hash', data);
            processSample(self, data);

            self.info = data;
            if (typeof (editor) != "undefined" &&
                typeof (data['samplecode']) != "undefined")
                editor.setCode(data['samplecode']);
        }

        if (typeof (examFile) == 'undefined') {
            examFile = location.hash;
            examFile = examFile == '' ? 'q001.json' : examFile.substring(1);
        }

        fetch(this.path + examFile)
            .then(response => response.json())
            .then(data => prepareExam(data))
            .catch(error => console.error(error));
    }

    firstUpdated() {
        this.updateExam();
    }

    render() {
        return html`
        <div>
        <button onclick="exam.updateExam('a001.json')">a001</button>
        <button onclick="exam.updateExam('a002.json')">a002</button>
        <button onclick="exam.updateExam('a003.json')">a003</button>
        <button onclick="exam.updateExam('a004.json')">a004</button>
        <button onclick="exam.updateExam('a005.json')">a005</button>
        <button onclick="exam.updateExam('a009.json')">a009</button>
        <button onclick="exam.updateExam('a040.json')">a040</button>
        </div><br>        
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
            <div class="header-hint">提示</div>
            <div class="sample"></div>
            <div class="hint" id="hint"></div>
            <div class="header-hash">標籤</div>
            <div class="hash" id="hash"></div>
        </div>
`;
    }
}
// 
customElements.define('wa-exam', Exam);
