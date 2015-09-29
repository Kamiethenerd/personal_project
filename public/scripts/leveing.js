
    function levelUp(x){
        var upLevel = "Congrats! you leveled up!";
        var upStrength = "You are now stronger!";
        var upDef = "Defenses up!";

        switch (x) {
            case 100:
                appendStoryWell(upLevel);
                currentLevel = 2;
                appendStoryWell(upStrength);
                st +=2;
                appendStoryWell(upDef);
                def +=3;

                break;
            case 300:
                appendStoryWell(upLevel);
                currentLevel = 3;
                appendStoryWell(upStrength);
                st +=1;
                appendStoryWell(upDef);
                def +=1;
                backpack.push("Slippers");

                break;
            case 700:
                appendStoryWell(upLevel);
                currentLevel = 4;
                appendStoryWell(upStrength);
                st +=2;
                appendStoryWell(upDef);
                def +=3;

                break;
            case 1100:
                appendStoryWell(upLevel);
                currentLevel = 5;
                appendStoryWell(upStrength);
                st +=2;
                appendStoryWell(upDef);
                def +=3;

                break;
            default:
                console.log("no level up");
                break;
        }
    };



