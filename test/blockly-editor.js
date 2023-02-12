let codeFrame = document.getElementById('code-frame');
var editor = new BlockMirror({
    'container': document.getElementById('blockmirror-editor'),
    'height': codeFrame.scrollHeight,
    'toolbox': 'wa', // empty, minimal , ct , normal , full
});
editor.addChangeListener(function (event) {
    console.log('Change! Better save:', event)
});
editor.setCode('print("Hello World!")');
//// editor autocomplete
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