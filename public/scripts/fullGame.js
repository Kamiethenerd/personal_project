var xp = 0;
var st =  2;
var def = 2;
var currentLevel = 1;
var backpack = ["dollar", "piece of lint"];


var areaId = 0;
var userInput = [];
var actionWord = [];
var descWord = [];

var currentLocationStuff = [];
var currentArea = [];
var areaText = [];
var hint = [];
var exits = [];
var objectList = [];
var possibleActions = [];
var enemiesforArea = false;
var inBattle = false;

$(document).ready(function() {
    $('#saveAlert').hide();
    $('#loadAlert').hide();
    // when loading page
    function newGameStart() {
        var load = "loading . . . ";
        //var start = "please enter your name";

        appendStoryWell(load);
        console.log(areaId);
        getArea(areaId);
        //appendStoryWell(start);

        setTimeout(function () {
            console.log("area text: " + areaText);
            addAreaText(areaText);
        }, 1000);
    }

    newGameStart();

    //separating out the user input
    function separateText() {
       if (userInput.indexOf(" ") > 0) {
           // var separate = userInput.toString().split(' ');
           actionWord = userInput.substr(0, userInput.indexOf(' '));
           //separate[0];
           descWord = userInput.substr(userInput.indexOf(' ') + 1);
           //separate[1];
       } else {
           actionWord = userInput;
           descWord = " "
       }
    }

    // add player text to story log
    function playerText(next) {
        var $p = $('<p>');
        $p.append("Player: " + userInput).attr("class", "playerText");
        $('#storyWell').append($p);
        return next
    }

    // input handler
    $("#userInput").keypress(function (e) {
        if (e.which == 13) {
            userInput = $(this).val();
            playerText();
            separateText();
            console.log(userInput);
            verbSwitch();
            console.log('first word: ' + actionWord + ", everything else: " + descWord);
            $('input[type="text"], textarea').val('');
        }
    });

    //save handler
    $("#saveBtn").click(function (e){
        saveProcess();
    });

    //load handler
    $("#loadBtn").click(function(e){
        loadProcess();
    });


    // verb handling switch
    function verbSwitch() {
        actionWord = actionWord.toLowerCase();
        //var $p = $('<p>');
        if (inBattle==false) {
            switch (actionWord) {
                case "go":
                    vsExits(exits);
                    break;
                case "take":
                case "grab":
                    takeCheck(descWord);
                    console.log('Taking ' + descWord);
                    break;
                case 'use':
                case "give":
                    actionVS(possibleActions);
                    console.log("using " + descWord);
                    break;
                case 'hint':
                    appendStoryWell(hint);
                    console.log("getting hint..." + hint);
                    break;
                case 'backpack':
                    var pack = " In your backpack you have " + backpack;
                    appendStoryWell(pack);
                    console.log("what's in that back pack?");
                    break;
                case "q":
                    var msg ="knock it off, Danilo.";
                    appendStoryWell(msg);
                    break;
                default :
                    var idk = "I don't know what you want";
                    appendStoryWell(idk);
                    break;
            }
        }else{
            switch (actionWord){
                case 'attack':
                    //battle.battle(currentLevel,st,def);
                    playByPlay();
                    console.log('fight!');
                    break;
                case 'attack!': //egg
                    monDef -= 1;
                    console.log("temporary boost!");
                    playByPlay();
                    monDef += 1;
                    break;
                default :
                    var msg = "you should attack!";
                    appendStoryWell(msg);
                    break;
            }
        }
    }
});
function appendStoryWell(t) {
    var $p = $('<p>');

    $p.text(t);
    $('#storyWell').scrollTop($('#storyWell')[0].scrollHeight);
    $('#storyWell').append($p);

}
function newArea(obj) {
    currentLocationStuff = [];
    currentArea = [];
    areaText = [];
    hint = [];
    objectList = [];

    //console.log(obj);
    //currentLocationStuff.push(obj);
    currentArea.push(obj.locName);
    areaText.push(obj.description);
    hint.push(obj.hint);
    exits = obj.exits;
    objectList.push(obj.objects);
    enemiesforArea = obj.enemies;
    possibleActions = obj.actions;
    //console.log(currentArea + ", " + hint + ", " + objectList + ", ");
    //addAreaText(areaText);

}

// pulling JSON
function getArea(id) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/locations/' + id,
        complete: function () {
            console.log('Ajax for getting area complete');
        },
        success: function (data) {
            newArea(data.location);
        }
    });

}

