/* globals $*/
var main = function() {
    "use strict";
    var score=0,
    activeQuestion=-1,
    activeQuestionAnswered=0,
    percentage=0;

  
    $('p.btn').click(function(){
    	console.log("coming to quiz.js");
    	$('div.intro.active').removeClass('active').addClass(' inactive');
    	activeQuestion=0;
    	for(var i=1;i<7;i++){

    	doSetTimeOut(i);
    	
    	
    	}
    });
    function doSetTimeOut(i){

    	setTimeout(function(){
    		$('div.question.unanswered').removeClass('active').addClass('inactive');
    		$('div.question.answered').removeClass('active').addClass('inactive');
    		$('div#'+i+'.question.unanswered').removeClass('inactive').addClass('active');
    		$('h2#label').css('visibility','visible');
    		
    		if(i==6){
    			$('h2#label').css('visibility','hidden');
    			$('div.score').css('visibility','hidden');
    			$('div.results').addClass('active');
    			$('div.results p').text("You have "+ score+" points");
    		}
    		$('div').on('click','p.ans',function(){
    		console.log($(this).text()+" "+$('div#'+i+'.answer').text());
    		if($(this).text()===$('div#'+i+'.answer').text()){
    			$(this).addClass('correct');
    			$('div#'+i+'.question.unanswered.active').removeClass('unanswered').addClass('answered');
    			score+=5;
    			$('div.score').text(score);
    		}
    		else{
    			$(this).addClass('selected');
    			$('div#'+i+'.question.unanswered.active').removeClass('unanswered').addClass('answered');
    			$('div.score').text(score);
    		}
    	});
    		
    		 },i*5000);
    }

 /* $('div.results').on('click','div.btn',function(){

  });
*/
    }; //end of main function

$(document).ready(main);
function selectedanswer(answer,selected){
	console.log("answer:"+answer+"selected:"+selected);
}
$('div.question.unanswered').click(function(){
	$("div.question.unanswered").addClass('inactive');
	$(this).addClass('active');
});

