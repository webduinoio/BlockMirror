import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

/**
 * filename：wa-exam.js
 * descript：顯示題目
 * associate: fetch ./exam/q001.json
 * Author: Marty
 * Date: 2022/02
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
        height: 100%;
        display: flex;
        font-size:18px;
    }
    .header-title , .header-content ,
    .header-theinput , .header-theoutput ,
    .header-sampleinput , .header-sampleoutput
    {
        background-color:rgb(52 131 200);
        color: #eee;
        font-size:20px;
        line-height: 20px;
        padding:10px;
    }
    .title , .content ,
    .theinput , .theoutput ,
    .sampleinput , .sampleoutput
    {
        background-color:#eee;
        font-size:18px;
        padding:15px;
    }
    `
        ,
    css`
    .container {  
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 0.4fr 0.5fr 0.4fr 2.4fr 0.4fr 1.9fr 0.4fr 2.4fr;
        gap: 1px 1px;
        grid-auto-flow: row;
        grid-template-areas:
          "header-title header-title"
          "title title"
          "header-content header-content"
          "content content"
          "header-theinput header-theoutput"
          "theinput theoutput"
          "header-sampleinput header-sampleoutput"
          "sampleinput sampleoutput";
      }
      
      .header-title { grid-area: header-title; }
      
      .title { grid-area: title; }
      
      .header-content { grid-area: header-content; }
      
      .content { grid-area: content; }
      
      .header-theinput { grid-area: header-theinput; }
      
      .header-theoutput { grid-area: header-theoutput; }
      
      .theinput { grid-area: theinput; }
      
      .theoutput { grid-area: theoutput; }
      
      .header-sampleinput { grid-area: header-sampleinput; }
      
      .header-sampleoutput { grid-area: header-sampleoutput; }
      
      .sampleinput { grid-area: sampleinput; }
      
      .sampleoutput { grid-area: sampleoutput; }
      
  `];

    getInfo() {
        return this.info;
    }

    firstUpdated() {
        var self = this;
        if (this.path == '' || typeof (this.path) == 'undefined')
            this.path = './exam/';
        function prepareExam(data) {
            for (var i in data) {
                let showData = data[i];
                var ele = self.renderRoot.getElementById(i);
                try {
                    ele.innerHTML = showData;
                } catch (e) { }
            }
            self.info = data;
            editor.setCode(data['samplecode']);
        }
        var examFile = location.hash;
        examFile = examFile == '' ? 'q001.json' : examFile.substring(1);
        fetch(this.path + examFile)
            .then(response => response.json())
            .then(data => prepareExam(data))
            .catch(error => console.error(error));
    }

    render() {
        return html`
        <div class='exam'>
        <div class="container">
            <div class="header-title">題目</div>
            <div class="title" id="title"></div>
            <div class="header-content">內容</div>
            <div class="content" id="content"></div>
            <div class="header-theinput">輸入說明</div>
            <div class="header-theoutput">輸出說明</div>
            <div class="theinput" id="theinput"></div>
            <div class="theoutput" id="theoutput"></div>
            <div class="header-sampleinput">範例輸入</div>
            <div class="header-sampleoutput">範例輸出</div>
            <div class="sampleinput" id="sampleinput"></div>
            <div class="sampleoutput" id="sampleoutput"></div>
        </div>
        </div>
`;
    }
}
// 
customElements.define('wa-exam', Exam);
