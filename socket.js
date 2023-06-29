const startButton = document.querySelector("#start");
const endButton = document.querySelector("#end");
const text = document.querySelector("title");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four  = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
var game_id;
var order = [];
var on = true;
var playerOrder = [];
var flash;
var turn;
var good;
let compTurn;
let intervalId;
var win;


const start = async() => {
// start a new game via POST /game
    console.log("game starting");
    //m = fetch('/game', {method: "POST"}).then(response => response.text()).then(data => {console.log(data)})
    fetch('/game', {method: "POST"}).then(response => {return response.text()}).then(response => {request_server(response)});
}

const request_server = async(id) => {
    //try {
        //array check
        game_id = id
        order = [];  // clear previous orders
        playerOrder = [];
        // just get the first element
        fetch('/game/' + game_id).then(response => {return response.json()}).then(response => {order.push(response.currentSequence[0])})
        fetch('/game/' + game_id).then(response => {return response.json()}).then(response => {flash_x(response.currentSequence[0])})
        clearColor();
        flashColor();
        setTimeout(2000,clearColor()); 
        //win condition check
        fetch('/game/' + game_id).then(response => {return response.json()}).then(response => {win = response.hasWon})
    //} catch(e) {
        //console.log(response.json)
    //} finally {
        //console.log("end stack reached")
    //}
}

const check = async() =>{
    fetch('/game/' + game_id).then(response => {return response.json()}).then(response => {win = response.hasWon});
    if(win){  // kill the game is we already won
        terminate();
    }
    return true;  // clear previous orders
    
}
function flash_x(x){
    if(x == 0){
        c_one();

    }
    if(x == 1){
        c_two();
    }
    if(x == 2){
        c_three();
    }
    if(x == 3){
        c_four();
    }
    if(x == 4){
        c_five();
    }
    if(x == 5){
        c_six();
    }
    if(x == 6){
        c_seven();
    }
    if(x == 7){
        c_eight();
    }
    if(x == 8){
        c_nine();
    }
}
function flashColor(){
    for(I = 0; I < order.length; I ++){
        x = order[I];
        console.log("x is " + x);
        if(x == 0){
            c_one();
            document.getElementById("one").innerHTML = I;
            //setTimeout(2000,clearColor()); 
        }
        if(x == 1){
            c_two();
            document.getElementById("two").innerHTML = I;
            //setTimeout(2000,clearColor()); 
        }
        if(x == 2){
            c_three();
            document.getElementById("three").innerHTML = I;
            //setTimeout(2000,clearColor()); 
        }
        if(x == 3){
            c_four();
            document.getElementById("four").innerHTML = I;
            //setTimeout(2000,clearColor()); 
        }
        if(x == 4){
            c_five();
            document.getElementById("five").innerHTML = I;
            //setTimeout(2000,clearColor()); 
        }
        if(x == 5){
            c_six();
            document.getElementById("six").innerHTML = I;
            //setTimeout(2000,clearColor()); 
        }
        if(x == 6){
            c_seven();
            document.getElementById("seven").innerHTML = I;
            //setTimeout(2000,clearColor()); 
        }
        if(x == 7){
            c_eight();
            document.getElementById("eight").innerHTML = I;
            //setTimeout(2000,clearColor()); 
        }
        if(x == 8){
            c_nine();
            document.getElementById("nine").innerHTML = I;
            //setTimeout(2000,clearColor()); 
        }
    }
}
const submit = async() =>{
    await fetch('/game/' + game_id, {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify(playerOrder)}).then(response => {return response.json()}).then(response => {turn = response})
    // this is just a sanity check.
    if(turn){  // if turn is true
        order = [];
        playerOrder = [];// clear both order
        turn = false;
        // populate new orders
        fetch('/game/' + game_id).then(response => {return response.json()}).then(response => {for(i = 0 ; i < response.currentSequence.length; i++){order.push(response.currentSequence[i])}})
        fetch('/game/' + game_id).then(response => {return response.json()}).then(response => {for(i = 0 ; i < response.currentSequence.length; i++){flash_x(response.currentSequence[i])}})
        flashColor();
        setTimeout(2000,clearColor()); 
    }
    if(!turn){
        // if it doesn't pass
        playerOrder = [];
        flashColor();
        setTimeout(2000,clearColor()); 
    }
}
function reset_text(){  // hide the hints
      document.getElementById("one").innerHTML = '?';
      document.getElementById("two").innerHTML = '?';
      document.getElementById("three").innerHTML = '?';
      document.getElementById("four").innerHTML = '?';
      document.getElementById("five").innerHTML = '?';
      document.getElementById("six").innerHTML = '?';
      document.getElementById("seven").innerHTML = '?';
      document.getElementById("eight").innerHTML = '?';
      document.getElementById("nine").innerHTML = '?';
}
startButton.addEventListener('click', (event) => {
        // hide the start button and display the end button
        document.getElementById("start").style.display = "none"; // kill starts
        document.getElementById("end").style.display = "inline-block"  // shows the end button
        //document.getElementById('title').innerHTML = "The game has started";
        start();
        document.getElementById('title').innerHTML = ("The game started");
        console.log("event listener logged");
        //game_id = document.getElementById('title').innerHTML;
        flashColor();
        setTimeout(2000,clearColor()); 
})

