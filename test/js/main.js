let eleBlockmirror = document.getElementById('blockmirror-editor');
let parentElement = eleBlockmirror.parentElement;

var editor = new BlockMirror({
    'container': eleBlockmirror,
    'height': parentElement,
    'toolbox': 'wa', // empty, minimal , ct , normal , full,
    'viewMode': 'text', // text , split ,block
});

// resize detect
new ResizeObserver(function () {
    editor.blockEditor.blockMirror.configuration.height = parentElement.offsetHeight;
    editor.textEditor.blockMirror.configuration.height = parentElement.offsetHeight;
    editor.textEditor.resizeResponsively();
    editor.refresh();
}).observe(parentElement);
// editor autocomplete
//*
const ignore = ['', '#', '!', '-', '=', '@', '$', '%', '&', '+', ';', '(', ')', '*'];
const ignoreToken = (text) => {
    if (text && text[0]) {
        for (const pre in ignore) {
            if (ignore[pre] === text[0]) {
                return true;
            }
        }
    } else {
        return true;
    }
    return false;
};
editor.textEditor.codeMirror.on("change", function (editor, change) {
    if (change.origin == "+input") {
        var text = change.text;
        if (!ignoreToken(text))
            setTimeout(function () { editor.execCommand("autocomplete"); }, 700);
    }
});
//*/

editor.addChangeListener(function (event) {
    // console.log('Change! Better save:', event.value);
    // lint custom ref: https://juejin.cn/post/7127282061211074573
});



// set python code
/*
editor.setCode(`year = input()
year = int(year)
year = year - 1911
print(year)
`);
*/

class Main {
    init() {
        // 改成所有元件ready再初始化,不要用 setTimeout
        setTimeout(function () {
            window.Main.editor = editor;
            Container.init({
                'c1': 'drag1', 'c2': 'drag2', 'c3': 'drag3'
            });
        }, 100);
    }
    ready(name, obj) {
        console.log("Component Ready...", name);
        if (name == 'wa-range') {
            var range = obj;
            range.onSlider(function (value) {
                document.getElementsByClassName("CodeMirror")[0].style['font-size'] = value + 'px';
                editor.textEditor.codeMirror.refresh();
            });
        }
    }
}

window.Main = new Main();
window.Main.init();
