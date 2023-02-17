import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

/**
 * filename：wa-crud.js
 * descript：顯示題目
 * associate: fetch ./exam/q001.json
 * Author: Marty
 * Date: 2022/02
 */
export class CRUD extends LitElement {

    static properties = {
        url: {},
        height: {},
        width: {}
    };

    constructor() {
        super();
    }

    static styles = [css`
  `];

    getColInfo() {
        var cols = [];
        for (var i = 0; i < this.children.length - 1; i++) {
            cols.push(this.children[i].getObject());
        }
        cols.push({ type: "control" });
        return cols;
    }

    renderGrid(ele) {
        var my = this;
        $(ele).jsGrid({
            height: this.height,
            width: this.width,
            autoload: true,
            inserting: true,
            editing: true,
            sorting: true,
            paging: true,
            fields: my.getColInfo(),
            controller: {
                loadData: function () {
                    return $.ajax({
                        url: my.url + "list",
                        dataType: "json"
                    });
                },
                insertItem: function (item) {
                    return $.ajax({
                        type: "POST",
                        url: my.url + "insert",
                        data: item
                    });
                },
                updateItem: function (item) {
                    return $.ajax({
                        type: "POST",
                        url: my.url + "update",
                        data: item
                    });
                },
                deleteItem: function (item) {
                    return $.ajax({
                        type: "DELETE",
                        url: my.url + "delete",
                        data: item
                    });
                }
            }
        });
    }

    firstUpdated() {
        window.list = this;
        var my = this;
        var ele = document.createElement("div");
        this.append(ele);
        setTimeout(function () {
            my.renderGrid(ele);
        }, 0);
    }

    render() {
        return html`<slot></slot>`
    }
}
// 
customElements.define('wa-crud', CRUD);
