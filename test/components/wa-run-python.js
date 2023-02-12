import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
export class RunPython extends LitElement {

    static properties = {
        console: {},
    };

    constructor() {
        super();
    }

    static styles = [css`
  `];

    async firstUpdated() {
        const run = this.renderRoot.querySelector("#run");
        const output = document.getElementById(this.console);
        function stdin_func() {

        }

        function stdout_func(msg) {
            output.innerHTML = output.innerHTML + msg + '<br>';
        }

        function stderr_func(msg) {
            output.innerHTML = output.innerHTML + msg + '<br>';
        }

        async function runPython(code) {
            await pyodide.runPython(code);
        }

        run.addEventListener('click', async function () {
            output.innerHTML = '';
            await runPython(editor.getCode());
        });

        let pyodide;
        console.log("init pyodide....");
        pyodide = await loadPyodide({
            //stdin: stdin_func,
            stdout: stdout_func,
            stderr: stderr_func,
        });
        // Pyodide is now ready to use...
        console.log("pyodide ready !");
        run.removeAttribute('disabled');
    }

    render() {
        return html`<button id='run' disabled="enable">Run</button>`;
    }
}
customElements.define('wa-run-python', RunPython);
