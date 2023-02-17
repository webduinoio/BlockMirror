import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

/**
 * filename：wa-crud.js
 * descript：顯示題目
 * associate: fetch ./exam/q001.json
 * Author: Marty
 * Date: 2022/02
 */
export class Column extends LitElement {

    static properties = {
        title: {},
        name: {},
        type: {},
        width: {},
        show: {}
    };

    getObject() {
        return {
            "title": this.title,
            "name": this.name,
            "type": this.type,
            "width": this.width,
            "visible": this.show!="false",
        }
    }

    firstUpdated() {
    }

    render() {
        return html`<slot></slot>`
    }
}
// 
customElements.define('wa-crud-col', Column);
