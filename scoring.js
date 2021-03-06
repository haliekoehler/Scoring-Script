 $(document).ready(function() {
 
  // Variables ---------------------------------------------------
  const storage = window.localStorage;
  const url = window.location.href;
  const path = window.location.pathname;
  const totalQuestions = 11;
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
    let qTotal = total;
    reset(qTotal);

    // create scoreboard
    let array = [];

    for (let i = 0; i < qTotal; i++){
      array.push(
        {
          "qNum": i+1, 
          "point": false,
        }
      );
    }

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
    const messageText = $("#score-message");
    const scoreText = $("#score-text");
    const levelText = $("#level-text");

    let precentage = parseInt((score * 100) / total);
    if (precentage < 10) {
      precentage = 10;
    }

    if (window.location.pathname.indexOf("team/score") > -1 ) {
      // TEAM message by precentage
      if(precentage <= 30){
        messageText.text("Based on your answers, it sounds like the last two years haven't been very challenging for your team. We???re here to support you.");
        levelText.text("Not challenging").addClass("text-success");
      } else if((precentage > 30) && (precentage <=70)){
        messageText.text("Based on your answers, it sounds like the last two years have been challenging for your team. We???re here to support you.");
        levelText.text("Challenging").addClass("text-warning");
      } else if(precentage > 70){
        messageText.text("Based on your answers, it sounds like the last two years have been very challenging for your team. We???re here to support you.");
        levelText.text("Very challenging").addClass("text-danger");
      }
    } else {
      // INDIVIDUAL message by precentage
      if(precentage <= 30){
        messageText.text("Based on your answers, it sounds like the last two years haven't been very challenging. We???re here to support you.");
        levelText.text("Not challenging").addClass("text-success");
      } else if((precentage > 30) && (precentage <=70)){
        messageText.text("Based on your answers, it sounds like the last two years have been challenging. We???re here to support you.");
        levelText.text("Challenging").addClass("text-warning");
      } else if(precentage > 70){
        messageText.text("Based on your answers, it sounds like the last two years have been very challenging. We???re here to support you.");
        levelText.text("Very challenging").addClass("text-danger");;
      }
    }

    

    // scoreText.text(precentage +"%");
    
    // determine colors by precetage
    if (precentage) {
      let goodWidth;
      let okWidth;
      let badWidth;

      if (precentage > 30) {
        goodWidth = "30%";
        $(good).css("width", goodWidth);
      } else if (precentage <= 30){
        goodWidth = (precentage + "%");
        $(good).css("width", goodWidth);
      }

      // fill ok range
      if(precentage > 70){
        okWidth = "40%";
        $(ok).css("width", okWidth);
      } else if ((precentage <= 70) && (precentage > 30)){
        okWidth = precentage - 30;
        okWidth = (okWidth + "%");
        $(ok).css("width", okWidth);
      }

      // fill bad range
      if (precentage > 70){
        badWidth = precentage - 70;
        badWidth = (badWidth + "%");
        $(bad).css("width", badWidth);
      }
    }
  
  };
  
  function display () {
    let output = JSON.stringify(storage); 
    let score = window.localStorage.getItem("score");
    let qNum = window.localStorage.getItem("qNum");
    let qTotal = window.localStorage.getItem("qTotal");
    let array = window.localStorage.getItem("scoreBoard");
    
    console.log(
      "----------------------------------------" + "\n" +
     // "Score - " + score + "\n" +
     // "qNum - " + qNum + "\n" +
     // "qTotal - " + qTotal + "\n" +
      "scoreBoard - " + array + "\n" +
      "----------------------------------------" + "\n"
    );
  }
});