/**
 * Created by kamie kehrwald on 9/18/15.
 */
// this is where the main game logic will go
$(document).ready(function() {
    // Game variables
    //user stuff
    var xp = 0;
    var st = 0;
    var def = 0;
    var currentLevel = 1;
    var backpack = ["dollar", "piece of lint"];
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

        setTimeout(function(){
            console.log("area text: " + areaText);
            addAreaText(areaText);
        }, 1000);
    }


    opening();

    //separating out the user input
    function separateText() {
        var separate = userInput.toString().split(' ');
        actionWord = separate[0];
        descWord = separate[1];
    }

    function appendStoryWell(t) {
        var $p = $('<p>');

        $p.text(t);
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
            //alert(typeof separate);
            //console.log("User Input: " + userInput + ", Action Word: " + actionWord + ", Description Word: " + descWord);
            verbSwitch();
        }

    });


    // verb handling switch
    function verbSwitch() {
        actionWord = actionWord.toLowerCase();
        var $p = $('<p>');

        switch (actionWord) {
            case "go":
                vsExits(exits);
                $p.append("You want to go to " + descWord);
                $("#storyWell").append($p);
                //getArea(areaId);
                //addAreaText();

                break;
            case "take": // run function that checks if the requested item is available, and if so
                // moves the item to the backpack array
                // run function that appends the item text to the story well
                console.log('Taking ' + descWord);
                break;
            case 'use'://run function that checks if the requested item is in the back pack, and if so
                // checks for any actions from this item in this location, is so runs action and
                // removes it from the backpack.
                console.log("using " + descWord);
                break;
            case 'hint':
                appendStoryWell(hint);
                console.log("getting hint..." + hint);
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


    function vsExits(obj) {
        console.log("comparing exits . . .");

        for (var key in obj) {
            //alert(' name=' + key + ' value=' + obj[key]);

            if (descWord == key) {

                console.log(descWord + " matched!");
                areaId = obj[key];
                console.log(areaId);
                getArea(areaId);

                setTimeout(function(){
                    console.log("area text: " + areaText);
                    addAreaText(areaText);
                }, 1000);

                break;

            } else {
                var nope = "Exit requested does not exist.";

                console.log('not an exit');
                appendStoryWell(nope);

            }
        }
    }

    //opening();
});






