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
    });
   function myfun(index){
  	console.log("calling from outside ready"+index);
  }
    }; //end of main function

$(document).ready(main);
function selectedanswer(answer,selected){
	console.log("answer:"+answer+"selected:"+selected);
}


