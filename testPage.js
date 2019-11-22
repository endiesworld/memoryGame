'use strict';
/*

const max = function() {
console.log(arguments instanceof Array);
var longest = '';
for (var i=0; i < arguments.length; i++) {
    if (arguments[i].length > longest.length) {
      longest = arguments[i];
    }
  }
  return longest;
};
console.log(max([2, 1, 7, 4] ));
*/


window.onload = function(){

 let button = document.getElementById("button1");
 button.addEventListener("click", buttonClicked) ;

} ;

const checkOperation = {operation:"hidden"}  ;

function buttonClicked(){
  if(checkOperation.operation === "visible"){
    checkOperation.operation = hideElement() ;
  }
 else if(checkOperation.operation === "hidden"){
      checkOperation.operation = showElement() ;
    }
} ;

const showElement = function (){
  document.getElementById("testContainer").style.visibility = "visible" ;
  document.getElementById("testContainer").style.height = "300px" ;
  return "visible" ;
} ;

const hideElement = function (){
  document.getElementById("testContainer").style.height = "0px" ;
  document.getElementById("testContainer").style.visibility = "hidden" ;
  return "hidden" ;
} ;

