let nameIndex = parseInt(Array.from(document.querySelectorAll('th')).find(th => th.innerText == "Course").getAttribute('data-index'));
let lengthIndex = parseInt(Array.from(document.querySelectorAll('th')).find(th => th.innerText == "Length").getAttribute('data-index')); 

let courseLengths = {};

Array.from(document.querySelectorAll('tbody tr')).forEach(row => {
    let name = row.querySelector(`td:nth-of-type(${nameIndex+1})`).innerText;
    let nameParsed = undefined;
    let length = row.querySelector(`td:nth-of-type(${lengthIndex+1})`).innerText;
    let lengthParsed = undefined;

    if(/^\d\d mins.$/.test(length)) {
        lengthParsed = parseInt(length.match(/^(\d\d)/)[0]);
    }
    else if(/^\d hour(|s)$/.test(length)) {
        lengthParsed = parseInt(length.match(/^\d/)[0]) * 60;
    }
    else if(/^\d hr(|s). \d\d mins.$/.test(length)) {
        let hours = parseInt(length.match(/^\d/)[0]);
        let minutes = parseInt(length.match(/\d\d/)[0]);
        lengthParsed = (hours * 60) + minutes;
    }
    else if (length == "0 hours n/a" || length == "") {
        lengthParsed = undefined;
    }
    else {
        lengthParsed = undefined;
    }
    
    if(/\([A-Z0-9]+\)$/.test(name) == true) {
        nameParsed = name.match(/\([A-Z0-9]+\)$/)[0].replace('(','').replace(')','');
    }
    else if(/\([A-Z0-9]+\) --- Course is marked as inactive$/.test(name) == true) {
        nameParsed = name.match(/\([A-Z0-9]+\) --- Course is marked as inactive$/)[0].replace('(','').replace(') --- Course is marked as inactive','');
    }
    else if(name == "") {
        nameParsed = undefined
    }
    else {
        nameParsed = undefined;
    }

    if(nameParsed != undefined && lengthParsed != undefined) {
        courseLengths[nameParsed] = lengthParsed;
        //console.log(`{"${nameParsed}": ${lengthParsed}}`);
    }
})

let courses = [
    "12SAFBBP",
    "12SAFFPC",
    "12SAFFEX",
    "12SAFFIR",
    "12SAFHCS",
    "12SAFLTO",
    "12SAFRES",
    "12SAFSCF",
    //"12PSGEN",
    "12PSOBSP",
    "12DKDOP",
    "12SAFWCB",
    "12SAFHPT",
    "12SAFHZC",
    "12SAFCS",
    "12SAFACC",
    "12SAFELE",
    "12SAFPPE",
    "12SAFWSL",
    "12SAFCPG",
    //"1213GHS",
    "12HUPRF"
]
let total = 0;

courses.forEach(course => {
    console.log(course, courseLengths[course]);
    if(courseLengths[course] != undefined) {
        total += courseLengths[course];
    }
});

console.log("Total minutes:", total);
//console.log(JSON.stringify(results, null, 4));