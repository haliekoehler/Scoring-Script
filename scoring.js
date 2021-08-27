 $(document).ready(function() {
 
  // Variables ---------------------------------------------------
  const storage = window.localStorage;
  const url = window.location.href;
  const path = window.location.pathname;
  const totalQuestions = 10;
  const scoreBoard = JSON.parse(localStorage.getItem("scoreBoard") || "[]");
  

   // Check current url / location --------------------------------
  //if (window.location.href.indexOf("start") > -1) {
    // if current url is /start do this...
    // clear localStorage when start page laods
      // window.localStorage.clear();
  //} 
  if (window.location.href.indexOf("score") > -1) {
    // if current url is /score do this...
    // get score total, check conditions and display it
    totalScore(scoreBoard, totalQuestions);
  }
  
  display(); //<-- console.logging for testing
  
  // BUTTONS ------------------------------------------------------
  $("#start-btn").click(function() {
    let total = totalQuestions;
    window.localStorage.clear();
    createScore(total);
  });
  
  //YES / NO Buttons
  $("a.button.yes").click(function(){
    updateBoard(scoreBoard, true, "yes");
  });
  $("a.button.no").click(function(){
    updateBoard(scoreBoard, false, "no");
  });
  //$("a.skip-link.no").click(function(){
    //updateBoard(scoreBoard, false, "skip");
  //});
  $("a.reset-link").click(function(){
    reset(totalQuestions);
  });
  
  function reset (total) {
    // send initial score info to localStroage
    window.localStorage.setItem("qTotal", total);
    window.localStorage.setItem("score", "0");
    window.localStorage.setItem("qNum", "0");
  }
  
  function createScore (total) {
    // send initial score info to localStroage
    window.localStorage.setItem("qTotal", total);
    window.localStorage.setItem("score", "0");
    window.localStorage.setItem("qNum", "0");

    // create scoreboard
    // TO DO: use loop to create based on qTotal (hardcoded temporarily)

    const array = [
      {
        "qNum": 1,
        "point": false,
        "choice": ""
      },
      {
        "qNum": 2,
        "point": false,
        "choice": ""
      },
      {
        "qNum": 3,
        "point": false,
        "choice": ""
      },
      {
        "qNum": 4,
        "point": false,
        "choice": ""
      },
      {
        "qNum": 5,
        "point": false,
        "choice": ""
      },
      {
        "qNum": 6,
        "point": false,
        "choice": ""
      },
      {
        "qNum": 7,
        "point": false,
        "choice": ""
      },
      {
        "qNum": 8,
        "point": false,
        "choice": ""
      },
      {
        "qNum": 9,
        "point": false,
        "choice": ""
      },
      {
        "qNum": 10,
        "point": false,
        "choice": ""
      },
    ];

    // store stringified array in localStorage
    window.localStorage.setItem("scoreBoard", JSON.stringify(array));
  }
  
  function totalScore (scoreBoard, qTotal) {
    // loop through board and total points
    let questions = scoreBoard;
    let score = 0;
    
    console.log(questions);
    
    for (let question of questions) {
      let point = question.point;
      if (point) {
        score++
      }
    }
    console.log(score + " / " + qTotal);
    renderProgressBar (score, qTotal);
  }
  
  function updateBoard (scoreBoard, buttonValue) {
    const path = window.location.pathname;
    
    let value = buttonValue;
    let point;
    
    if(buttonValue == true) {
      point = true;
    } else if (buttonValue == false) {
      point = false;
    } else {
      console.log('something went wrong with the boolean.');
    }
    
    if(scoreBoard){
       // Get org. board, return newboard with user input
      let board = scoreBoard;
      let newBoard = board.map(
        function(obj, index, array) {
         // TODO: change this to an attribute later?
          if (path.indexOf(obj.qNum) > -1) {
            let x = index + 1;
            if(x == obj.qNum) {
              obj.point = point;
            }
          } 
          return obj;
      }, 
        // thisArg
      );
      window.localStorage.setItem("scoreBoard", JSON.stringify(newBoard));
    }
  }
  
  function renderProgressBar (score, total) {
    // render progress bar w/ colors based on score
    const good = $(".bg-success");
    const ok = $(".bg-warning");
    const bad = $(".bg-danger");
    
    let precentage = (score * 100) / total;
    let text = $("#score-text");
    // let width = precentage +"%";

    // precentage / color breakdown
    if(precentage <= 30){
      let width = precentage + "%";
      good.css("width", width);
    }
    
  

    text.text(precentage + "%");
    console.log("Score - " + precentage);
  };
  
  function display () {
    let output = JSON.stringify(storage); 
    let score = window.localStorage.getItem("score");
    let qNum = window.localStorage.getItem("qNum");
    let qTotal = window.localStorage.getItem("qTotal");
    let array = window.localStorage.getItem("scoreBoard");
    
    console.log(
      "----------------------------------------" + "\n" +
      "Score - " + score + "\n" +
      "qNum - " + qNum + "\n" +
      "qTotal - " + qTotal + "\n" +
      "scoreBoard - " + array + "\n" +
      "----------------------------------------" + "\n"
    );
  }
});