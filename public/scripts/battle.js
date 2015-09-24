module.exports
{

    battle : function (l, s, d) {
        var currentMonster = [];
        var monSt = 0;
        var monDef = 0;

        var currentMonsterId = 0;

        getEnemy(currentMonsterId);


//play makes chance.js roll to do damage to monster
//chance.rpg('3d10', {sum: true}); //example
//if st = 0 || monst = 0 then end fight
//else if players turn
        function getEnemy(id) {
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: '/locations/' + id,
                complete: function () {
                    console.log('Ajax for getting area complete');
                },
                success: function (data) {
                    console.log("monster stuff!");
                    addMonster(data);

                }
            });

        }

        function addMonster(obj){
            currentMonster = [];

            currentMonster.push(obj.monName);

            monSt = obj.monSt;
            monDef = obj.monDf;

        }
    }
}