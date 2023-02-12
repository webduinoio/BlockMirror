import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
export class Textarea extends LitElement {
    constructor() {
        super();
    }

    firstUpdated() {
    }

    render() {
        return html`
    <textarea></textarea>
`;
    }
}
// 
customElements.define('wa-ta', Textarea);
