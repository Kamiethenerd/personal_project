function makeCode(){
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
        var saveMsg = "Save Successful!\nInput this code:\n" + saveCode + "\nthen press load to resume game at a later time";
        appendStoryWell(saveMsg);
        console.log(saveMsg);
    });
}

function loadProcess(code) {

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/save/' + code,
        data: code
    }).done(function (response, textStatus, jqXHR) {
        console.log('loading . . ');

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var loadFail = "Could not load save data for " + code;
        console.log(jqXHR, textStatus, errorThrown);
        appendStoryWell(loadFail);
    }).always(function (data) {
        console.log('Loaded!');
        loadSave(data);
    });
}

function loadSave(obj){
    backpack=[];

    xp=obj.xp;
    st=obj.strength;
    def=obj.defense;
    currentlevel=obj.currentLvl;
    backpack.push(obj.backpack);
    areaId=obj.area;

    getArea(areaId);
    $('#locationDisplay').text(currentArea);
    $('#xpDisplay').text("XP: " + xp);
}