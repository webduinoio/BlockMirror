import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

/**
 * filename：wa-markdown.js
 * descript：顯示 markdown
 * associate: 
 * Author: Marty
 * Date: 2022/02
 */
export class Markdown extends LitElement {

    static properties = {
        path: {},
        default: {}
    };
    static styles = [css`
    :host {
        font-size: 18px;
        margin-left: 20px;
        margin-right: 20px;
        overflow: auto;
        display: block;
        width: calc(100% - 40px);
        height: calc(100vh - 40px);
        overflow-x: hidden;
        padding-right: 24px;
    }
    `];

    async getContent() {
        var idx = location.hash;
        var content = this.default;
        var htmlContent = '';
        if (idx.length > 1) {
            content = idx.substring(1);
        }
        if (content.startsWith("q")) {
            var row = content.substring(1);
            htmlContent = '<wa-question id="exam" idx="' + row + '" bind="Main"></wa-question>';
        } else {
            var converter = new showdown.Converter();
            var text = await fetch(this.path + content, {})
                .then((response) => {
                    return response.text();
                });
            htmlContent = converter.makeHtml(text);
        }
        this.renderRoot.innerHTML = htmlContent;
    }

    firstUpdated() {
        this.getContent();
        var self = this;
        window.addEventListener('hashchange', function () {
            self.getContent();
        });
    }

    render() {
        return html`<slot></slot>`
    }
}

customElements.define('wa-markdown', Markdown);