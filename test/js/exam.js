function preareExam(data) {
    for (var i in data) {
        console.log(data[i], i);
        let showData = data[i];
        var ele = document.getElementById(i);
        ele.innerHTML = showData;
    }
    Main.examJson = data;
}

function frontTest() {
    var runPython = document.getElementById('runPython');
    runPython.frontTest();
}

var examFile = location.hash;
examFile = examFile == '' ? 'q001.json' : examFile.substring(1);
fetch('exam/' + examFile)
    .then(response => response.json())
    .then(data => preareExam(data))
    .catch(error => console.error(error));
