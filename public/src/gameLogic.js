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

    //Tab handler
    $('#help').click(function (e) {
        alert('works');
        e.preventDefault();
        $(this).tab('show')
    });
    $('#game').click(function (e) {
        alert('works');
        e.preventDefault();
        $(this).tab('show')
    });

    // when loading page
    function newGameStart() {
        var load = "loading . . . ";
        //var start = "please enter your name";

        appendStoryWell(load);
        getArea(areaId);
        //appendStoryWell(start);

        setTimeout(function () {
            console.log("area text: " + areaText);
            addAreaText(areaText);
        }, 1000);
        $('#levelDisplay').text("Level: " + currentLevel);
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
        console.log('loading save...');
        loadCode = $("#userInput").val();
        loadMsg = "loading save for code:\n" + loadCode;
        appendStoryWell(loadMsg);
        loadProcess(loadCode);
        $('input[type="text"], textarea').val('');

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
function appendStoryWellSpecial(t,cl) {
    var $p = $('<p>');
    var timeOut;
    var char = 0;
    var humanize = Math.round(Math.random() * (120 - 30)) + 30;
    //$($p).append(t);
    $('#storyWell').append($p);
    $($p).attr("class",cl);

    console.log(typeof t);
    console.log(t);
    if (typeof t == "object") {
        t = t[0];
    }

    var txtLen = t.length;
    //var displayText = "";
    (function typeIt(){
        timeOut = setTimeout(function () {
            char++;
            var type = t.substring(0, char);
            $p.text(type + '|');
            typeIt();

            if (char == txtLen) {
                $p.text($p.text().slice(0, -1)); // remove the '|'
                clearTimeout(timeOut);
            }
        },humanize)
    }());


    $('#storyWell').scrollTop($('#storyWell')[0].scrollHeight);

}

function appendStoryWell(t) {
    var $p = $('<p>');
    var timeOut;
    var char = 0;
    var humanize = Math.round(Math.random() * (120 - 30)) + 30;
    //$($p).append(t);
    $('#storyWell').append($p);

    console.log(typeof t);
    console.log(t);
    if (typeof t == "object") {
        t = t[0];
    }

    var txtLen = t.length;
    //var displayText = "";
    (function typeIt(){
        timeOut = setTimeout(function () {
        char++;
        var type = t.substring(0, char);
        $p.text(type + '|');
        //console.log(char);
        //console.log();
        typeIt();

        //letter = t.charAt(i);

        //console.log(type);
        //$p.text(displayText += letter);
        if (char == txtLen) {
            $p.text($p.text().slice(0, -1)); // remove the '|'
            clearTimeout(timeOut);
        }



    },humanize)
    }());


    $('#storyWell').scrollTop($('#storyWell')[0].scrollHeight);

}


function newArea(obj) {
    //currentLocationStuff = [];
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
        var msg = item + " is not an available item to take/grab.";
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
            if(action.object !=null) {
                var bpmsg = "You added " + action.object + " to your backpack!";
                backpack.push(action.object);
                appendStoryWellSpecial(bpmsg);
            } else {
                console.log("no items for you");
            }
            //if var msg = "You added " + action.object + " to your backpack!";
            console.log(action.text);
            appendStoryWell(action.text);
            //backpack.push(action.object);
            xp += action.xp;
            addExit(action.exit);
            //appendStoryWell(msg);
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