function terminate(){
    document.getElementById("start").style.display = "none"; // kill starts
    document.getElementById("end").style.display = "none"  // shows the end button
    document.getElementById('title').innerHTML = "The game has ended";
    elements = document.querySelectorAll('.digit')
    on = false;
    elements.forEach((element, key) => {
        element.style.display = "none"
    })
    if(win){  // if you won
      document.getElementById('title').innerHTML = "The game has ended you are the winner";
    }
}

endButton.addEventListener('click', (event) => {
    document.getElementById('title').innerHTML = "The game has ended";
    terminate()})
    
    function c_one() {
        one.style.backgroundColor = "black";
      }
      
      function c_two() {
          two.style.backgroundColor = "black";
        }
      
        function c_three() {
          three.style.backgroundColor = "black";
        }
      
        function c_four() {
          four.style.backgroundColor = "black";
        }
        function c_five() {
          five.style.backgroundColor = "black";
        }
        function c_six() {
          six.style.backgroundColor = "black";
        }
        function c_seven() {
          seven.style.backgroundColor = "black";
        }
        function c_eight() {
          eight.style.backgroundColor = "black";
        }
        function c_nine() {
          nine.style.backgroundColor = "black";
        }
      
      function clearColor() {
          one.style.backgroundColor = "red";
          two.style.backgroundColor = "green";
          three.style.backgroundColor = "blue";
          four.style.backgroundColor = "purple";
          five.style.backgroundColor = "yellow";
          six.style.backgroundColor = "orange";
          seven.style.backgroundColor = "white";
          eight.style.backgroundColor = "aqua";
          nine.style.backgroundColor = "bisque";
      }
      
      one.addEventListener('click', (event) => {
        reset_text();
        if (on) {
          playerOrder.push(0);
          check();
          c_one();
          if(!win) {
            setTimeout(() => {
              clearColor();
            }, 300);
          }
          if(playerOrder.length == order.length){
              submit(); // if reached the size submit
          }
        }
      })
      
      two.addEventListener('click', (event) => {
        reset_text();
        if (on) {
          playerOrder.push(1);
          check();
          c_two();
          if(!win) {
            setTimeout(() => {
              clearColor();
            }, 300);
          }
          if(playerOrder.length == order.length){
            submit(); // if reached the size submit
        }
        }
      })
      
      three.addEventListener('click', (event) => {
        reset_text();
        if (on) {
          playerOrder.push(2);
          check();
          c_three();
          if(!win) {
            setTimeout(() => {
              clearColor();
            }, 300);
          }
          if(playerOrder.length == order.length){
            submit(); // if reached the size submit
        }
        }
      })
      
      four.addEventListener('click', (event) => {
        reset_text();
        if (on) {
          playerOrder.push(3);
          check();
          c_four();
          if(!win) {
            setTimeout(() => {
              clearColor();
            }, 300);
          }
          if(playerOrder.length == order.length){
            submit(); // if reached the size submit
        }
        }
      })
      five.addEventListener('click', (event) => {
        reset_text();
          if (on) {
            playerOrder.push(4);
            check();
            c_five();
            if(!win) {
              setTimeout(() => {
                clearColor();
              }, 300);
            }
            if(playerOrder.length == order.length){
                submit(); // if reached the size submit
            }
          }
        })
      six.addEventListener('click', (event) => {
        reset_text();
          if (on) {
            playerOrder.push(5);
            check();
            c_six();
            if(!win) {
              setTimeout(() => {
                clearColor();
              }, 300);
            }
            if(playerOrder.length == order.length){
                submit(); // if reached the size submit
            }
          }
        })
      seven.addEventListener('click', (event) => {
        reset_text();
          if (on) {
            playerOrder.push(6);
            check();
            c_seven();
            if(!win) {
              setTimeout(() => {
                clearColor();
              }, 300);
            }
            if(playerOrder.length == order.length){
                submit(); // if reached the size submit
            }
          }
        })
      eight.addEventListener('click', (event) => {
        reset_text();
          if (on) {
            playerOrder.push(7);
            check();
            c_eight();
            if(!win) {
              setTimeout(() => {
                clearColor();
              }, 300);
            }
            if(playerOrder.length == order.length){
                submit(); // if reached the size submit
            }
          }
        })
      nine.addEventListener('click', (event) => {
        reset_text();
          if (on) {
            playerOrder.push(8);
            check();
            c_nine();
            if(!win) {
              setTimeout(() => {
                clearColor();
              }, 300);
            }
            if(playerOrder.length == order.length){
                submit(); // if reached the size submit
            }
          }
        })
