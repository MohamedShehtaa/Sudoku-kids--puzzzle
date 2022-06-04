window.addEventListener('load', function () {
  //#region variables
  let myBoard = document.querySelector('.sudokuBoard');
  let myEasyBoard = document.querySelector('.sudokuBoardEasy');
  let level = this.localStorage.getItem('selectValue');
  let imagesContainer = document.querySelector('.images');
  let UserNamePost = document.querySelector('.controlBar h2');
  let UserNameGet = this.localStorage.getItem('userName');
  let imageSrc = JSON.parse(localStorage.getItem('groupImages'));
  let myTimer = document.querySelector('.timer');
  let btnStart = document.querySelector('.controlBar button');
  let myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
  let homeBtn = document.querySelector('.home');
  let replayBtn = document.querySelector('.replay');
  let levelTime = {
    level1: 1,
    level2: 2,
  };
  //#endregion

  // userName Display
  UserNamePost.innerText = `Welcome ${UserNameGet}`;

  //if level Easy the conntent set
  if (level == 'level1') {
    let rowNumber = 4;
    appemdImages(imageSrc, rowNumber, imagesContainer);
    myEasyBoard.style.display = 'flex';
    createBoardEasyLevel(myEasyBoard);
  }

  //if level Hard the conntent set
  if (level == 'level2') {
    let rowNumber = 9;
    appemdImages(imageSrc, rowNumber, imagesContainer);
    myBoard.style.display = 'flex';
    createBoardHardLevel(myBoard);
  }

  //when you press start
  btnStart.addEventListener('click', function (e) {
    if (level == 'level1') {
      let arrowStep = 4;
      counterDown(levelTime['level1'], myTimer, myModal);
      processTheResponseOnEasyLevel(imageSrc, arrowStep, myEasyBoard);
    }
    if (level == 'level2') {
      let arrowStep = 9;

      counterDown(levelTime['level2'], myTimer, myModal);
      processTheResponseOnHardLevel(imageSrc, arrowStep, myBoard);
    }
    btnStart.disabled = true;
  });

  //go home page
  homeBtn.addEventListener('click', () => {
    window.location.href = '../index.html';
  });

  //replay again
  replayBtn.addEventListener('click', () => {
    window.location.href = '../thirdPage/thirdPage.html';
  });
});

// create gridGame 4  * 4
function createBoardEasyLevel(myEasyBoard) {
  let myContainerElement = '';
  let myImg = '';
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      myContainerElement = document.createElement('div');
      myContainerElement.classList.add('easylevel');
      myImg = document.createElement('img');
      myImg.className = 'Easy';
      myImg.id = `${row}${col}`;
      if (row == 1) {
        myContainerElement.classList.add('horizontalLine');
      }
      if (col == 1) {
        myContainerElement.classList.add('verticalLine');
      }

      myContainerElement.append(myImg);
      myEasyBoard.append(myContainerElement);
    }
  }
}

//set initail images 4*4
function setInatialImagesForEasy(initailImages, imageSrc) {
  let containerImages = document.querySelectorAll('.Easy');
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      for (let key in imageSrc) {
        if (key == initailImages[row][col]) {
          containerImages.forEach((img) => {
            if (`${row}${col}` == img.id) {
              img.src = imageSrc[key];
            }
          });
        }
      }
    }
  }
}

//create gridGame  9 * 9
function createBoardHardLevel(myBoard) {
  let myContainerElement = '';
  let myImg = '';
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      myContainerElement = document.createElement('div');
      myContainerElement.classList.add('hardlevel');
      myImg = document.createElement('img');
      myImg.className = 'Hard';
      myImg.id = `${row}${col}`;
      if (row == 2 || row == 5) {
        myContainerElement.classList.add('horizontalLine');
      }
      if (col == 2 || col == 5) {
        myContainerElement.classList.add('verticalLine');
      }
      myContainerElement.append(myImg);
      myBoard.append(myContainerElement);
    }
  }
}

//set initial images 9 * 9
function setInatialImagesForHard(initailImages, imageSrc) {
  let containerImages = document.querySelectorAll('.Hard');
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      for (let key in imageSrc) {
        if (key == initailImages[row][col]) {
          containerImages.forEach((img) => {
            if (`${row}${col}` == img.id) {
              img.src = imageSrc[key];
            }
          });
        }
      }
    }
  }
}

//creation of getting images
function appemdImages(imageSrc, rowNumber, imagesContainer) {
  for (let i = 1; i <= rowNumber; i++) {
    let myContainerDiv = document.createElement('div');
    let myImg = document.createElement('img');
    let myImgLabel = document.createElement('label');
    myImg.src = imageSrc[`${i}`];
    myImgLabel.innerText = `${i}`;
    myContainerDiv.append(myImg);
    myContainerDiv.append(myImgLabel);
    imagesContainer.append(myContainerDiv);
  }
}

