window.onload = function(){
 window.addEventListener("resize", loadPage) ;
  loadPage() ;
}

function loadPage(){
  loadHeaderElement() ;
   switch (checkScreenSize()) {
    case "mobile":
      mobileScreen() ;
      break;
    case "laptop":
      laptopScreen() ;
      break;
    }
}

function checkScreenSize() {
  let screenSize = screeWidth() ;
  if(screenSize > 750) {
    return "laptop" ;
  }
  return "mobile" ;
}

function screeWidth(){
  return window.innerWidth ;
}

function mobileScreen() {
  mobileNavbar() ;
  loadMobileForm() ;
  }

 function laptopScreen(){
  laptopNavBar() ;
  laptopFromClassAdder() ;
  return ; 
}

function loadHeaderElement() {
  let elementToWriteOn = document.getElementById("writeHere") ;
  const message = "Welcome to Emmanuel Okoro's home Page, your window's width is: " ;
  elementToWriteOn.innerHTML = message + screeWidth() ;
}

function mobileNavbar() {
  divForNavBar().classList.remove("show");
}

function loadMobileForm(){
  let parentTag = groupElement() ;
  let rememberMeDivTag = divForLabelTag() ;
  let buttonTag = submitButtonTag();
  let remeberMeLabel = rememberMeLabelTag();
  mobileClassNameRemover(parentTag, rememberMeDivTag, buttonTag, remeberMeLabel ); 
  mobileClassNameAdder( buttonTag, remeberMeLabel) ;
  
}

function mobileClassNameRemover(parentTag, rememberMeDivTag, buttonTag, remeberMeLabel){
  parentTag.classList.remove("form-row");
  rememberMeDivTag.classList.remove("col") ;
  buttonTag.classList.remove("col-4", "mr-2") ;
  remeberMeLabel.classList.remove("ml-5") ;
}

function mobileClassNameAdder( buttonTag, remeberMeLabel){ 
  if (!buttonTag.classList.contains("signinScaledown")) {
    buttonTag.className += " signinScaledown mx-auto";
  }

  
  if (!remeberMeLabel.classList.contains("ml-3")) {
    remeberMeLabel.className += " ml-3";
  }
}

function laptopNavBar(){
  if(!ckeckClassNameForShow()){
    addShowToNavBar() ;
  }
}

function addShowToNavBar(){
  divForNavBar().className +=" show" ;
}

function ckeckClassNameForShow(){
return document.getElementById("navResponsive").classList.contains("show") ;
}

function laptopFromClassAdder(){
  let parentTag = groupElement() ;
  let rememberMeDivTag = divForLabelTag() ;
  let buttonTag = submitButtonTag();
  let remeberMeLabel = rememberMeLabelTag();
  removeClassNameAddedForMobil(buttonTag, remeberMeLabel);
  if(!parentTag.classList.contains("form-row")){
    formRowAdder() ;
  }
  if (!rememberMeDivTag.classList.contains("col")){
    addClassesToLabelDiv() ;
  }
  if(!buttonTag.classList.contains("col-4")){
    addClassToButten() ;
  }
  if (!remeberMeLabel.classList.contains("ml-5")){
    addClassesToRememberMeLabel();
  }
}

function removeClassNameAddedForMobil(buttonTag, remeberMeLabel){
  buttonTag.classList.remove("signinScaledown", "mx-auto");
  remeberMeLabel.classList.remove("ml-3");
}

function formRowAdder(){
  groupElement().className += " form-row" ;
}

function addClassesToLabelDiv(){
  divForLabelTag().className += " col" ;
  divForLabelTag().classList.remove("ml-4") ;
}

function addClassToButten(){
  submitButtonTag().className += " col-4 mr-2" ;
}

function addClassesToRememberMeLabel(){
  rememberMeLabelTag().className +=" ml-5" ;
}

function divForNavBar(){
  return document.getElementById("navResponsive") ;
}

function groupElement(){
  return document.getElementById("groupDiv") ;
}

function divForLabelTag(){
 return document.getElementById("rememberMeDiv");
}

function submitButtonTag(){
  return document.getElementById("buttonDiv");
}

function rememberMeLabelTag(){
  return document.getElementById("remeberMeLabel");
}

/*
function textWord(word){
  let isPoliven = true ;
  word.toUpperCase() ;
  let backIndex = word.length - 1 ;
  for(let frontIndex = 0 ; frontIndex<word.length ; frontIndex++){
    switch (word[frontIndex].localeCompare(word[backIndex])) {
      case 1:
        isPoliven = false ;
        break;
      }
      backIndex-- ;
  }

  return isPoliven ;
}

console.log(textWord("denevened")) ;
console.log(textWord("adam")) ;
*/