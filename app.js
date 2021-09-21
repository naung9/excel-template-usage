const fs = require("fs");
const path = require("path");
const index = require("./index");

const defaultFile = path.join(__dirname, 'Chikyoku WBS.xlsx');
if (typeof require !== 'undefined' && require.main === module) {
    fs.readFile(defaultFile, async (err, data)=>{
        fs.writeFile(path.join(__dirname, 'updated.xlsx'), await index.readAndWriteExcel(data, "buffer"), (err)=>{
            if(err)console.error(err);
        });
    });
}