//counter
function counterDown(startMinutes, myTimer, myModal) {
  let time = startMinutes * 60;
  let timeID = 0;
  timeID = setInterval(() => {
    let minutes = Math.floor(time / 60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    myTimer.innerHTML = `${minutes}:${seconds}`;
    time--;

    // my Testing on the game
    testAndDisppaly(timeID, myModal, minutes, seconds);
  }, 1000);
}

//display the model and check on board
function testAndDisppaly(timeID, myModal, minutes, seconds) {
  let error = document.querySelector('.errorNumber span').innerText;
  let displayError = document.querySelector('.modal-body');
  let modelTitle = document.querySelector('.modal-title');
  if (minutes == '00' && seconds == '00') {
    clearInterval(timeID);

    if (+error >= '0' || +error <= '10') {
      modelTitle.innerText = `ALMOST !!`;
      displayError.innerText = ` YOU HAVE ONLY ${error} ERROR `;
    } else {
      displayError.innerText = ` YOU HAVE ALMOST REACHED  YOUR ${error} ERRORS `;
      modelTitle.innerText = `OOPS!!`;
    }
    myModal.show();
  } else {
    let arraySetImages = [];
    let myBoard = document.querySelectorAll('.board img');
    myBoard.forEach((img) => {
      if (img.hasAttribute('src')) {
        arraySetImages.push(img);
      }
    });
    if (arraySetImages.length == '16' || arraySetImages.length == '81') {
      modelTitle.innerText = `WELL DONE`;
      displayError.innerText = ` YOU FINISHED BEFORE THE TIME ENDED AND YOUR ${error} ERRORS `;
      clearInterval(timeID);
      myModal.show();
    }
  }
}

//Arrows moves and set images
function moves(myImagesContainerWithNewID, imageSrc, arrowStep, myBoard) {
  let myBoardElements = myImagesContainerWithNewID;
  myBoardElements.forEach((element) => {
    element.setAttribute('tabindex', '0');
  });
  console.log(myBoardElements);
  myBoardElements[0].focus();

  myBoard.addEventListener('keydown', function (e) {
    const focusable = [...myBoardElements];
    let index = focusable.indexOf(document.activeElement);
    let nextIndex = 0;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = index - arrowStep >= 0 ? index - arrowStep : index;
      myBoardElements[nextIndex].focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex =
        index + arrowStep < focusable.length ? index + arrowStep : index;
      myBoardElements[nextIndex].focus();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = index + 1 < focusable.length ? index + 1 : index;
      myBoardElements[nextIndex].focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = index != 0 ? index - 1 : index;
      myBoardElements[nextIndex].focus();
    }

    let Myerror = document.querySelector('.errorNumber span');
    let currentElement = document.activeElement.firstChild;

    if (!currentElement.hasAttribute('src')) {
      for (let i = 1; i <= arrowStep; i++) {
        let count = 0;
        if (e.key == i && currentElement.parentElement.id == e.key) {
          currentElement.src = imageSrc[`${currentElement.parentElement.id}`];
          currentElement.parentElement.classList.remove('error');
          currentElement.parentElement.classList.add('succes');
        } else if (e.key == i) {
          currentElement.parentElement.classList.add('error');
          if (e.isTrusted) {
            count = +Myerror.innerText + 1;
          }
          Myerror.innerText = count;
        }
      }
    }
  });
}

//get rondom images 9 * 9
async function getInitailValuesForHardLevel() {
  let response = await fetch('https://sudoku-api.deta.dev/?type=9');
  let puzzleInital = await response.json();
  return puzzleInital;
}

//get rondom images 4 * 4
async function getInitailValuesForEasyLevel() {
  let response = await fetch('https://sudoku-api.deta.dev/?type=4');
  let puzzleInital = await response.json();
  return puzzleInital;
}
//converting geting array to numbers
function convertStringToArray(stringArray, arrowStep) {
  let myArray = [];
  for (let i = 0; i < arrowStep; i++) {
    let COlArray = [];
    for (let j = 0; j < arrowStep; j++) {
      COlArray.push(stringArray[arrowStep * i + j]);
    }
    myArray.push(COlArray);
  }
  for (let row = 0; row < arrowStep; row++) {
    for (let col = 0; col < arrowStep; col++) {
      if (myArray[row][col] == '.') {
        myArray[row][col] = 0;
      }
      if (myArray[row][col] > 0) {
        myArray[row][col] = +myArray[row][col];
      }
    }
  }
  return myArray;
}

//process on the response of hard level  9 * 9
async function processTheResponseOnHardLevel(imageSrc, arrowStep, myBoard) {
  let result = await getInitailValuesForHardLevel();
  let initailImages = convertStringToArray(result['board'], arrowStep);
  let mySolution = convertStringToArray(result['solution'], arrowStep);
  setInatialImagesForHard(initailImages, imageSrc);
  let myImagesContainerWithNewID = checkSolution(
    mySolution,
    myBoard,
    arrowStep,
  );
  moves(myImagesContainerWithNewID, imageSrc, arrowStep, myBoard);
}

// process on the response of easy level  4 * 4
async function processTheResponseOnEasyLevel(imageSrc, arrowStep, myEasyBoard) {
  let result = await getInitailValuesForEasyLevel();
  let initailImages = convertStringToArray(result['board'], arrowStep);
  let mySolution = convertStringToArray(result['solution'], arrowStep);
  setInatialImagesForEasy(initailImages, imageSrc);
  let myImagesContainerWithNewID = checkSolution(
    mySolution,
    myEasyBoard,
    arrowStep,
  );
  moves(myImagesContainerWithNewID, imageSrc, arrowStep, myEasyBoard);
}

// set solution to board
function checkSolution(solution, board, arrowStep) {
  let boardContainersForImages = [...board.childNodes];
  let myArray = [];
  for (let row = 0; row < arrowStep; row++) {
    for (col = 0; col < arrowStep; col++) {
      myArray.push(solution[row][col]);
    }
  }
  for (let ele = 0; ele < boardContainersForImages.length; ele++) {
    boardContainersForImages[ele].id = myArray[ele];
  }
  return boardContainersForImages;
}
