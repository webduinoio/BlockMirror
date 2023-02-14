import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

/**
 * filename：wa-exam.js
 * descript：顯示題目
 * associate: fetch ./exam/q001.json
 * Author: Marty
 * Date: 2022/02
 */
export class Exam extends LitElement {
    constructor() {
        super();
    }

    static styles = [css`
 
  `];

    getInfo() {
        return this.info;
    }
    
    firstUpdated() {
        var self = this;
        function prepareExam(data) {
            for (var i in data) {
                let showData = data[i];
                var ele = self.renderRoot.getElementById(i);
                ele.innerHTML = showData;
            }
            self.info = data;
        }
        var examFile = location.hash;
        examFile = examFile == '' ? 'q001.json' : examFile.substring(1);
        fetch('exam/' + examFile)
            .then(response => response.json())
            .then(data => prepareExam(data))
            .catch(error => console.error(error));
    }

    render() {
        return html`
        <div style="margin:20px">
        <h3>題目</h3>
        <div id="title"></div>
        <h4>內容</h4>
        <div id="content"></div>
        <h4>輸入說明</h4>
        <div id="theinput"></div>
        <h4>輸出說明</h4>
        <div id="theoutput"></div>
        <h4>範例輸入</h4>
        <div id="sampleinput"></div>
        <h4>範例輸出</h4>
        <div id="sampleoutput"></div>
`;
    }
}
// 
customElements.define('wa-exam', Exam);
