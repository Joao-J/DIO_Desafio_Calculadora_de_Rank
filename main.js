const input = require('prompt-sync')({sigint: true});
const sleep = require('system-sleep');
const user = new Object()
var running = false;

function output(text){
console.log(text);
};

function clearConsole(){
    process.stdout.write('\x1Bc');
    console.clear();
};

function userData(name){
    user.name = name
    user.loser = 0
    user.wins = 0
}

function menu(){
while(running == true){
    output("\n┌───────────⋆⋅☆⋅⋆───────────┐\n\t     MENU\n\n   1 - Jogar\n   2 - Informações do Jogador\n\n   0 - Sair\n└───────────⋆⋅☆⋅⋆ ───────────┘\n")
    switch(input("")){
        case "1":
            game();
        break;
        case "2":
            clearConsole();
            seeScoreandRank();
        break;
        case "0":
            bye();
        running = false;
        break;
        default:
            output("Não é uma escolha válida");
        break;
    }
}
}

function bye(){
    clearConsole();
    output("Tchau " + user.name + ", até uma próxima batalha! ( ^-^)" );
    sleep(3000);
    clearConsole();
}

function loader(nextfunction){
    output("==============");
    sleep(2000);
    clearConsole();
    nextfunction();
}

function seeScoreandRank(){
    let rank = user.wins - user.loser;
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
        output("JOGADOR: " + user.name + "\nVitorias: " + user.wins + "\nDerrotas: " + user.loser + "\nNivel: " + nivel + "\n");
        output("O Herói tem de saldo de " + user.wins + " está no nível de " + nivel);
        output("┌────────────{ ⋆⋅☆⋅⋆ }────────────┐\n 1 - Voltar ao menu \n 0 - Sair \n└────────────{ ⋆⋅☆⋅⋆ }────────────┘ \n")
        switch(input("")){
            case "1":
                menuChoices = false
                clearConsole();
                break;
            case "0":
                menuChoices = false;
                running = false;
                bye();
                break
            default:
                output("Não é uma escolha válida");
                break
        }
    }
}

function game(){

    let playerStatus = new Object();
    playerStatus.Def = 1;
    playerStatus.Atk = 1;
    playerStatus.Life = 3;
    playerStatus.ADef = 0;

    let botStatus = new Object();
    botStatus.Def = 1;
    botStatus.Atk = 1;
    botStatus.Life = 3;
    botStatus.ADef = 0;
    
    let player =  playerStatus;
    let bot =  botStatus;

    let head = "  o  ";
    let legs = " \/ \\  ";
    let bodyMode = [" |||_"," ||\\\/"," ||\\)","_|||","\\\/|| ","(\/|| "];
    let n = "\n";
    let t = "\t";
    let menuChoices = true;

    let atk = 0;
    let batk = 0;

    let pMove = 0;
    let bMove = 3;

    while(menuChoices){
        clearConsole();
        if (player.Life <= 0 || bot.Life <= 0){
            if(player.Life <= 0){
                output('VOCÊ MORREU '+ user.name +'!');
                user.loser += 1;
                sleep(2000);
                clearConsole();
            }else{
                output("PARABÉNS " + user.name + " VOCÊ GANHOU!");
                user.wins += 1;
                sleep(2000);
                clearConsole();
            }
            menuChoices = false;
        }else{

        let botChoice = ((Math.floor(Math.random() * ((4) - 1 + 1)) + 1));

        output(head + t + head + n + bodyMode[0] + t + bodyMode[3] + n + legs + t + legs);
        output('VOCÊ'+ t +'BOT'+n+ 'Vida: '+ player.Life + t + 'Vida: ' + bot.Life + n + 'Atk: ' + player.Atk + t + 'Atk: ' + bot.Atk + n + 'Def: ' + player.Def + t + 'Def: ' + bot.Def)
        output("\n*{ 1 - ATACAR | 2 - DEFENDER | 3 - SEGURAR DEFESA | 4 - SEGURAR ATAQUE | 0 - FECHAR }*:");

        switch(botChoice){
            case 1:
               batk = bot.Atk;
               bMove = 4;
            break;
            case 2:
                bot.ADef = bot.Def;
                bMove = 5;
            break;
            case 3:
                bot.Def += 1;
                break;
            case 4:
                bot.Atk += 1;
            break;
            };

        switch(input("")){
            case '1':
                atk = player.Atk;
                pMove = 1;
            break
            case '2':
                player.ADef = player.Def;
                pMove = 2;
            break
            case '3':
                player.Def += 1;
                break
            case '4':
                player.Atk += 1;
            break
            case '0':
                menuChoices = false;
                menu();
                break
            default:
                output("Não é uma escolha válida");
            break
            }
        
            if(atk >= 1){
                if(bot.ADef > 0){
                    if ((atk - bot.ADef) <= 0){
                        bot.Life -= 0; 
                    }else{
                      bot.Life -= (atk - bot.ADef);  
                    }
                    bot.Def -= player.Atk;
                    if (bot.Def < 0){
                        bot.Def = 0;
                    };
                bot.ADef = 0;
            }else{
                bot.Life -= atk;
            };
            player.Atk = 1;
            atk = 0;
        }

        if(batk >= 1){
            if(player.ADef > 0){
                if ((batk - player.ADef) <= 0){
                    player.Life -= 0; 
                }else{
                 player.Life -= (batk - player.ADef);  
                }
                player.Def -= bot.Atk;
                if (player.Def < 0){
                    player.Def = 0;
                };
                player.ADef = 0;
            }else{
                player.Life -= batk;
            }
            bot.Atk = 1;
            batk = 0;
        }

        clearConsole();
        output(head + t + head + n + bodyMode[pMove] + t + bodyMode[bMove] + n + legs + t + legs);
        sleep(1000);
        pMove = 0;
        bMove = 3;
        }
    }
}

function start(){
output("NOME DO JOGADOR: ");
userData(input(" "));
output("NOME DEFINIDO");
running = true;
loader(menu);
}

start()
