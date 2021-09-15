const fs = require("fs");
const path = require("path");
const index = require("./index");

const defaultFile = path.join(__dirname, 'iSGM_Template.xlsx');
if (typeof require !== 'undefined' && require.main === module) {
    fs.readFile(defaultFile, (err, data)=>{
        fs.writeFile(path.join(__dirname, 'updated.xlsx'), index.populateTemplate(data), (err)=>{
            if(err)console.error(err);
        });
    });
}
