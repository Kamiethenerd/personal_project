var currentMonster = [];
var monSt = 0;
var monDef = 0;
var monLvl = 0;
var monsterRewards =[];

var currentMonsterId = 0;


var playerHealth = 0;
var monHealth = 0;


function battle() {
    inBattle = true;

    getEnemy(currentMonsterId);
    setTimeout(function () {
        monHealth = monLvl*15;
        playerHealth = currentLevel*15;

        console.log("monster: " + currentMonster);
        console.log('monster strength: ' + monSt + '\nmonster health: ' + monHealth);
        var newMon = "Oh no! It's " + currentMonster + "!";
        console.log('monster stats\n strength: ' + monSt + '\nDefense: ' + monDef + '\nlevel: ' + monLvl);
        appendStoryWell(newMon);
        playByPlay();

    }, 2000);
}


var turnTracker = 0;
// after user enters the word attack
function playByPlay() {
    var die = Math.floor(Math.random() * (6 - 1) + 1);
    var playerRoll = die*currentLevel;
    var monRoll = die*monLvl;
    var damage = 0;


    if (playerHealth <= 0 && monHealth >= 0) { //monster wins
        var msg = " Oh no! " + currentMonster + " has knocked you out";
        appendStoryWell(msg);
        inBattle = false;

    } else if (monHealth <= 0 && playerHealth >= 0) { //player wins
        var msg = "Huzzah! You have slain the mighty " + currentMonster + "!";
        appendStoryWell(msg);
        inBattle = false;
        winRewards();
        addAreaText();

    } else if (turnTracker == 0) { //players turn
        console.log('monster health:' + monHealth + '\nmonster defense: ' + monDef);
        console.log("player attack!");
        damage = playerRoll - monDef;
        console.log('damage to monster: ' + damage);
        monHealth -= damage;
        console.log('monster health:' + monHealth);
        var msg = "You did " + damage + " damage to " + currentMonster + "!";
        appendStoryWell(msg);
        turnTracker++;
        playByPlay();

    } else if (turnTracker == 1) { //monsters turn
        console.log("monster Attack!");
        damage = monRoll - def;
        playerHealth -= damage;
        console.log('player health: ' + playerHealth);
        var msg = currentMonster + " did " + damage + " damage to you!";
        appendStoryWell(msg);
        turnTracker--;
        //playByplay()
    } else {
        console.log("stuff's messed up")
    }
}

function winRewards(){
    var msg = "You added " + monsterRewards.item + " to your backpack!";
    console.log(monsterRewards.text);
    appendStoryWell(monsterRewards.text);
    backpack.push(monsterRewards.item);
    xp += monsterRewards.xp;
    appendStoryWell(msg);
    $('#xpDisplay').text("XP: " + xp);
    levelUp(xp);
}


function getEnemy(id) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/monsters/' + id,
        complete: function () {
            console.log('Ajax for getting area complete');
        },
        success: function (data) {
            console.log("monster stuff!");
            addMonster(data.monsters);
            console.log("monster data: " + data.monsters)
        }
    });

}
//function appendStoryWell(t) {
//    var $p = $('<p>');
//
//    $p.text(t);
//    $('#storyWell').scrollTop($('#storyWell')[0].scrollHeight);
//    $('#storyWell').append($p);
//
//}

function addMonster(obj){
    currentMonster = [];
    currentMonster.push(obj.monName);

    monSt = obj.monSt;
    monDef = obj.monDF;
    monLvl = obj.lvl;
    monsterRewards = obj.rewards
}

