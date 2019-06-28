window.onload = function (){

  let box = document.querySelectorAll(".container");
  for(let x = 0 ; x< box.length ; x++){
  box[x].addEventListener("click", processClick) ;
  }
  
  let palyerStat = document.getElementById("userInfo") ;
  let playerName = "palyer"
  let playerTime = 1000;
  let imageArray = [] ;
  let imageValue = [] ;
  let documentNode = [] ;
  let openedNode = [] ;
  const gameState = {proceed: "false" , treat: "true" , angle: 180 , firstClick: false  } ;
  let trial = 0 ;
  let showTime = document.getElementById("time") ;
  let timming ;
  let time = playerTime ;
  let numberOfWins = 0 ;
  const player = {name: playerName, bestTime: playerTime } ;
  updatePlayer() ;
  generateImage() ;
  loadImage() ;

  var timerStop = () => {
  clearInterval(timming) ;
  updatePlayer() ;
  }

function updatePlayer() {
  if (time < playerTime)
        player.bestTime = time ;
  palyerStat.innerHTML = player.name + " best time: " + formatedTime(player.bestTime) ;
}

 var timerStart = () => {
  timming = setInterval(increaseTime , 1000);
}

// Timer code updated
  var increaseTime = () => {
     time++ ;
     writeTime() ;
 }
// Also did some update using string Interpolation
var writeTime = () => {
  let timeToFormat = time
showTime.innerHTML = formatedTime(timeToFormat);
}

function formatedTime(toFormat) {
  let sec2 = (toFormat % 60).toString();
  let min2 = (Math.floor(toFormat / 60)).toString();
  let hour2 =(Math.floor(toFormat / 3600)).toString();
  if (sec2.length === 1)
        sec2 =  `0${sec2}` ;
  if (min2.length === 1)
        min2 =  `0${min2}` ;
  if (hour2.length === 1)
        hour2 =  `0${hour2}` ;
  return  `${hour2}:${min2}:${sec2}`;
}

 function processClick(){
   let y ;
   y = event.target.id;
  if (gameState.treat && y != "stop"){
  trial++ ;
  firstClickCheck() ;
  rotateTile() ;
  if (numberOfWins === 9)
      timerStop() ;
  gameState.proceed =  storeDocument() ;
  if (gameState.proceed){
  extractImageValue() ;
    }
  }
}

var rotateTile = () => {
  let rotate = "rotateY(" + gameState.angle + "deg" + ")" ;
  event.target.parentNode.style.transform = rotate;
}

var firstClickCheck = () =>{
     if(gameState.firstClick == false){
     time = 0 ;
     timerStart() ;
     gameState.firstClick = true ;
   }
}

 var storeDocument = () => {
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
   else if ( internalControl && trial === 3 && ( documentNode[1] != node ) && ( documentNode[0] != node )){
      documentNode[2] = node ;
       toProceed = true ;
       gameState.treat = false ;
  }
  else {
   trial-- ;
   toProceed = false ;
   }
 return toProceed ;
 }


var extractImageValue = () =>{
   let y ;
   let z ;
   y = event.target.id;
   z = document.getElementById(y).parentElement.id ;
   z = document.getElementById(z).firstElementChild.id ;
   y = document.getElementById(z).style.backgroundImage ;
   storeImageValue(y) ;
}

var storeImageValue = (value ) => {
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

var compareImage = ()=>{
  if (imageValue[0] == imageValue[1]){
    storeNode() ;
    numberOfWins++ ;
  }
  else
    closeImage() ;
}

var storeNode = () => {
  let thirdImage = imageValue[2] ;
  let thirdNode =  documentNode[2] ;
  trial = 1 ;
  setTimeout( function(){ gameState.treat = true ;} , 500 ) ;
  openedNode.push(documentNode[0]) ;
  openedNode.push(documentNode[1]) ;
  imageValue[0] = thirdImage  ;
  documentNode[0] = thirdNode ;
  for(let x = 1 ; x<3 ; x++) {
  imageValue[x] = 0 ;
  documentNode[x] = 0;
  }
}

var closeImage = ()=> {
  setTimeout( function(){
  for(let x = 0 ; x<3 ; x++) {
  documentNode[x].style.transform = "rotateY(360deg)";
  documentNode[x] = 0 ;
  imageValue[x] = 0 ;
}
gameState.treat = true ;
}, 1000 ) ;
  trial = 0 ;
}

function generateImage() {
 let name = [] ;
 name[0] = "url('images/austin.jpg')" ;
 name[1] = "url('images/amara.jpg')" ;
 name[2] = "url('images/brown.jpg')" ;
 name[3] = "url('images/chi.jpg')" ;
 name[4] = "url('images/chizzy.jpg')" ;
 name[5] = "url('images/dubem.jpg')" ;
 name[6] = "url('images/fav.jpg')" ;
 name[7] = "url('images/parents.JPG')" ;
 name[8] = "url('images/parents2.jpg')" ;
 name[9]  = "url('images/ugo.jpg')" ;
for(x in name)
  imageArray.push(name[x]);
}

function loadImage() {
   let boxPosition = [] ;
   let boxNumbers = 20 ;
   let imageNumber = 10 ;
   let imageHolder = [] ;
   let multiplyImage = [] ;
   let parent = document.getElementsByClassName('front') ;
   boxPosition = randomWithNoRepete(boxNumbers) ;
   imageHolder = randomWithNoRepete(imageNumber) ;
   multiplyImage = imageHolder.concat(imageHolder) ;
   for (let x = 0 ; x < 20 ; x++)
      parent[boxPosition[x]].style.backgroundImage =   imageArray[multiplyImage[x]] ;
    }
// Random number generator without repetation
  function randomWithNoRepete(size){
    let numberHolder = [] ;
    let  numberGenerated ;
    let saveNumber = true ;
    let limiter = size ;
    size -= 1 ;
    do {
         numberGenerated  = Math.floor( Math.random() * limiter) ;
         for (data in numberHolder){
            if(numberHolder[data] === numberGenerated){
               saveNumber = false ;
               break ;
                  }
             }
             if(saveNumber){
                numberHolder[size] = numberGenerated ;
                size-- ;
             }
            saveNumber = true ;
            } while(size >= 0) ;
     return numberHolder ;
     }

  }
