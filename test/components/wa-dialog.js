import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

export class dialog extends LitElement {
  static properties = {
    name: {},
  };

  constructor() {
    super();
    this.init();
  }

  init() {
    /*
    if (location.hash == '') throw "no session id";
    let sessionId = location.hash.substring(1);
    */
    let sessionId = 'test';
    let actor = 'pyMaster02';
    let pubName = "chatgpt/" + actor;
    let subName = "chatgpt_cb/" + actor + "_" + sessionId;
    // Connect to MQTT broker
    var client = mqtt.connect("wss://mqtt1.webduino.io/mqtt");
    //
    this.client = client;
    this.sessionId = sessionId;
    this.pubName = pubName;
    let self = this;
    client.on("connect", function () {
      console.log("Connected to MQTT broker");

      // Subscribe to a topic
      client.subscribe(subName, function (err) {
        if (!err) {
          console.log("Subscribed");
        }
      });
    });

    client.on("message", function (topic, message) {
      console.log("Received message", message.toString(), "on topic", topic);
      self.respText.value = message.toString();
      if (self.respText.value != '處理中...') {
        self.renderRoot.getElementById("sendBtn").disabled = false;
      }
    });
  }

  firstUpdated() {
    var btn = this.renderRoot.getElementById("help");
    var modal = this.renderRoot.getElementById("myModal");
    var sendBtn = this.renderRoot.getElementById("sendBtn");
    var closeBtn = this.renderRoot.getElementById("closeBtn");
    var sendText = this.renderRoot.getElementById("sendText");
    this.respText = this.renderRoot.getElementById("respText");

    sendText.addEventListener("keydown", function (e) {
      e.stopPropagation();
    });

    btn.onclick = function () {
      modal.style.display = "block";
    }
    let self = this;
    sendBtn.onclick = function () {
      sendBtn.disabled = true;
      let text = sendText.value;
      console.log(self.pubName, self.sessionId + ' ' + text);
      //*
      self.client.publish(self.pubName, self.sessionId + ' ' + text, function (err) {
        if (err) alert(JSON.stringify(err));
      });
      //*/
    }

    closeBtn.onclick = function () {
      modal.style.display = "none";
    }
  }

  static styles = [css`
  .modal {
      display: none;
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
      position: relative;
      background-color: #fefefe;
      color: #333;
      margin: auto;
      padding: 3px;
      top: 100px;
      border: 1px solid #888;
      width: 640px;
      height: 640px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      animation-name: animatetop;
      animation-duration: 0.4s;
  }

  .send-btn:disabled,
  send-btn[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }  
  
  .send-btn {
      position: relative;
      float:right;
      padding: 7px;
      bottom: 2px;
      right: 2px;
      color: #000;
      font-size: 16px;
      font-weight: bold;
  }
  
  .close-btn {
    position: relative;
    float:right;
    padding: 7px;
    bottom: 2px;
    right: 2px;
    color: #000;
    font-size: 16px;
    font-weight: bold;
}

  .close-btn:hover,
  .close-btn:focus {
      color: red;
      text-decoration: none;
      cursor: pointer;
  }
  
  @keyframes modalopen {
      from {opacity: 0}
      to { opacity: 1 }
  }

  #title {
    font-size: 18px;
    padding: 5px;
  }

  textarea {
      width: 100%;
      height: 40%;
      padding: 3px;
      box-sizing: border-box;
      border: 2px solid #ccc;
      border-radius: 4px;
      background-color: #f8f8f8;
      font-size: 16px;
      resize: none;
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
    `
  ];

  render() {
    return html`
      <div id='help' class='btn'>
        <svg viewBox="0 0 24 24">
            <path d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z" />
            <path d="M0,0h24v24H0V0z" fill="none" />
        </svg>
        <span><slot></slot></span>
      </div>

      <div id="myModal" class="modal">
        <div class="modal-content">
            <div id="title">您好，我是 Python 小助手，可以問我程式問題呦</div>
            <textarea id='sendText'></textarea>
            <input id="sendBtn" class='send-btn' type='button' value='送出'>
            <textarea id='respText'></textarea>
            <button id="closeBtn" class='close-btn'>關閉</button>
        </div>
      </div>
    `;
  }
}

customElements.define('wa-dialog', dialog);