window.onload = function () {
  let sec = 0;
  let min = 0;
  let hour = 0;
  const state = {
    firstClick: false,
    trial: 0,
  };

  const box = document.querySelectorAll('.container');
  for (let x = 0; x < box.length; x += 1) {
    box[x].addEventListener('click', processClick);
  }

  const imageArray = ["url('austin.jpg')", "url('amara.jpg')", "url('brown.jpg')", "url('chi.jpg')", "url('chizzy.jpg')", "url('dubem.jpg')", "url('fav.jpg')", "url('parents.JPG')", "url('parents2.jpg')", "url('ugo.jpg')"];
  const imageValue = [];
  const documentNode = [];
  const openedNode = [];
  let treat = true;
  const angle = 180;
  loadImage();

  const formatTime = time => (time.toString().length === 1 ? `0${time}` : time);

  const increaseMin = () => {
    min += 1;

    if (min > 59) {
      min = 0;
      hour += 1;
    }
  };

  const showTime = () => {
    sec += 1;

    if (sec > 59) {
      sec = 0;
      increaseMin();
    }

    document.getElementById('time').innerHTML = `${formatTime(hour)}:${formatTime(min)}:${formatTime(sec)}`;
  };

  function processClick(event) {
    if (treat) {
      state.trial += 1;

      onFirstClick();
      event.target.parentNode.style.transform = `rotateY(${angle}deg` + ')';

      if (storeDocument(event)) {
        const imageValue = extractImageValue(event);
        storeImageValue(imageValue);

        if (state.trial === 3) {
          compareImage();
        }
      }
    }
  }

  const onFirstClick = () => {
    if (state.firstClick === false) {
      setInterval(showTime, 1000);
      state.firstClick = true;
    }
  };

  function storeDocument(event) {
    const node = event.target.parentNode;
    const internalControl = !openedNode.includes(node);

    if (internalControl && state.trial === 1) {
      documentNode[0] = node;
      return true;
    } if (internalControl && state.trial === 2 && (documentNode[0] !== node)) {
      documentNode[1] = node;
      return true;
    } if (internalControl && state.trial === 3 && (documentNode[1] !== node) && (documentNode[0] !== node)) {
      documentNode[2] = node;
      treat = false;
      return true;
    }

    state.trial -= 1;
    return false;
  }

  const extractImageValue = (event) => {
    const parentId = document.getElementById(event.target.id).parentElement.id;
    const childId = document.getElementById(parentId).firstElementChild.id;
    return document.getElementById(childId).style.backgroundImage;
  };

  const storeImageValue = (value) => {
    imageValue[state.trial - 1] = value;
  };

  function compareImage() {
    if (imageValue[0] === imageValue[1]) {
      storeNode();
      return;
    }

    closeImage();
  }

  function storeNode() {
    const thirdImage = imageValue[2];
    const thirdNode = documentNode[2];
    state.trial = 1;
    setTimeout(() => { treat = true; }, 500);
    openedNode.push(documentNode[0]);
    openedNode.push(documentNode[1]);
    imageValue[0] = thirdImage;
    documentNode[0] = thirdNode;
    for (let x = 1; x < 3; x += 1) {
      imageValue[x] = 0;
      documentNode[x] = 0;
    }
  }

  function closeImage() {
    setTimeout(() => {
      for (let x = 0; x < 3; x += 1) {
        documentNode[x].style.transform = 'rotateY(360deg)';
        documentNode[x] = 0;
        imageValue[x] = 0;
      }
      treat = true;
    }, 1000);
    state.trial = 0;
  }

  function loadImage() {
    let documentNumber;
    const documentHolder = [];
    let imageNumber;
    const imageHolder = [];
    let multipleImage = [];
    let proceedDocument = true;
    let proceedImage = true;
    const parent = document.getElementsByClassName('front');
    for (let x = 0; x < 20; x += 1) {
      do {
        documentNumber = randomNumber();
        for (const data in documentHolder) {
          if (documentHolder[data] === documentNumber) {
            proceedDocument = false;
            break;
          } else {
            proceedDocument = true;
          }
        }
      } while (!proceedDocument) ;
      documentHolder[x] = documentNumber;
    }
    for (let x = 0; x < 10; x += 1) {
      do {
        imageNumber = randomImage();
        for (const data in imageHolder) {
          if (imageHolder[data] === imageNumber) {
            proceedImage = false;
            break;
          } else {
            proceedImage = true;
          }
        }
      } while (!proceedImage) ;
      imageHolder[x] = imageNumber;
      multipleImage = imageHolder.concat(imageHolder);
    }
    for (let x = 0; x < 20; x += 1) parent[documentHolder[x]].style.backgroundImage = imageArray[multipleImage[x]];
  }

  function randomNumber() {
    return Math.floor(Math.random() * 20);
  }

  function randomImage() {
    return Math.floor(Math.random() * 10);
  }
};
