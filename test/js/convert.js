// JSBin: https://jsbin.com/dejacepiya/edit?js,console
// reference: https://zerojudge.tw/ShowProblem?problemid=d049

var data = `
題目
中華民國萬歲！

內容
國父孫中山於 1911 年武昌起義推翻滿清創立中華民國，並訂次年 (1912) 年為中華民國元年。從此國民政府便以中華民國國號記年至今。請寫一程式，將輸入的西元年份轉換成民國年份後輸出。

輸入說明
輸入僅有一行，其中包含一個西元年份 y (1912 ≤ y ≤ 2147483647)。

輸出說明
輸出所算出的民國年份。

範例輸入 #1
2008
範例輸出 #1
97
範例輸入 #2
2021
範例輸出 #2
110

`;

var jsonData = {}
var nd = data.split('\n').filter(item => (item !== '\n' && item!==""));
for(var i=0;i<nd.length;i=i+2){
  var key = nd[i];
  var val = nd[i+1];
  if(key=='題目') key = 'title';
  if(key=='內容') key = 'content';
  if(key=='輸入說明') key = 'theinput';
  if(key=='輸出說明') key = 'theoutput';
  if(key.indexOf('範例輸入')==0) key = 'sampleinput';
  if(key.indexOf('範例輸出')==0) key = 'sampleoutput';
  jsonData[key] = val;
}
console.log(jsonData);