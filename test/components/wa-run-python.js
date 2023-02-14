import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
export class RunPython extends LitElement {

    static properties = {
        console: {},
    };

    constructor() {
        super();
    }

    static styles = [css`
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
  `];

    async firstUpdated() {
        let self = this;
        self.content = "";
        const run = this.renderRoot.querySelector("#run");
        const output = document.getElementById(this.console);

        window.input = async function (msg) {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    var rtn = prompt();
                    resolve(rtn);
                }, 500);
            });
        }

        function stdout_func(msg) {
            output.innerHTML = output.innerHTML + msg + '<br>';
            output.scrollBottom();
        }

        function stderr_func(msg) {
            output.innerHTML = output.innerHTML + msg + '<br>';
            output.scrollBottom();
        }

        function convertCode(code) {
            var imp = 'import js\nimport asyncio\n';
            return imp +
                code.replace(/input\(/g, 'await js.input(');
        }

        run.addEventListener('click', function () {
            output.innerHTML = '';
            var newCode = convertCode(editor.getCode());
            //console.log(newCode);
            pyodide.runPythonAsync(newCode);
            //pyodide.runPython(editor.getCode());
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
        return html`
        <div id='run' class='btn'>
        <svg viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
        <span>執行</span>
        </div>
        `;
    }
}
customElements.define('wa-run-python', RunPython);
