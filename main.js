const input = require('prompt-sync')({sigint: true});

function output(text){
console.log(text);
};

function clearConsole(){
    process.stdout.write('\x1Bc');
    console.clear();
};

output("ave maria");
clearConsole();
output("teste funcionou?");