var iconBoxes = document.querySelectorAll(".icon-box");
var playerIcon = document.querySelector(".player-icon");
var notification = document.querySelector(".game-updates");
var playButton = document.querySelector(".play-game");
var startScreen = document.querySelector(".lightbox-start");
var playAgainBtn = document.querySelector(".play-again");

var tieScripts = ["Stop copying me... ", "didn't you hear me?? ", "Wow... you must be a parrot! ", "How original... "];
var playerPointScripts = ["Ok... you got this one...", "sheer luck...", "bet you won't do that again.. ", "You must be cheating", "But... the computer should always win"];
var cpuScripts = ["lightwork... ", "unlucky boss... ", "I do this in my sleep! ", "Ruling champion of the world... C.P.U.! ", "squeaky bum time, is it? "];
var againScripts = ["have another go", "pick your weapon", "give it your best shot", "try again", "hit me again"];


var playerScore = 0;
var cpuScore = 0;
var tieCounter = 0;
var midPlay = false;
var lastScore = "";

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


        playRound(e);
        
    })
    
})
resetBoard();

function playRound(e)
{
    var playerSelection = e.path[0].id;

    var cpuSelection = cpuPlay();

    var selectedIcon = document.querySelector(`#${playerSelection}`);
    selectedIcon.classList.toggle("double-border");

    beginTransition(playerSelection, cpuSelection);

  
    
}

function cpuPlay()
{
    var rps = ["rock", "paper", "scissors"];
    var index = Math.floor(Math.random()*rps.length);

    return rps[index];
}



function beginTransition(playerSelection, cpuSelection)
{
    notif = document.querySelector(".notif");
    notif.classList.toggle("fade");
    notif.addEventListener("transitionend", function()
    {
        notif.textContent = "ching..."
        notif.classList.toggle("fade");

        this.addEventListener("transitionend", function()
        {
            this.classList.toggle("fade");
            this.addEventListener("transitionend", function()
            {
                notif.textContent = "chang...";
                this.classList.toggle("fade");

                this.addEventListener("transitionend", function()
                {
                    this.classList.toggle("fade");
                    this.addEventListener("transitionend", function()
                    {
                        notif.textContent = "chong!";
                        this.classList.toggle("fade");

                        updateBoard(playerSelection, cpuSelection);
                        setTimeout(updateScores, 1000, playerSelection, cpuSelection);
                        
                        
                    }, {once: true})
                }, {once: true});
                
            }, {once: true})
        }, {once: true});
        
    }, {once: true})

}

function updateBoard(playerSelection, cpuSelection)
{
    var playerIcon = document.querySelector("#player-icon");
    playerIcon.data = `${playerSelection}.svg`
    playerIcon.classList.toggle("fade");

    var cpuIcon = document.querySelector("#cpu-icon");
    cpuIcon.data = `${cpuSelection}.svg`
    cpuIcon.classList.toggle("fade");
}

function updateScores(playerSelection, cpuSelection)
{

    

    var commentary = document.querySelector(".commentary");
    var playerScoreboard = document.querySelector(".player-score");
    var cpuScoreboard = document.querySelector(".cpu-score");

    commentary.classList.toggle("fade");

    if (playerSelection == cpuSelection)
    {
        if (tieCounter == 0)
        {
            commentary.textContent = tieScripts[0];
        }
        else if (tieCounter == 1 && lastScore == "tie")
        {
            commentary.textContent = tieScripts[1];
        }
        else
        {
            commentary.textContent = randomizer(tieScripts, 2, 3);
        }
        tieCounter++;
        console.log("Tie");
        lastScore = "tie";
    } else if ((playerSelection == "rock" && cpuSelection == "scissors") || (playerSelection == "paper" && cpuSelection ==
    "rock") || (playerSelection == "scissors" && cpuSelection == "paper"))
   {
        playerScore++;    
        playerScoreboard.textContent = playerScore;

        if (playerScore <=1)
        {
            commentary.textContent = randomizer(playerPointScripts, 0, 2);
        } else
        {
            commentary.textContent = randomizer(playerPointScripts, 3, 4);
        }
        console.log(playerScore);
        lastScore = "player";
   } else
   {
       cpuScore++;
       cpuScoreboard.textContent = cpuScore;
       
       commentary.textContent = randomizer(cpuScripts, 0, 4)
       console.log(cpuScore);

       lastScore = "cpu";
   }
    
    if (playerScore ===3 || cpuScore ===3)
    {
        gameOver(playerScore, cpuScore);
    } else 
    {
        setTimeout(nextRound, 1500, playerSelection);
    }

    
}

function randomizer(arr, lower, upper)
{
   if (!arr[lower] || !arr[upper])
   {
       return "error";
   }

    var range = (upper + 1) - lower;
    var index = Math.floor(Math.random()*range) + lower;

    return arr[index];
}

function nextRound(playerSelection)
{   
    var selectedIcon = document.querySelector(`#${playerSelection}`);
    selectedIcon.classList.toggle("double-border");

    var commentary = document.querySelector(".commentary");
    var playerIcon = document.querySelector("#player-icon");
    var cpuIcon = document.querySelector("#cpu-icon");
    var notif = document.querySelector(".notif");

    commentary.classList.toggle("fade");
    playerIcon.classList.toggle("fade");
    cpuIcon.classList.toggle("fade");
    notif.classList.toggle("fade");

    

    notif.addEventListener("transitionend", function()
    {
        notif.classList.toggle("fade");
        notif.textContent = randomizer(againScripts, 0, 4);

        setTimeout(function()
        {
            midPlay = false;
        }, 500);
    }, {once: true})
}

function gameOver(playerScore, cpuScore)
{
   
    var lightbox = document.querySelector(".lightbox-end");
    var finalScores = document.querySelector(".final-scores");

    lightbox.classList.add("active");
    
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
    playAgainBtn.addEventListener("click", function(e)
    {
        console.log(e);
        alert("worked");
        playerScore = 0;
        cpuScore = 0;
        tieCounter = 0;
        midPlay = false;
        lastScore = "";
        var playerScoreboard = document.querySelector(".player-score");
        var cpuScoreboard = document.querySelector(".cpu-score");
        var lightbox = document.querySelector(".lightbox-end");
        var commentary = document.querySelector(".commentary");
        var notif = document.querySelector(".notif");



        playerScoreboard.textContent = "";
        cpuScoreboard.textContent = "";
        commentary.textContent = "";
        commentary.classList.toggle("fade");
        lightbox.classList.toggle("active");

        var playerIcon = document.querySelector("#player-icon");
        playerIcon.data = "";
        playerIcon.classList.toggle("fade");

        var cpuIcon = document.querySelector("#cpu-icon");
        cpuIcon.data = "";
        cpuIcon.classList.toggle("fade");

        notif.textContent = "versus";
    
        
        
    })
}

