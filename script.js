let currentTurn = 0; 
let gameOver = false; 

// playerturns = 0, 2, 4, 6, 8...
// AI turns = 1, 3, 5, 7, 9...

const button1 = document.getElementById("sq0");
const button2 = document.getElementById("sq1");
const button3 = document.getElementById("sq2");
const button4 = document.getElementById("sq3");
const button5 = document.getElementById("sq4");
const button6 = document.getElementById("sq5");
const button7 = document.getElementById("sq6");
const button8 = document.getElementById("sq7");
const button9 = document.getElementById("sq8");

const box = document.querySelector(".box");

let buttonList = [
    button1, button2, button3, button4, button5, button6, button7, button8, button9
];

gameplay(); //function call

function gameplay(){ //function definition
    buttonList.forEach(button => {
        button.onclick = () => { //arrow function
            let pTag = button.children[0];
            if(currentTurn % 2 == 0){
                currentTurn++; //iterator, adds 1
                pTag.innerHTML = "X"; //changes the text
                button.disabled = true; 
                buttonList.splice(buttonList.indexOf(button),1);
                checkWin(); 
                if(gameOver == false){
                    AITurn(buttonList);
                } 
            }
        }
    });
}

function AITurn(list){
    if(list.length > 0){
        let random = Math.floor(Math.random() * list.length);
        let aiChoice = list[random]; 
        aiChoice.disabled = true;
        list.splice(buttonList.indexOf(aiChoice),1); 
        let pTag = aiChoice.children[0];
        pTag.innerHTML = "O"; 
        currentTurn++; 
        checkWin();
    }
}

function checkWin(){
    if( //horizontal user cases
        button1.textContent.trim() == "X" && button2.textContent.trim() == "X" && button3.textContent.trim() == "X" || //X horizontal
        button4.textContent.trim() == "X" && button5.textContent.trim() == "X" && button6.textContent.trim() == "X" ||
        button7.textContent.trim() == "X" && button8.textContent.trim() == "X" && button9.textContent.trim() == "X" ||
    
        //vertical user cases
        button1.textContent.trim() == "X" && button4.textContent.trim() == "X" && button7.textContent.trim() == "X" || //X Vertical
        button2.textContent.trim() == "X" && button5.textContent.trim() == "X" && button8.textContent.trim() == "X" ||
        button3.textContent.trim() == "X" && button6.textContent.trim() == "X" && button9.textContent.trim() == "X" ||
        //diagonal user cases
        button1.textContent.trim() == "X" && button5.textContent.trim() == "X" && button9.textContent.trim() == "X" || //X Diagonal
        button3.textContent.trim() == "X" && button5.textContent.trim() == "X" && button7.textContent.trim() == "X"
    ){
        gameOver = true; 
        endGame("You have"); 
    }

    if( //horizontal AI cases
        button1.textContent.trim() == "O" && button2.textContent.trim() == "O" && button3.textContent.trim() == "O" || //O horizontal
        button4.textContent.trim() == "O" && button5.textContent.trim() == "O" && button6.textContent.trim() == "O" ||
        button7.textContent.trim() == "O" && button8.textContent.trim() == "O" && button9.textContent.trim() == "O" ||
        //vertical AI cases
        button1.textContent.trim() == "O" && button4.textContent.trim() == "O" && button7.textContent.trim() == "O" || //O Vertical
        button2.textContent.trim() == "O" && button5.textContent.trim() == "O" && button8.textContent.trim() == "O" ||
        button3.textContent.trim() == "O" && button6.textContent.trim() == "O" && button9.textContent.trim() == "O" ||
        //diagonal AI cases
        button1.textContent.trim() == "O" && button5.textContent.trim() == "O" && button9.textContent.trim() == "O" || //O Diagonal
        button3.textContent.trim() == "O" && button5.textContent.trim() == "O" && button7.textContent.trim() == "O"
    ){
        gameOver = true; 
        endGame("AI has"); 
    }
}

function endGame(winner){
    buttonList.forEach(button => {
        button.disabled = true; 
    });
    //create winner text, tells user who won
    const word = document.createElement('h1'); 
    word.classList.add("winner-text");
    word.innerHTML = winner + " won!";
    box.appendChild(word);

    //create reset button
    const reset = document.createElement('button');
    reset.classList.add("reset-button");
    reset.innerHTML = "Play again?";
    box.appendChild(reset);

    //resets game
    reset.onclick = () => {
        currentTurn = 0; 
        gameOver = false; 
        buttonList.splice(0, buttonList.length); 
        buttonList = [button1, button2, button3, button4, button5, button6, button7, button8, button9];
        box.removeChild(reset); 
        box.removeChild(word); 

        buttonList.forEach(element => {
            element.children[0].innerHTML = ""; 
            element.disabled = false; 
        }); 
        gameplay(); 
    }
}