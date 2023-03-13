###### tags: `egame`,`lit`

CRUD 試算表
=====

## 1.功能
提供 HTML CRUD 指定的Google試算表

## 2.畫面長相
<img src="https://md.webduino.io/uploads/upload_07503e8cde4780f79ee305f83d2ea357.png" alt="" width="">


## 3.使用範例 [連結](https://webduinoio.github.io/BlockMirror/test/coms/wa-crud)
```html
<body>
    <h2>jsgrid + google試算表</h2>
    <h3>後端API:https://mopcon.nodered.vip/api/data/</h3>
    <wa-crud url="https://mopcon.nodered.vip/api/data/" width="600px" height="420px">
        <wa-crud-col title="id" name="id" type="text" width="20"></wa-crud-col>
        <wa-crud-col title="title" name="title" type="text" width="80"></wa-crud-col>
        <wa-crud-col title="content" name="content" type="text" width="170" show="false"></wa-crud-col>
        <wa-crud-col title="theinput" name="theinput" type="text" width="150" show="false"></wa-crud-col>
        <wa-crud-col title="theoutput" name="theoutput" type="text" width="150" show="false"></wa-crud-col>
        <wa-crud-col title="sample" name="sample" type="text" width="150" show="false"></wa-crud-col>
        <wa-crud-col title="hint" name="hint" type="text" width="125" show="false"></wa-crud-col>
        <wa-crud-col title="hash" name="hash" type="text" width="100" show="true"></wa-crud-col>
        <wa-crud-col title="samplecode" name="samplecode" type="text" width="100" show="false"></wa-crud-col>
    </wa-crud>

    <h3>後端API:https://mopcon.nodered.vip/api/test/</h3>
    <wa-crud url="https://mopcon.nodered.vip/api/test/" width="340px" height="220px">
        <wa-crud-col title="id" name="id" type="text" width="40"></wa-crud-col>
        <wa-crud-col title="tel" name="tel" type="text" width="100" show="true"></wa-crud-col>
    </wa-crud>
</body>
```
## 4.使用說明
- 需搭配 wa-crud-col 使用
- show 可以預設要不要顯示欄位


## <wa-run-python></wa-run-python>
## <wa-ai-chat-dialog></wa-ai-chat-dialog>