import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

/**
 * filename：wa-crud.js
 * descript：顯示題目
 * associate: fetch ./exam/q001.json
 * Author: Marty
 * Date: 2022/02
 */
export class waBox extends LitElement {

    static properties = {
        height: {},
        width: {}
    };

    static styles = [css`
    .container {
        padding: 10px;
        margin: 10px;
    } 
  `];

    firstUpdated() {
        window.qq = this;
    }

    render() {
        return html`
        <div class='container'>
		  <slot></slot>
	    </div>`
    }
}
// 
customElements.define('wa-box', waBox);
