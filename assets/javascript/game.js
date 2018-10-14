document.addEventListener("DOMContentLoaded", function (event) {

    var currentWins = document.getElementById("currentWins");
    var currentWord = document.getElementById("currentWord");
    var remainingGuesses = document.getElementById("remainingGuesses");
    var lettersGuessed = document.getElementById("lettersGuessed");
    var youLose = document.getElementById("youLose");
    var youWin = document.getElementById("youWin");

    var alphabet = "abcdefghijklmnopqrstuvwxyz";

    var wins = 0;
    var word;
    var cookieType = ["oatmeal", "snickerdoodle", "gingersnap", "chocolatechip", "gingerbread", "thinmint", "samoa"] // Cookie types array
    var workingWord;
    var maxLives = 10; // Max number of letter guesses
    var currentLives;
    var guess = " ";
    var userGuesses = [ ];
    var stencil = [ ];

    // Game start
    console.log("Code starts.");

    
    document.addEventListener("keyup", start);

    function start(){
        console.log("New game!");
        document.removeEventListener("keyup", start);
        youLose.innerText = " ";
        runGame();
    };

    function userInput(){
        console.log("User input live.")
        document.addEventListener("keyup", getGuess);
    }

    function runGame(){
        variableReset();
        workingWord = pickWord();
        console.log(workingWord);
        paintWord();
        console.log(stencil);
        paintVariables();
        userInput();
    };

    function pickWord() {
        var cookieIndex = [Math.floor(Math.random() * cookieType.length)];
        return cookieType[cookieIndex];
    };  

    function paintWord() {
        for(i = 0; i < workingWord.length; i++){
            stencil += "*";
        };

        workingWord.innerText = stencil;
    };

    function variableReset() { 
        currentLives = maxLives;
        userGuesses = [ ];
        guess = " ";
        stencil = [ ];
    };

    function paintVariables(){
        currentWins.innerText = wins;
        currentWord.innerText = stencil;
        remainingGuesses.innerText = currentLives;
        lettersGuessed.innerText = userGuesses;
    };

    function getGuess(event){
        guess = event.key;
        if(!testCharacter (guess, alphabet)){
            return
        }
        if(testCharacter (guess, userGuesses)){
           return
        }
        userGuesses += guess;
        if (testCharacter (guess, workingWord)){
            for (i = 0; i < workingWord.length; i++){
                if(workingWord[i] == guess){
                   stencil= replaceAt(stencil,i,guess);

                };
            };
            paintVariables();
            userWin();
        }
        else {
            currentLives--
            paintVariables();
            if (currentLives == 0){
                youLose.innerText = "You've Lose. Press any key to try again!"
                document.removeEventListener("keyup", getGuess);
                document.addEventListener("keyup", start);
            };
        };
        
    };

    // Test if x is in y
    function testCharacter (xChar, yString){ 
        if (yString.includes(xChar)) {
            return true;
        }
        else {
            return false;
        };
    };

    function userWin(){
        if (testCharacter("*", stencil)){
        return false;
        };
        wins++;
        currentWins.innerText = wins;
        start();

    };

    function replaceAt(string, index, replace) {
        return string.substring(0, index) + replace + string.substring(index + 1);
      }

});

