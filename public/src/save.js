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
