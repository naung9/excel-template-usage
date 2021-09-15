const xlsx = require("xlsx-template");

function populateTemplate(data,templates, returnType){
    let xlsxTemplate = new xlsx(data);
    templates.forEach(template => {
        console.log(template);
        xlsxTemplate.substitute(template.sheetNo, template.data);
    });
    return xlsxTemplate.generate({type: returnType});
}

exports.populateTemplate = populateTemplate;
window.populateTemplate = populateTemplate;
