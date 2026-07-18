const fs = require('fs');

const dataJs = fs.readFileSync('e:/AAT/New2/ProjectGeden4/js/data.js', 'utf8');
const lines = dataJs.split('\n');
const polygonLines = lines.slice(295, 477);
const polygonStr = polygonLines.join('\n');

const wilayahJs = fs.readFileSync('e:/AAT/New2/ProjectGeden4/js/dataWilayah.js', 'utf8');
const newWilayahJs = wilayahJs.replace('];\n', '    ,' + polygonStr + '\n];\n');

fs.writeFileSync('e:/AAT/New2/ProjectGeden4/js/dataWilayah.js', newWilayahJs, 'utf8');
console.log('Success');
