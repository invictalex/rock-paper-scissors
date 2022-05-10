
function playerPlay()
{
    var playerSelection;
    
    let rawAnswer = prompt("Rock, paper or scissors?");
    let answer = rawAnswer.toLowerCase();

    playerSelection = answer;
    return playerSelection;
}

function compPlay()
{
    var compSelection;
    
    var rps = ["rock", "paper", "scissors"];
    var index = Math.floor(Math.random()*rps.length);
    var answer = rps[index];

    compSelection = answer;
    return compSelection;
}

function playRound(playerPlay, compPlay)
{
    compSelection = compPlay();
    console.log("I select " + compSelection + "...");
    
    playerSelection = playerPlay();
    console.log("You select " + playerSelection + "...");


    if (compSelection === "rock")
    {
        switch(playerSelection)
            {
                case "rock":
                    return "Tie";
                    break;
                case "paper":
                    return "You win, paper beats rock";
                    break;
                case "scissors":
                    return "You lose, rock beats scissors";
                    break;
            }
    } else if (compSelection === "paper")
    {
        switch(playerSelection)
            {
                case "paper":
                    return "Tie";
                    break;
                case "scissors":
                    return "You win, scissors beats paper";
                    break;
                case "rock":
                    return "You lose, paper beats rock";
                    break;
            }
    } else if (compSelection === "scissors")
    {
        switch(playerSelection)
            {
                case "scissors":
                    return "Tie";
                    break;
                case "rock":
                    return "You win, rock beats scissors";
                    break;
                case "paper":
                    return "You lose, scissors beats paper";
                    break;
            }
    }
}    

function game(rounds)
{
    let compScore = 0;
    let playerScore = 0;
    
    for (let i = 0; i < rounds; i++)
        {
            var result = playRound(playerPlay, compPlay);
            
            if (result.includes("win"))
            {
                playerScore++;
            }
            if (result.includes("lose"))
            {
                compScore++;
            }

        console.log(result);
        console.log("Your score is " + playerScore);
        console.log("My score is " + compScore);
        }
    if (playerScore >= compScore)
    {
        console.log("You win " + playerScore + "-" + compScore);
    } else if (playerScore <= compScore)
    {
        console.log("You lose " + playerScore + "-" + compScore);
    } else 
    {
        console.log("It's a tie!");
    }
} 
      