function addAreaText() {
    appendStoryWell(areaText);
    console.log('loading text for' + currentArea);
    $('#locationDisplay').text(currentArea);
    xp += 5;
    $('#xpDisplay').text("XP: " + xp);
    levelUp(xp);
}

//check the descword againts the exits
function vsExits(obj) {
    console.log("comparing exits . . .");
    var found = false;

    for (var key in obj) {
        //alert(' name=' + key + ' value=' + obj[key]);

        if (descWord == key) {

            console.log(descWord + " matched!");
            areaId = obj[key];
            console.log(areaId);
            getArea(areaId);
            found = true;

            setTimeout(function () {
                //console.log("area text: " + areaText);
                //addAreaText(areaText);
                battleCheck();

            }, 2000);

        } else {
            console.log('not an exit');
        }
    }
    //console.log(found);
    if (found == false) {
        var nope = "Exit requested does not exist.";
        appendStoryWell(nope);
    }
}

function takeCheck(item) {
    found = false;

    for (var i = 0; i <= objectList.length; i++) {
        console.log(objectList[i]);

        if (item == objectList[i]) {
            var msg = "You added " + objectList[i] + " to your backpack!";
            backpack.push(objectList[i]);
            appendStoryWell(msg);
            foundbp = true;
            found = true;
        } else {
            console.log("not an item match");
        }
    }
    if (found == false) {
        var msg = item + " is not an available item to pick-up.";
        appendStoryWell(msg);
    }
}

function useCheck(item) {
    //found in backpack?

    console.log('searching your backpack . . .');

    for (var i = 0; i <= backpack.length; i++) {
        console.log(backpack[i]);

        if (item == backpack[i]) {
            var msg = "You used " + backpack[i] + "!";
            backpack.splice(i, 1);
            console.log(backpack[i]);
            appendStoryWell(msg);
            foundbp = true;
        } else {
            console.log("not an item match");
        }
    }
}


function actionVS(obj){
    console.log("checking available actions");
    //found in action list?
    foundAL = false;
    //found n backpack?
    foundbp = false;
    action = [];

    for (var key in obj) {
        //alert(' name=' + key + ' value=' + obj[key]);

        if (descWord == key) {
            console.log(descWord + " matched!");
            action = obj[key];
            useCheck(descWord);
            foundAL = true;
        } else {
            console.log('you cannot use that here');
        }

        if (foundAL == true && foundbp == false) {
            var msg = "You don't have that item in your backpack.";
            appendStoryWell(msg);
        } else if (foundAL == false && foundbp == true){
            var msg = "You can't use that here.";
            appendStoryWell(msg);
        } else if(foundAL == true && foundbp == true){
            var msg = "You added " + action.object + " to your backpack!";
            console.log(action.text);
            appendStoryWell(action.text);
            backpack.push(action.object);
            xp += action.xp;
            addExit(action.exit);
            appendStoryWell(msg);
            $('#xpDisplay').text("XP: " + xp);
            levelUp(xp);
        } else{
            var msg =" That's not possible";
            appendStoryWell(msg);
        }
    }

}

function addExit(obj){
    for (var key in obj) {
        exits[key]= obj[key];
    }

    console.log(exits)

}

