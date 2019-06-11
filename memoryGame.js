window.onload = function (){

  let firstClick = false ;
  let box = document.querySelectorAll(".container");

  for(let x = 0 ; x< box.length ; x++){
  box[x].addEventListener("click", processClick) ;
//  box[x].removeEventListener("click", processClick) ;
  }

  let imageArray = [] ;
  let imageValue = [] ;
  let documentNode = [] ;
  let openedNode = [] ;
  let proceed = false ;
  let treat = true ;
  generateImage() ;
  loadImage() ;
  let trial = 0 ;
  let angle = 180 ;
  let showTime = document.getElementById("time") ;
  let sec = 0 ;
  let realSec = 0 ;
  let min = 0 ;
  let realMin = 0 ;
  let hour = 0 ;
  let realHour = 0 ;
  let realTime = 0 ;
  var timming ;
  let numberOfClicks = 0 ;
  function timerStop(){
  initializeTimer() ;
  clearInterval(timming) ;
}

 function timerStart(){
  timming = setInterval(second , 1000);
}

  function second(){
   sec++ ;
   if (sec > 59){
     sec = 0 ;
     increaseMin() ;
   }
   realSec = sec.toString() ;
   realMin = min.toString() ;
   realHour = hour.toString() ;
   if (realSec.length === 1)
       realSec =  "0"+sec ;
  if (realMin.length === 1)
      realMin =  "0"+ min ;
  if (realHour.length === 1)
      realHour =  "0"+ hour ;
   realTime = realHour + ":" +realMin + ":" + realSec ;
   showTime.innerHTML = realTime;
 }

  function increaseMin() {
   min++ ;
   if (min > 59){
      min = 0 ;
      increaseHour() ;
     }
 }

  function increaseHour() {
   hour++ ;
  }

  function initializeTimer(){
   sec = 0 ;
   realSec = 0 ;
   min = 0 ;
   realMin = 0 ;
   hour = 0 ;
   realHour = 0 ;
   realTime = 0 ;
}

function processClick(){
  console.log(" Document clicked on: " + event.target.id) ;
  if (treat){
  trial++ ;
  console.log("trial number is  " + trial) ;
  firstClickCheck() ;
  rotateTile() ;
  proceed =  storeDocument() ;
  if (proceed){
  extractImageValue() ;
    }
  }
}

function rotateTile() {
  let rotate = "rotateY(" + angle + "deg" + ")" ;
  event.target.parentNode.style.transform = rotate;
}

function firstClickCheck(){
   if(firstClick == false){
     timerStart();
     firstClick = true ;
   }
}

 function storeDocument() {
   let node = event.target.parentNode ;
   let toProceed = false ;
   let internalControl = true ;
   for (data in openedNode){
     if (openedNode[data] == node){
       internalControl = false ;
       break ;
     }
   }
   if (internalControl && trial === 1){
     documentNode[0] = node ;
     toProceed = true ;
     }
   else if (internalControl && trial === 2 && ( documentNode[0] != node ) ){
     documentNode[1] = node ;
     toProceed = true ;

         }
   else if ( internalControl && trial === 3 && ( documentNode[1] != node ) && ( documentNode[0] != node ) ){
      documentNode[2] = node ;
       toProceed = true ;
       treat = false ;
       console.log("the value for treat is : " + treat) ;
            }
  else {
   trial-- ;
   toProceed = false ;
   }
 return toProceed ;
 }

function extractImageValue(){
   let y ;
   let z ;
   y = event.target.id;
   z = document.getElementById(y).parentElement.id ;
   z = document.getElementById(z).firstElementChild.id ;
   y = document.getElementById(z).style.backgroundImage ;
   storeImageValue(y) ;
}

function storeImageValue(value ){
  if (trial  === 1){
    imageValue[0] = value ;
    }
 if (trial === 2){
    imageValue[1] = value ;
     }
  if (trial === 3){
     imageValue[2] = value ;
     compareImage();
   }
}

function compareImage(){

  if (imageValue[0] == imageValue[1])
    storeNode() ;
  else
    closeImage() ;
}

function storeNode(){
  let thirdImage = imageValue[2] ;
  let thirdNode =  documentNode[2] ;
  trial = 1 ;
  //
  setTimeout( function(){ treat = true ;} , 500 ) ;
  openedNode.push(documentNode[0]) ;
  openedNode.push(documentNode[1]) ;
  imageValue[0] = thirdImage  ;
  documentNode[0] = thirdNode ;
  for(let x = 1 ; x<3 ; x++) {
  imageValue[x] = 0 ;
  documentNode[x] = 0;
  }

}

function closeImage(){
  setTimeout( function(){
  for(let x = 0 ; x<3 ; x++) {
  documentNode[x].style.transform = "rotateY(360deg)";
  documentNode[x] = 0 ;
  imageValue[x] = 0 ;
}
treat = true ;
}, 1000 ) ;
  trial = 0 ;

}

function generateImage() {
/**
The below forms a new element <img height= 100, width = 100, src = ??
let amara = new Image(100, 100) ;
amara.src = 'amara.jpg' ;
**/
 let name = [] ;
 name[0] = "url('austin.jpg')" ;
 name[1] = "url('amara.jpg')" ;
 name[2] = "url('brown.jpg')" ;
 name[3] = "url('chi.jpg')" ;
 name[4] = "url('chizzy.jpg')" ;
 name[5] = "url('dubem.jpg')" ;
 name[6] = "url('fav.jpg')" ;
 name[7] = "url('parents.JPG')" ;
 name[8] = "url('parents2.jpg')" ;
 name[9]  = "url('ugo.jpg')" ;
for(x in name)
  imageArray.push(name[x]);
}

function loadImage(){
let documentNumber ;
let documentHolder = [] ;
let imageNumber ;
let imageHolder = [] ;
let multipleImage = [] ;
let proceedDocument = true ;
let proceedImage = true ;
let parent = document.getElementsByClassName('front') ;
for (let x = 0 ; x < 20 ; x++) {
    do {
    documentNumber = randomNumber() ;
  for (data in documentHolder){
     if(documentHolder[data] === documentNumber){
        proceedDocument = false ;
        break ;
       }
     else {
      proceedDocument = true ;
       }
     }
   } while(!proceedDocument) ;
   documentHolder[x] = documentNumber ;
  }
  console.log("Document numbers used: " + documentHolder) ;
 for (let x = 0 ; x < 10 ; x++) {
   do {
     imageNumber = randomImage() ;
     for (data in imageHolder){
        if(imageHolder[data] === imageNumber){
           proceedImage = false ;
           break ;
          }
        else {
         proceedImage = true ;
          }
        }
      } while(!proceedImage) ;
    imageHolder[x] = imageNumber ;
    multipleImage = imageHolder.concat(imageHolder) ;
}
console.log("Image numbers used: " + multipleImage) ;
for (let x = 0 ; x < 20 ; x++)
   parent[documentHolder[x]].style.backgroundImage =   imageArray[multipleImage[x]] ;

 }

 function randomNumber(){
        let  numberGenerated = Math.floor( Math.random() * 20) ;
        return numberGenerated ;
  }

  function randomImage(){
      let  numberGenerated = Math.floor( Math.random() * 10) ;
      return numberGenerated ;
   }





  }
