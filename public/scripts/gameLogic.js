$(document).ready(function() {
    //var battle = require("./battle.js");
    // Game variables
    //user stuff
    var xp = 0;
    var st = 0;
    var def = 0;
    var currentLevel = 1;
    var backpack = [" dollar", " piece of lint"];
    var keywords = ["go", "take", "use", "attack", "hint"];

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


    // when loading page
    function opening() {
        var load = "loading . . . ";
        var start = "please enter your name";

        appendStoryWell(load);
        console.log(areaId);
        getArea(areaId);
        //appendStoryWell(start);

        setTimeout(function () {
            console.log("area text: " + areaText);
            addAreaText(areaText);
        }, 1000);
    }


    opening();

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

    function appendStoryWell(t) {
        var $p = $('<p>');

        $p.text(t);
        $('#storyWell').scrollTop($('#storyWell')[0].scrollHeight);
        $('#storyWell').append($p);

    }


    // add player text to story log
    function playerText(next) {
        var $p = $('<p>');
        $p.append("Player: " + userInput);
        $('#storyWell').append($p);
        return next
    }


    // handling inputs
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


    // verb handling switch
    function verbSwitch() {
        actionWord = actionWord.toLowerCase();
        //var $p = $('<p>');

        switch (actionWord) {
            case "go":
                vsExits(exits);
                break;
            case "take":case "grab":
                takeCheck(descWord);
                console.log('Taking ' + descWord);
                break;
            case 'use':case "give":
                useCheck(descWord);
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
            case 'fight':
                battle.battle(currentLevel,st,def);
                console.log('fight!')
                break;
            default:
                var idk = "I don't know what you want";
                appendStoryWell(idk);

        }
    }

    function newArea(obj) {
        currentLocationStuff = [];
        currentArea = [];
        areaText = [];
        hint = [];
        objectList = [];

        //console.log(obj);
        currentLocationStuff.push(obj);
        currentArea.push(obj.locName);
        areaText.push(obj.description);
        hint.push(obj.hint);
        exits = obj.exits;
        objectList.push(obj.objects);
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
                    console.log("area text: " + areaText);
                    addAreaText(areaText);
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
        found = false;
        console.log('searching your backpack . . .');

        for (var i = 0; i <= backpack.length; i++) {
            console.log(backpack[i]);

            if (item == backpack[i]) {

                var msg = "You used" + backpack[i] + "!";
                backpack.splice(i, 1);
                console.log(backpack[i]);
                appendStoryWell(msg);
                found = true;
            } else {
                console.log("not an item match");
            }
        }
        if (found == false) {
            var msg = item + " doesn't seem to be in your backpack.";
            appendStoryWell(msg);
        }
    }
});



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







