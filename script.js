/*-------------------------------SELECTORS---------------------------*/

var iconBoxes = document.querySelectorAll(".icon-box");
var playerIcon = document.querySelector(".player-icon");
var playButton = document.querySelector(".play-game");
var startScreen = document.querySelector(".start-screen");
var playAgainBtn = document.querySelector(".play-again");

/*-------------------------------NOTIFICATION SCRIPTS---------------------------*/

var tieScripts = ["Stop copying me... ", "didn't you hear me?? ", "Wow... you must be a parrot! ", "How original... "];
var playerPointScripts = ["Ok... you got this one...", "sheer luck...", "bet you won't do that again.. ", "You must be cheating", "But... the computer should always win"];
var cpuScripts = ["lightwork... ", "unlucky boss... ", "I do this in my sleep! ", "Ruling champion of the world... C.P.U.! ", "squeaky bum time, is it? "];
var againScripts = ["have another go", "pick your weapon", "give it your best shot", "try again", "hit me again"];

/*-------------------------------COUNTERS---------------------------*/

var playerScore = 0;
var cpuScore = 0;
var tieCounter = 0;
var midPlay = false;
var lastRoundTied = false;



/*-------------------------------EVENTS---------------------------*/



playButton.addEventListener("click", function()
{
    startScreen.classList.add("invisible");
    startScreen.addEventListener("transitionend", function()
    {
        this.classList.add("inactive");
    })
});

iconBoxes.forEach(iconBox =>
{
    iconBox.addEventListener("click", function(e)
    {
        if(midPlay) 
        {
            return;
        }
        midPlay = true;

        playGame(e);
    })
})

resetBoard();


/*-----------------------FUNCTIONS---------------------*/


function playGame(e)
{
    var playerSelection = e.path[0].id;
    var cpuSelection = cpuPlay();
    var selectedIcon = document.querySelector(`#${playerSelection}`);

    selectedIcon.classList.toggle("double-border");

    startGame(playerSelection, cpuSelection);
}

function cpuPlay()
{
    var rps = ["rock", "paper", "scissors"];
    var index = Math.floor(Math.random()*rps.length);

    return rps[index];
}

function startGame(playerSelection, cpuSelection)
{
    notifOne = document.querySelector(".notif-one");
    notifOne.classList.toggle("fade");
    notifOne.addEventListener("transitionend", function()
    {
        this.textContent = "ching..."
        this.classList.toggle("fade");

        this.addEventListener("transitionend", function()
        {
            this.classList.toggle("fade");
            this.addEventListener("transitionend", function()
            {
                this.textContent = "chang...";
                this.classList.toggle("fade");

                this.addEventListener("transitionend", function()
                {
                    this.classList.toggle("fade");
                    this.addEventListener("transitionend", function()
                    {
                        this.textContent = "chong!";
                        this.classList.toggle("fade");

                        displaySelections(playerSelection, cpuSelection);
                        setTimeout(updateGame, 1000, playerSelection, cpuSelection);
                        
                    }, {once: true})
                }, {once: true});
            }, {once: true})
        }, {once: true});
    }, {once: true})
}

function displaySelections(playerSelection, cpuSelection)
{
    var playerIcon = document.querySelector("#player-icon");
    var cpuIcon = document.querySelector("#cpu-icon");

    playerIcon.data = `${playerSelection}.svg`
    playerIcon.classList.toggle("fade");
    
    cpuIcon.data = `${cpuSelection}.svg`
    cpuIcon.classList.toggle("fade");
}

function updateGame(playerSelection, cpuSelection)
{
    updateScores(playerSelection, cpuSelection);
    computeNotifTwo(playerSelection, cpuSelection);
    
    if (playerScore ===3 || cpuScore ===3)
    {
        endGame(playerScore, cpuScore);
    } else 
    {
        setTimeout(startNextRound, 2500, playerSelection);
    }
}

