import DaisyElement from './wa-daisy.js'
/**
 * filename：wa-crud.js
 * descript：顯示題目
 * associate: fetch ./exam/q001.json
 * Author: Marty
 * Date: 2022/02
 */
export class Avatar extends DaisyElement {

    static properties = {
        show: {}
    };

    firstUpdated() {
    }

    render() {
        return html`<slot></slot>`
    }
}
// 
customElements.define('wa-avatar', Avatar);
