/* globals $*/
var main = function() {
    "use strict";
    //socket client ID
    var clientId;
    //getting socket client ID from sessionStorage, usually after refreshing the page
    if (sessionStorage.getItem("clientId") === null) {
        clientId = 0;
    } else {
        clientId = sessionStorage.getItem("clientId");
    }

    //Connecting to the socket server
    var socket = io.connect("http://localhost:3000/");

    var score = 0,
        scoreOpponent = 0;

    //the socket events:
    socket.on("connect", function() {
        socket.emit("connected", clientId);
    });

    //when ever someone scores, update the opponent score value:
    socket.on("otherUserResult", function(msg) {
        console.log("A msg from the server: Othe user got true answer!");
        scoreOpponent += 5;
    });

    socket.on("privateMsg", function(data) {
        console.log("A msg from the server: welcome to the room, your client id is: " + data);
        clientId = data;
        sessionStorage.setItem("clientId", clientId);
        console.log(clientId);

    });
    //end of socket events


    $('p.btn').click(function() {
        console.log("coming to quiz.js");
        $('div.intro.active').removeClass('active').addClass(' inactive');

        for (var i = 1; i < 8; i++) {

            doSetTimeOut(i);
        }
    });
    //For displaying quizz questions and score
    function doSetTimeOut(i) {

        setTimeout(function() {
            $('div.question.unanswered').removeClass('active').addClass('inactive');
            $('div.question.answered').removeClass('active').addClass('inactive');
            $('div#' + i + '.question.unanswered').removeClass('inactive').addClass('active');
            $('h2#label').css('visibility', 'visible');

            $('div').one('click', 'p.ans', function() {
                // console.log($(this).text()+"i:"+$('div#'+Math.max(i)+'.answer').text());

                if ($(this).text() === $('div#' + i + '.answer').text()) {
                    $(this).addClass('correct');
                    $('div#' + i + '.question.unanswered.active').removeClass('unanswered').addClass('answered');
                    score += 5;
                    //once the answer is true, emit the result to the server, so the others know that you scored.
                    socket.emit("answer", clientId);

                    $('div.score').text(score);
                    $('div.score2').text(scoreOpponent);
                } else {
                    $(this).addClass('selected');
                    $('div#' + i + '.question.unanswered.active').removeClass('unanswered').addClass('answered');
                    $('div.score').text(score);
                    $('div.score2').text(scoreOpponent);
                }
            });
            if (i == 7) {
                $('h2#label').css('visibility', 'hidden');
                $('div.score').css('visibility', 'hidden');
                $('div.score2').css('visibility', 'hidden');
                $('div.results').addClass('active');
                $('div.results p').text("You have " + score + " points " + "and your opponent's score is " + scoreOpponent);
            }
        }, i * 6000);
    }


}; //end of main function

$(document).ready(main);

$('div.question.unanswered').click(function() {
    $("div.question.unanswered").addClass('inactive');
    $(this).addClass('active');
});