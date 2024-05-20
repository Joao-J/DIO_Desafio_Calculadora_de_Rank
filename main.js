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
    output("=======================\nMENU\n\n1 - jogar\n2 - player info\n\n0-sair\n=======================\n")
    switch(input("")){
        case "1":
            game();
        break;
        case "2":
            clearConsole();
            seeScoreandRank();
        break;
        case "0":
        running = false;
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
    
    let menuChoices = true;
    while(menuChoices){
        clearConsole()
        output("   " + player.name + "\n\nvitorias: " + player.wins + "\nderrotas: " + player.loser + "\nnivel: " + nivel + "\n");
        output("O Herói tem de saldo de " + player.wins + " está no nível de " + nivel);
        output("*{ 1 - menu / 0 - fechar }*\n")
        switch(input("")){
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

function game(){
    let head = "  o  ";
    let legs = " \/ \\  ";
    let bodyMode = [" |||_"," ||\\\/"," ||\\)","_|||","\\\/|| ","(\/|| "];
    let n = "\n";
    let t = "\t";
    output(head + t + head + n + bodyMode[0] + t + bodyMode[5] + n + legs + t + legs);
    let menuChoices = true;

    let defineStatus = new Object();
    defineStatus.Def = 0;
    defineStatus.Atk = 1;
    defineStatus.Life = 3;

    let player = defineStatus;
    let bot = defineStatus;

    while(menuChoices){
        if (player.Life > 0){
        output("*{ 1 - ATACAR | 2 - DEFENDER | 3 - SEGURAR DEFESA | 4 - SEGURAR ATAQUE | 0 - FECHAR }*\n");
        switch(input("")){
            case '1':
                if (bot.Def > 0){
                    bot.life = player.Atk - bot.Def;
                    bot.Def -= player.Atk;
                    if (bot.Def < 0){
                        bot.Def = 0;
                    };
                    player.Atk = 0;
                }
            break
            case '2':
                player.Def = 0;
            break
            case '3':
                player.Def += 1;
            case '4':
                player.Atk += 1;
            break
            case '0':
                menuChoices = false;
            default:
                output("Não é uma escolha válida");
            break
            }
        }else{
            menuChoices = false;
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

game()
//start()