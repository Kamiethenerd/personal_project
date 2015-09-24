module.exports = {
    //Leveling Mechanic
    //level switch for upgrades
    levelUp:function(x){
        switch (x) {

            var upLevel = "Congrats! you leveled up!";
                var upStrength = "You are now stronger!";
                var upDef = "Defenses up!";




            case 500:
                appendStoryWell(upLevel);
                currentLevel = 2;
                appendStoryWell(upStrength);
                st +=2;
                appendStoryWell(upDef);
                def +=3;

                break;
            case 1200:
                appendStoryWell(upLevel);
                currentLevel = 3;
                appendStoryWell(upStrength);
                st +=1;
                appendStoryWell(upDef);
                def +=1;
                backpack.push("Slippers");

                break;
            case 2000:
                appendStoryWell(upLevel);
                currentLevel = 4;
                appendStoryWell(upStrength);
                st +=2;
                appendStoryWell(upDef);
                def +=3;

                break;
            case 2900:
                appendStoryWell(upLevel);
                currentLevel = 5;
                appendStoryWell(upStrength);
                st +=2;
                appendStoryWell(upDef);
                def +=3;

                break;
            //default:
            //    break;
        }
    }
};