function updateScores(playerSelection, cpuSelection)
{
    var playerScoreboard = document.querySelector(".player-score");
    var cpuScoreboard = document.querySelector(".cpu-score");

    if (playerSelection == cpuSelection)
    {
        return;
    } 
    else if ((playerSelection == "rock" && cpuSelection == "scissors") || (playerSelection == "paper" && cpuSelection ==
    "rock") || (playerSelection == "scissors" && cpuSelection == "paper"))
   {
        playerScore++;    
        playerScoreboard.textContent = playerScore;

   } else
   {
       cpuScore++;
       cpuScoreboard.textContent = cpuScore;
   }
}

function computeNotifTwo(playerSelection, cpuSelection)
{
    var notifTwo = document.querySelector(".notif-two");

    notifTwo.classList.toggle("fade");

    if (playerSelection == cpuSelection)
    {
        if (tieCounter == 0)
        {
            notifTwo.textContent = tieScripts[0];
        }
        else if (tieCounter == 1 && lastRoundTied)
        {
            notifTwo.textContent = tieScripts[1];
        }
        else
        {
            notifTwo.textContent = arrRandomizer(tieScripts, 2, 3);
        }
        tieCounter++;
        lastRoundTied = true;
    } 
    else if ((playerSelection == "rock" && cpuSelection == "scissors") || (playerSelection == "paper" && cpuSelection ==
    "rock") || (playerSelection == "scissors" && cpuSelection == "paper"))
    {
        if (playerScore <=1)
        {
            notifTwo.textContent = arrRandomizer(playerPointScripts, 0, 2);
        } else
        {
            notifTwo.textContent = arrRandomizer(playerPointScripts, 3, 4);
        }

        lastRoundTied = false;
    } else
    {
       notifTwo.textContent = arrRandomizer(cpuScripts, 0, 4)
       lastRoundTied = false;
    }
}

function arrRandomizer(arr, lower, upper)
{
   if (!arr[lower] || !arr[upper])
   {
       return "error";
   }

   var range = (upper + 1) - lower;
   var index = Math.floor(Math.random()*range) + lower;

   return arr[index];
}

function startNextRound(playerSelection)
{   
    var selectedWeapon = document.querySelector(`#${playerSelection}`);
    var notifTwo = document.querySelector(".notif-two");
    var playerIcon = document.querySelector("#player-icon");
    var cpuIcon = document.querySelector("#cpu-icon");
    var notifOne = document.querySelector(".notif-one");

    selectedWeapon.classList.toggle("double-border");
    notifTwo.classList.toggle("fade");
    playerIcon.classList.toggle("fade");
    cpuIcon.classList.toggle("fade");
    notifOne.classList.toggle("fade");

    notifOne.addEventListener("transitionend", function()
    {
        this.classList.toggle("fade");
        this.textContent = arrRandomizer(againScripts, 0, 4);

        setTimeout(function()
        {
            midPlay = false;
        }, 500);
    }, {once: true})
}

function endGame(playerScore, cpuScore)
{
    var endScreen = document.querySelector(".end-screen");
    var finalScores = document.querySelector(".final-scores");

    endScreen.classList.add("active");
    
    if (playerScore > cpuScore)
    {
        finalScores.textContent = `You win ${playerScore} to ${cpuScore}. Damn.`;
    } else
    {
        finalScores.textContent = `CPU wins ${cpuScore} to ${playerScore}. Ha ha!`;
    }
}

function resetBoard()
{
    playAgainBtn.addEventListener("click", function()
    {
        var playerScoreboard = document.querySelector(".player-score");
        var cpuScoreboard = document.querySelector(".cpu-score");
        var endScreen = document.querySelector(".end-screen");
        var notifOne = document.querySelector(".notif-one");
        var notifTwo = document.querySelector(".notif-two");
        var playerIcon = document.querySelector("#player-icon");
        var cpuIcon = document.querySelector("#cpu-icon");

        playerScore = 0;
        cpuScore = 0;
        tieCounter = 0;
        midPlay = false;
        lastRoundTied = false;
        playerScoreboard.textContent = "";
        cpuScoreboard.textContent = "";
        notifOne.textContent = "versus";
        notifTwo.textContent = "";
        notifTwo.classList.toggle("fade");
        endScreen.classList.toggle("active");
        playerIcon.data = "";
        playerIcon.classList.toggle("fade");
        cpuIcon.data = "";
        cpuIcon.classList.toggle("fade");
    })
}

