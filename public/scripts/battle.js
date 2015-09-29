var currentMonster = [];
var monSt = 0;
var monDef = 0;
var monLvl = 0;

var currentMonsterId = 0;

function battle() {



    getEnemy(currentMonsterId);
    setTimeout(function () {
        $p = ('<p>');
        console.log("monster: " + currentMonster);
        var newMon = "Oh no! It's " + currentMonster + "!";
        appendStoryWell(newMon);
        playByplay();
    }, 2000);

}




// after user enters the word attack
    function playByplay() {
        var damage = 0;
        var playerHealth = (s*25);
        var monHealth = (monSt*25);
        var turnTracker = 0;

        var die = Math.random() * (6 - 1) + 1;
        var playerRoll = die*l;
        var monRoll = die*monLvl;


        if (playerHealth = 0) {
            var msg = " Oh no! " + currentMonster + " has knocked you out";
            appendStoryWell(msg);

        } else if (monHealth = 0) {
            var msg = "Huzzah! You have slain the mighty " + currentMonster +

        } else if (turnTracker = 0) { //players turn
            var msg = "You did " + damage + " damage to " + currentMonster + "!";
            damage = playerRoll - monDef;
            monHealth -= damage;
            appendStoryWell(msg);
            turnTracker++;
            playByplay();

        } else if (turnTracker = 1) { //monsters turn
            var msg = currentMonster + " did " + damage + " damage to you!";
            damage = monRoll - d;
            playerHealth -= damage;
            appendStoryWell(msg);
            turnTracker--;
            //playByplay()
        } else {
            console.log("stuff's messed up")
        }
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
            addMonster(data);
        }
    });

}

//function appendStoryWell(t) {
//    var $p = $('<p>');
//    $p.text(t);
//    $('#storyWell').append($p);
//}

function addMonster(obj){
    currentMonster = [];
    currentMonster.push(obj.monName);

    monSt = obj.monSt;
    monDef = obj.monDf;
    monLvl = obj.lvl;

}

