import "core-js/stable";
import "regenerator-runtime/runtime";

const xlsx = require("xlsx-template");
const Excel = require("exceljs");

function populateTemplate(data,templates, returnType = "base64"){
    let xlsxTemplate = new xlsx(data);
    templates.forEach(template => {
        console.log(template);
        xlsxTemplate.substitute(template.sheet, template.data);
    });
    return xlsxTemplate.generate({type: returnType});
}

function readAndWriteExcelSync(data, values, callBack,returnType = "base64"){
    const workbook = new Excel.Workbook();
    workbook.xlsx.load(data).then(_ => {
        if(Array.isArray(values)){
            values.forEach(value => {
                const worksheet = workbook.getWorksheet(value.sheet);
                for(const cellNo in value.cells){
                    const cellObj = worksheet.getCell(cellNo);
                    cellObj.value = value.cells[cellNo];
                }
            });
        }else{
            const worksheet = workbook.getWorksheet(values.configSheet);
            let currentSheet = "";
            const sheetData = [];
            let obj = {};
            const index = values.startIndex;
            worksheet.eachRow((row, rowNumber) => {
                console.log(rowNumber, row.values);
                const sheetName = row.values[index];
                if(sheetName !== undefined && sheetData !== null && sheetName !== currentSheet){
                    console.log(sheetName);
                    if(currentSheet !== ""){
                        sheetData.push(obj);
                    }
                    currentSheet = sheetName;
                    obj = {sheet: sheetName, cells: {}};
                }
                obj.cells[row.values[index+1]] = values.data[row.values[index+2]];
            });
            sheetData.push(obj);
            console.log(sheetData);
            readAndWriteExcelSync(data, sheetData, callBack, returnType);
            return;
        }
        workbook.xlsx.writeBuffer().then(buffer => {
            if(returnType === "base64")callBack(Buffer.from(buffer).toString('base64'));
            else callBack(buffer);
        });
    });
}
window.populateTemplate = populateTemplate;
window.readAndWriteExcelSync = readAndWriteExcelSync;
window.Excel = Excel;
window.xlsx = xlsx;
