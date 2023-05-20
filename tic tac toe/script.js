console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("wah.mp3")
let turn = "X"
let isgameover = false;
const winningIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks').trim();
let onetimewin = 0;
// Set --winning-blocks to yellow color
document.body.style.setProperty('--winning-blocks', 'red');
console.log(winningIndicator)


function restartGif() {
    var gifElement = document.querySelector('.imgbox img');
    gifElement.style.width = "300px"; // Set the initial width of the GIF
    gifElement.style.visibility = "visible"; // Ensure the GIF is visible
    gifElement.src = ''; // Reset the source to stop the current GIF playback
    gifElement.src = 'wah-wah-wa-wa.gif'; // Set the source back to the original GIF
  }
// Function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "0": "X"
}

// Function to check for a win
function playAudioTurn(duration) {
audioTurn.play();
    timeout = setTimeout(() => {
    audioTurn.pause();
      audioTurn.currentTime = 0;
    }, duration);
  }
 function gameoverTurn(duration) {
    gameover.play();
    timeout = setTimeout(() => {
      gameover.pause();
      gameover.currentTime = 0;
    }, duration);
  }
  
 
  // Run the GIF for 5 seconds
 const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e =>{
        if(onetimewin == 0 && (boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
            gameover.play();
            onetimewin = 1;
            boxtext[e[0]].style.backgroundColor = winningIndicator;
            boxtext[e[1]].style.backgroundColor = winningIndicator;
            boxtext[e[2]].style.backgroundColor = winningIndicator;
           
            gameoverTurn(5000);
            isgameover = true
            // document.body.boxtext[e[0]].style.background-color =  "red";
            // document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "400px";
             
            restartGif();
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
    })
}

// Game Logic
// music.play()
let tt = 0;
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
        playAudioTurn(300)
         tt++;
            
             checkWin();
            if (!isgameover && tt != 9){
                document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
            } 
            if(tt == 9&& isgameover ==  false){
                document.getElementsByClassName("info")[0].innerText  =  " Match draw"

            }
        }
    })
})

 

// Function to restart the GIF

// Usage example

 
// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    // to remove all the entries filled
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
        element.style.backgroundColor = "transparent";
    });
    // audioTurn.pause();
     onetimewin = 0;
       
      
    clearTimeout(timeout);
    gameover.pause();
    gameover.currentTime = 0;
   
    isgameover = false
    turn = "X"; 
    tt = 0;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
      document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
     
})

