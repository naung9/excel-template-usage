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

async function readAndWriteExcel(data, values, returnType = "base64"){
    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(data);
    values.forEach(value => {
        const worksheet = workbook.getWorksheet(value.sheet);
        for(const cellNo in value.cells){
            const cellObj = worksheet.getCell(cellNo);
            cellObj.value = value.cells[cellNo];
        }
    });
    const buffer = await workbook.xlsx.writeBuffer();
    if(returnType === "base64"){
        return Buffer.from(buffer).toString('base64');
    }else {
        return buffer;
    }
}
module.exports = {populateTemplate, readAndWriteExcel};
window.populateTemplate = populateTemplate;
window.readAndWriteExcel = readAndWriteExcel;
window.Excel = Excel;
window.xlsx = xlsx;
