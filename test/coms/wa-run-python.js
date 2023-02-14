import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

/**
 * filename：wa-run-python.js
 * descript：按下此按鈕，可以使用 pyodide 套件執行 python 程式
 * associate: editor , wa-output , Main
 * Author: Marty
 * Date: 2022/02
 */
export class RunPython extends LitElement {

    static properties = {
        console: {},
    };

    constructor() {
        super();
    }

    static styles = [css`
    svg {
        fill: #990;
        width: 24px;
        height: 24px;
    }  
    .btn {
        transition: all 0.5s ease;
        cursor: pointer;
        color: #990;
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

    async runPythonCode(code) {
        try {
            await this.pyodide.runPythonAsync(code);
            return null;
        } catch (err) {
            if (err instanceof this.pyodide.PythonError) {
                var errMsg = err.message.split('\n').slice(-3).join(' ');
                var result = errMsg.replace(/(line )(\d+)/, function (match, p1, p2) {
                    return p1 + (parseInt(p2) - 2);
                });
                return result;
            } else {
                throw err;
            }
        }
    }

    async firstUpdated() {
        let self = this;
        const run = this.renderRoot.querySelector("#run");
        const icon = this.renderRoot.querySelector("#icon");
        const output = document.getElementById(this.console);

        function stdout_func(msg) {
            output.show(msg);
            output.scrollBottom();
        }

        function stderr_func(msg) {
            output.show(msg);
            output.scrollBottom();
        }

        function convertCode(code) {
            var imp = 'import js\nimport asyncio\n';
            return imp +
                code.replace(/input\(/g, 'await js.Main.input(');
        }

        run.addEventListener('click', async function () {
            output.cls();
            var newCode = convertCode(editor.getCode());
            self.runPythonCode(newCode).then(result => {
                if (result != null) {
                    result = result.substring(result.indexOf(',') + 1);
                    output.showErr(result);
                }
            });
            //pyodide.runPython(editor.getCode());
        });

        let pyodide;
        console.log("init pyodide....");
        pyodide = await loadPyodide({
            //stdin: stdin_func,
            stdout: stdout_func,
            stderr: stderr_func,
        });
        run.style['color'] = '#eee';
        icon.style['fill'] = '#eee';

        Main.input = async function (msg) {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    var rtn = prompt();
                    resolve(rtn);
                }, 500);
            });
        }
        this.pyodide = pyodide;
        this.output = output;
        // Pyodide is now ready to use...
        console.log("pyodide ready !");
        run.removeAttribute('disabled');
    }

    frontTest() {
        var exam = document.getElementById("exam");
        var info = exam.getInfo();
        var sampleinput = info['sampleinput'];
        var sampleoutput = info['sampleoutput'];
        this.output.cls();
        var newCode = editor.getCode();
        this.pyodide.setStdin({
            stdin: function () {
                return sampleinput;
            }
        })
        this.runPythonCode(newCode).then(result => {
            if (result != null) {
                result = result.substring(result.indexOf(',') + 1);
                output.showErr(result);
            }
            var outputData = this.output.getMsg().replace(/<br>/g, '');
            if (sampleoutput == outputData) {
                alert('測試成功');
            } else {
                alert('測試失敗');
            }
        });
    }

    render() {
        return html`
        <div id='run' class='btn'>
        <svg id='icon' viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
        <span>執行</span>
        </div>
        `;
    }
}
customElements.define('wa-run-python', RunPython);
