const path = require('path');

//console.log(path)

//console.log(path.extname("C:\\Projects\\play.js"))

const some = path.format({
    dir: 'C:\\path\\dir',
    base: 'file.txt'
  });

console.log( path.resolve(__dirname, __filename) )