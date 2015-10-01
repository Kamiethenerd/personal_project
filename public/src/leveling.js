
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



