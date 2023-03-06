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
/*
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
            setTimeout(function () { editor.execCommand("autocomplete"); }, 500);
    }
});
//*/

editor.addChangeListener(function (event) {
    console.log('Change! Better save:', event.value);
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
    ready(name, obj) {
        console.log("Ready...", name, obj);
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