function battleCheck(){
    if (enemiesforArea == true){
       chance = Math.floor(Math.random() * (6 - 1) + 1);
        if (chance <= 3){
            inBattle=true;
            battle();
        } else {
            console.log("area text: " + areaText);
            addAreaText(areaText);
        }
    } else {
        console.log("area text: " + areaText);
        addAreaText(areaText);
    }

}



    //typing animation examples

    //function typeAnimation(v){
    //    $(function() {
    //        var srcText = $("<p>").append(v);
    //        var i = 0;
    //        var result = srcText[i];
    //        setInterval(function() {
    //                if(i == srcText.length) {
    //                    clearInterval(this);
    //                    return;
    //                };
    //                i++;
    //                result += srcText[i].replace("\n", "<br />");
    //                $("#storyWell").append(result);
    //            },
    //            50); // the period between every character and next one, in milliseonds.
    //    });

    //function typeIt() {
    ////    var $el = $('#storyWell'),
    ////        txt = $el.text(),
    ////        txtLen = txt.length,
    ////        timeOut,
    //        char = 0;
    ////
    ////    $el.text('|');
    //
    //    var humanize = Math.round(Math.random() * (200 - 30)) + 30;
    //
    //timeOut = setTimeout(function() {
    //        char++;
    //        var type = txt.substring(0, char);
    //        $el.text(type + '|');
    //        typeIt();
    //
    //        if (char == txtLen) {
    //            $el.text($el.text().slice(0, -1)); // remove the '|'
    //            clearTimeout(timeOut);
    //        }
    //
    //    }, humanize);
    //}
    //


    //function typeIt() {
    //    var $el = $('#storyWell'),
    //        txt = $el.text(),
    //        txtLen = txt.length,
    //        timeOut,
    //        char = 0;
    //
    //    $el.text('|');
    //
    //    var humanize = Math.round(Math.random() * (200 - 30)) + 30;
    //    timeOut = setTimeout(function() {
    //        char++;
    //        var type = txt.substring(0, char);
    //        $el.text(type + '|');
    //        typeIt();
    //
    //        if (char == txtLen) {
    //            $el.text($el.text().slice(0, -1)); // remove the '|'
    //            clearTimeout(timeOut);
    //        }
    //
    //    }, humanize);
    //}








    function levelUp(x) {
        var upLevel = "Congrats! you leveled up!";
        var upStrength = "You are now stronger!";
        var upDef = "Defenses up!";


        if (currentLevel == 1 && x >= 100) {
            appendStoryWell(upLevel);
            currentLevel = 2;
            appendStoryWell(upStrength);
            st += 2;
            appendStoryWell(upDef);
            def += 3;
        } else if (currentLevel == 2 && x >= 200) {
            appendStoryWell(upLevel);
            currentLevel = 3;
            appendStoryWell(upStrength);
            st += 1;
            appendStoryWell(upDef);
            def += 1;
            backpack.push("Slippers");
        } else if (currentLevel == 3 && x >= 300) {
            appendStoryWell(upLevel);
            currentLevel = 4;
            appendStoryWell(upStrength);
            st += 2;
            appendStoryWell(upDef);
            def += 3;
        } else if (currentLevel == 4 && x >= 500) {
            appendStoryWell(upLevel);
            currentLevel = 5;
            appendStoryWell(upStrength);
            st += 2;
            appendStoryWell(upDef);
            def += 3;
        } else {
                console.log("no level up");
        }
    }



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
    monsterPicker(currentLevel);

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

function monsterPicker(lvl){
    console.log("picking random monster");
    idNum = 0;
    function randomMon(min,max){
        idNum = Math.floor(Math.random() * (max - min) + min)
    }
    switch (lvl) {
        case 1:
            randomMon(0, 4);
            console.log("idNum:"+idNum);
            currentMonsterId = idNum;
            break;
        case 2:
            randomMon(0, 8);
            console.log("idNum:"+idNum);
            currentMonsterId = idNum;
            break;
        case 3:
            randomMon(0, 12);
            console.log("idNum:"+idNum);
            currentMonsterId = idNum;
            break;
        case 4:
            randomMon(0, 16);
            console.log("idNum:"+idNum);
            currentMonsterId = idNum;
            break;
        case 5:
            randomMon(0, 20);
            console.log("idNum:"+idNum);
            currentMonsterId = idNum;
            break;
    }
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
    if(monsterRewards.item!=null) {
        var msg = "You added " + monsterRewards.item + " to your backpack!";
        backpack.push(monsterRewards.item);
    } else {
        console.log("no items for you")
    }
    appendStoryWell(monsterRewards.text);
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
            console.log('Ajax for getting monster complete');
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

function makeCode()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function saveProcess() {
    //alert(typeof backpack);
    var backpackSave = JSON.stringify(backpack);
    var saveCode = makeCode();
    var saveObject = {
        xp: xp,
        strength: st,
        defense: def,
        currentLvl: currentLevel,
        backpack: backpackSave,
        area: areaId,
        code: saveCode
    };
    console.log(saveCode);
    console.log(saveObject);
    $.ajax({
        type: 'POST',
        data: saveObject,
        dataType: 'json',
        url: '/save/'
    }).done(function (response, textStatus, jqXHR) {
        console.log('Save complete');

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    }).always(function () {
        console.log('Saved!');
        $('#saveCode').append(saveCode);
        $('#saveAlert').show();
    });
}



function loadProcess(){
    var code = "Z6CZDI";
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/save/'+ code,
        data: code,
        complete: function () {
            console.log('getting save data');
        },
        success: function (data) {
            console.log(data);
        }
    });
}
