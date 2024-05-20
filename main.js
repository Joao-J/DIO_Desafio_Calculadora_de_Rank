const input = require('prompt-sync')({sigint: true});
const player = new Object()
var running = false;

function output(text){
console.log(text);
};

function clearConsole(){
    process.stdout.write('\x1Bc');
    console.clear();
};

function playerData(name){
    player.name = name
    player.loser = 0
    player.wins = 0
}

function menu(){
while(running == true){
    switch(input(
        "=======================\nMENU\n\n1 - jogar\n2 - player info\n\n0-sair\n=======================\n"
    )){
        case "1":

        break;
        case "2":
            clearConsole();
            seeScoreandRank();
        break;
        case "0":

        break;
        default:
            output("Não é uma escolha válida");
        break;
    }
}
}

function loader(nextfunction){
    output("==============");
    setTimeout(() => {
        clearConsole();
        nextfunction();
    }, 1000);
}

function seeScoreandRank(){
    let rank = player.wins - player.loser;
    let nivel = "";
    if (rank <= 10){
        nivel = "Ferro";
    }else if(rank >= 11 && rank <= 20){
        nivel = "Bronze";
    }else if(rank >= 11 && rank <= 20){
        nivel = "Prata";
    }else if(rank >= 51 && rank <= 80){
        nivel = "Ouro";
    }else if(rank >= 81 && rank <= 90){
        nivel = "Diamante";
    }else if(rank >= 91 && rank <= 100){
        nivel = "Lendário";
    }else if(rank >= 101){
        nivel = "Imortal";
    };
    output("   " + player.name + "\n\nvitorias: " + player.wins + "\nderrotas: " + player.loser + "\nnivel: " + nivel + "\n");
    output("O Herói tem de saldo de " + player.wins + " está no nível de " + nivel);
    let menuChoices = true;
    while(menuChoices){
        switch(input("*{ 1 - menu / 0 - fechar }*\n")){
            case "1":
                menuChoices = false
                break;
            case "0":
                menuChoices = false;
                running = false;
                break
            default:
                output("Não é uma escolha válida");
                break
        }
    }
}

function start(){
output("NOME DO JOGADOR: ");
playerData(input(" "));
output("NOME DEFINIDO");
running = true;
loader(menu);
}

start()