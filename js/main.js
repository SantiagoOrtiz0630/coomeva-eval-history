//PROGRESS BAR
let progressBar = document.getElementsByClassName("App-bar")[0];

let colors = {
  green: "#8DC63F",
  lightGreen: "#E4F4CD",
  lightOrange: "#FFF0E6",
  orange: "#F47A20",
  white: "#FDFDFF"
}

let bar = new ProgressBar.Line(progressBar, {
  strokeWidth: 5,
  easing: 'easeInOut',
  duration: 1000,
  color: colors.orange,
  trailColor: colors.lightOrange,
  trailWidth: 5,
  svgStyle: {
    width: '100%',
    height: '100%'
  }
});

//BTN RESULT
let btn_repeat = document.getElementsByClassName("App-repeat")[0];
let btn_finish = document.getElementsByClassName("App-finish")[0];

btn_repeat.addEventListener("click", () => {
  location.reload();
});

btn_finish.addEventListener("click", () => {
  //CANT CLOSE WINDOW
  toastr.info("Ya puedes cerrar la pestaña");
});

//RESULT
let timeContainer = document.getElementsByClassName("App-timeContainer")[0];
let calificationContainer = document.getElementsByClassName("App-calificationContainer")[0];
let mistakeContainer = document.getElementsByClassName("App-mistakeContainer")[0];

let feedBackList = document.getElementsByClassName("App-feedbackList")[0];
let feedBackEmoji = document.getElementsByClassName("App-emojiContent")[0];

let timeBar = new ProgressBar.Circle(timeContainer, {
  color: colors.green,
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 9,
  trailWidth: 9,
  trailColor: colors.white,
  easing: 'easeInOut',
  duration: 500,
  svgStyle: null,
  text: {
    autoStyleContainer: false
  }
});

timeBar.animate(0);

let calificationBar = new ProgressBar.Circle(calificationContainer, {
  color: colors.orange,
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 9,
  trailWidth: 9,
  trailColor: colors.white,
  easing: 'easeInOut',
  duration: 500,
  svgStyle: null,
  text: {
    autoStyleContainer: false
  }
});

calificationBar.animate(0);

let mistakeBar = new ProgressBar.Circle(mistakeContainer, {
  color: colors.orange,
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 9,
  trailWidth: 9,
  trailColor: colors.white,
  easing: 'easeInOut',
  duration: 500,
  svgStyle: null,
  text: {
    autoStyleContainer: false
  }
});

mistakeBar.animate(0);

//CONTEXT DATA
var mySwiperRight = new Swiper('.App-right', {
  fadeEffect: {
    crossFade: true
  },
  effect: 'fade',
  direction: 'vertical',
  allowTouchMove: false
});

//SWIPER INSTRU
let btn_InstruPrev = document.getElementsByClassName("App-btnInstruPrev")[0];
let btn_InstruNext = document.getElementsByClassName("App-btnInstruNext")[0];
let btn_InstruPag = document.getElementsByClassName("App-instruPagIndex")[0];

var mySwiperInstru = new Swiper('.App-instruSwiper', {
  fadeEffect: {
    crossFade: true
  },
  spaceBetween: 40,
  slidesPerView: 'auto',
  centeredSlides: true,
  allowTouchMove: false
});

btn_InstruPrev.addEventListener("click", () => {
  mySwiperInstru.slidePrev(500);
});

btn_InstruNext.addEventListener("click", () => {
  mySwiperInstru.slideNext(500);
});

//DASHBOARD
let btn_Instru = document.getElementById("App-toInstru");
let btn_Help = document.getElementsByClassName("App-ayuda")[0];
let btn_Activity = document.getElementById("App-toActivity");
let btn_Result = document.getElementById("App-toResult");

btn_Instru.addEventListener("click", () => {
  SetSlideIndex(0);
});

btn_Help.addEventListener("click", () => {
  SetSlideIndex(0);
});

btn_Activity.addEventListener("click", () => {
  SetSlideIndex(1);
});

btn_Result.addEventListener("click", () => {

  if (btn_Result.classList[0] === "App-option-disabled") {
    return;
  }

  SetSlideIndex(2);
});

//DRAGGABLE
let optionListContainer = document.getElementsByClassName("App-optionList")[0];
let dataRead;
let groupList = "main";
let optionList = null;
let categoryList = [];

let errorList = [];
let answerState = [];

let activityContainer = document.getElementsByClassName("App-slideActivity")[0];

$.getJSON("../data.json", (data) => {
  dataRead = data;

  console.log("Json options readed: ", dataRead);

  SetOptionList();

  error_score = data.error_score;

  updateScore(score);
});

function SetOptionList() {
  optionList = Sortable.create(optionListContainer, {
    animation: 150,
    ghostClass: 'App-activityOption-ghost',
    group: groupList,
    fallbackOnBody: true,
    onAdd: function (evt) {
      //console.log("Reset ", evt.item);

      //Reset Color
      evt.item.setAttribute("class", "App-activityOption");
    },
    // Element is removed from the list into another list
    onRemove: function (evt) {
      //console.log("Taked ", evt.item);
    }
  });

  for (let index = 0; index < dataRead.options.length; index++) {
    const e = dataRead.options[index];
    AddItemOption(e);
  }

  for (let index = 0; index < dataRead.categories.length; index++) {
    const e = dataRead.categories[index];
    AddItemCategory(e);
  }
}

function AddItemOption(data) {
  let item = document.createElement("p");
  item.setAttribute("class", "App-activityOption");

  let id = document.createElement("h5");
  let topic_id = document.createElement("h5");
  let topic = document.createElement("h5");
  let unit = document.createElement("h5");

  id.setAttribute("class", "App-activityOptionId");
  topic_id.setAttribute("class", "App-activityOptionTopicId");
  topic.setAttribute("class", "App-activityTopic");
  unit.setAttribute("class", "App-activityUnit");

  item.innerHTML = data.data;

  id.innerHTML = data.id;
  topic_id.innerHTML = data.topic_id;
  topic.innerHTML = data.topic;
  unit.innerHTML = data.unit;

  item.appendChild(id);
  item.appendChild(topic_id);
  item.appendChild(topic);
  item.appendChild(unit);

  optionListContainer.appendChild(item);
}

function AddItemCategory(data) {
  let cat = document.createElement("div");
  let catTop = document.createElement("div");
  let catSort = document.createElement("div");

  cat.setAttribute("class", "App-list");
  catTop.setAttribute("class", "App-listTop");
  catSort.setAttribute("class", "App-listSortable");

  catTop.style.backgroundImage = `url('../src/img/category/${data.id}.png')`;

  catTop.innerHTML = data.title;

  cat.appendChild(catTop);
  cat.appendChild(catSort);

  categoryList[data.id] = Sortable.create(catSort, {
    animation: 150,
    ghostClass: 'App-activityOption-ghost',
    group: groupList,
    fallbackOnBody: true,
    onAdd: function (evt) {
      //console.log("Added to Category " +  data.title, evt.item);

      if (ValidateItemCategory(data, evt.item)) {
        evt.item.setAttribute("class", "App-activityOption-correct");

        answerState[data.id] = true;

        validateActivityState();
      } else {
        evt.item.setAttribute("class", "App-activityOption-mistake");

        let item_topic_id = evt.item.getElementsByClassName("App-activityOptionTopicId")[0].innerHTML;
        let item_topic = evt.item.getElementsByClassName("App-activityTopic")[0].innerHTML;
        let item_unit = evt.item.getElementsByClassName("App-activityUnit")[0].innerHTML;
        let item_id = evt.item.getElementsByClassName("App-activityOptionId")[0].innerHTML;
        let item_data = evt.item.innerHTML;

        let error = {
          id: item_id,
          unit: item_unit,
          topic: item_topic
        }

        toastr.error("Has cometido un error");

        errorList.push(error);

        score -= error_score;
        updateScore(score);
      }

    },
    // Element is removed from the list into another list
    onRemove: function (evt) {
      //console.log("Removed to Category " +  data.title, evt.item);

      if (ValidateItemCategory(data, evt.item)) {
        answerState[data.id] = false;
      }
    }
  });

  activityContainer.appendChild(cat);

  answerState[data.id] = false;
}

function ValidateItemCategory(category, item) {

  if (!item) {
    return false;
  }

  let item_topic_id = item.getElementsByClassName("App-activityOptionTopicId")[0].innerHTML;

  if (category.id == item_topic_id) {
    return true;
  }

  return false;
}

//////SWIPER//////
let indexSlide = 0;

var mySwiper = new Swiper('.App-centerContainer', {
  fadeEffect: {
    crossFade: true
  },
  direction: 'vertical',
  allowTouchMove: false
});

//////SLIDES//////
mySwiper.on('slideChangeTransitionEnd', OnSlideChange);

function OnSlideChange() {
  //console.log("Slide Index Changed to: " + mySwiper.realIndex);

  switch (mySwiper.realIndex) {
    default:
      break;
      //if the swiper is in the 1th slide
    case 0:

      break;
      //if the swiper is in the 2th slide
    case 1:

      break;
      //if the swiper is in the 3th slide
    case 2:

      break;
  }

  indexSlide = mySwiper.realIndex;
}

function SetSlideIndex(value) {
  indexSlide = value;
  mySwiper.slideTo(indexSlide, 500);
  mySwiperRight.slideTo(indexSlide, 500);
  //mySwiper.slideTo(indexSlide, 500, runCallbacks);
}

//////KME360, SCORM API//////

let score = 100;
let error_score = null;

function updateScore(data) {

  if (score <= 0) {
    score = 0;
  }

  let value = score / 100;

  bar.animate(value);
  calificationBar.animate(value);

  let title1 = document.getElementsByClassName("App-viewCalification")[0];
  let title2 = document.getElementsByClassName("App-calificationValue")[0];

  title2.classList.add("App-orangeText");

  title1.innerHTML = score + "%";
  title2.innerHTML = score;
}

function validateActivityState() {
  let activityFinished = true;

  for (let index = 0; index < answerState.length; index++) {
    const element = answerState[index];

    if (!element) {
      activityFinished = false;
      break;
    }
  }

  if (activityFinished) {
    //ACTIVIDAD ACABADA

    toastr.info("Actividad terminada");

    btn_Result.classList.remove("App-option-disabled");
    btn_Result.classList.add("App-option");

    for (let index = 0; index < categoryList.length; index++) {
      const element = categoryList[index];
      element.destroy();
    }

    ScormProcessFinish();

    SetSlideIndex(2);

    console.log("Actividad Acabada");
  }
}

function updateTimeValue(value) {

  let timeValue = document.getElementsByClassName("App-timeValue")[0];
  timeValue.innerHTML = value;

  timeValue.classList.add("App-greenText");

  timeBar.animate(1.0);
}

function updateMistakeValue(value) {

  let mistakeValue = document.getElementsByClassName("App-mistakeValue")[0];

  mistakeValue.innerHTML = value;

  mistakeValue.classList.add("App-orangeText");

  mistakeBar.animate(1.0);
}

function AddFeedBack() {

  AddEmojiFeedBack(score);

  function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  if (errorList.length > 0) {

    var uniqueArray = removeDuplicates(errorList, "id");

    for (let index = 0; index < uniqueArray.length; index++) {
      const element = uniqueArray[index];
      AddFeedBackItem(element);
    }

    console.log("uniqueArray is: ", uniqueArray);
  } else {
    AddFeedBackEmpty();
  }
}

function AddFeedBackItem(data) {
  let item = document.createElement("div");
  item.setAttribute("class", "App-feedbackItem");

  let p1 = document.createElement("p");
  let p2 = document.createElement("p");

  p1.innerHTML = "Te equivocaste sobre ";
  p2.innerHTML = "Puedes repasar sobre esto en la ";

  let strong1 = document.createElement("strong");
  let strong2 = document.createElement("strong");

  strong1.innerHTML = data.topic;
  strong2.innerHTML = data.unit;

  p1.appendChild(strong1);
  p2.appendChild(strong2);

  item.appendChild(p1);
  item.appendChild(p2);

  feedBackList.appendChild(item);
}

function AddFeedBackEmpty(data) {
  let item = document.createElement("div");
  item.setAttribute("class", "App-feedbackItem");

  let p1 = document.createElement("p");
  p1.innerHTML = "Parece que has terminado esta prueba sin errores ";

  let strong1 = document.createElement("strong");

  strong1.innerHTML = "¡Felicidades!";

  p1.appendChild(strong1);

  item.appendChild(p1);

  feedBackList.appendChild(item);
}

function AddEmojiFeedBack(data){

  let img = feedBackEmoji.children[0];
  let text = feedBackEmoji.children[1];

  if(data >= dataRead.score_limits[0] && data < dataRead.score_limits[1]){
    img.src = `./src/img/emoji/${dataRead.emojiResult[0].id}.png`;
    text.innerHTML = dataRead.emojiResult[0].data;
  }

  if(data >= dataRead.score_limits[1] && data < dataRead.score_limits[2]){
    img.src = `./src/img/emoji/${dataRead.emojiResult[1].id}.png`;
    text.innerHTML = dataRead.emojiResult[1].data;

  }

  if(data >= dataRead.score_limits[2] && data < dataRead.score_limits[3]){
    img.src = `./src/img/emoji/${dataRead.emojiResult[2].id}.png`;
    text.innerHTML = dataRead.emojiResult[2].data;

  }

  if(data >= dataRead.score_limits[3]){
    img.src = `./src/img/emoji/${dataRead.emojiResult[3].id}.png`;
    text.innerHTML = dataRead.emojiResult[3].data;
  }
}

//Include the standard ADL-supplied API discovery algorithm

///////////////////////////////////////////
//Begin ADL-provided API discovery algorithm
///////////////////////////////////////////
var findAPITries = 0;

function findAPI(win) {
  // Check to see if the window (win) contains the API
  // if the window (win) does not contain the API and
  // the window (win) has a parent window and the parent window
  // is not the same as the window (win)
  while ((win.API == null) &&
    (win.parent != null) &&
    (win.parent != win)) {
    // increment the number of findAPITries
    findAPITries++;

    // Note: 7 is an arbitrary number, but should be more than sufficient
    if (findAPITries > 7) {
      alert("Error finding API -- too deeply nested.");
      return null;
    }

    // set the variable that represents the window being
    // being searched to be the parent of the current window
    // then search for the API again
    win = win.parent;
  }
  return win.API;
}

function getAPI() {
  // start by looking for the API in the current window
  var theAPI = findAPI(window);

  // if the API is null (could not be found in the current window)
  // and the current window has an opener window
  if ((theAPI == null) &&
    (window.opener != null) &&
    (typeof (window.opener) != "undefined")) {
    // try to find the API in the current window’s opener
    theAPI = findAPI(window.opener);
  }
  // if the API has not been found
  if (theAPI == null) {
    // Alert the user that the API Adapter could not be found
    alert("Unable to find an API adapter");
  }
  return theAPI;
}

function setValue(n, v) {
  var s = API.LMSSetValue(n, v);
  API.LMSCommit("");
  return s;
}

function getValue(n) {
  var s = API.LMSGetValue(n);
  return s;
}

///////////////////////////////////////////
//End ADL-provided API discovery algorithm
///////////////////////////////////////////

//Create function handlers for the loading and unloading of the page

//Constants
var SCORM_TRUE = "true";
var SCORM_FALSE = "false";
var SCORM_MAX_SCORE = 100;
var SCORM_MIN_SCORE = 0;

//Since the Unload handler will be called twice, from both the onunload
//and onbeforeunload events, ensure that we only call LMSFinish once.
var finishCalled = false;

//Track whether or not we successfully initialized.
var initialized = false;

var API = null;

var initialTime = new Date();

function ScormProcessInitialize() {
  var result;

  API = getAPI();

  if (API == null) {
    alert("ERROR - Could not establish a connection with the LMS.\n\nYour results may not be recorded.");
    return;
  }

  result = API.LMSInitialize("");

  if (result == SCORM_FALSE) {
    var errorNumber = API.LMSGetLastError();
    var errorString = API.LMSGetErrorString(errorNumber);
    var diagnostic = API.LMSGetDiagnostic(errorNumber);

    var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

    alert("Error - Could not initialize communication with the LMS.\n\nYour results may not be recorded.\n\n" + errorDescription);
    return;
  }

  console.log("Iniciado KME");

  initialized = true;
}

function ScormProcessFinish() {

  var result;

  let finishTime = new Date();

  let timeTaken = Math.abs(finishTime.getSeconds() - initialTime.getSeconds());

  updateTimeValue(timeTaken);
  updateMistakeValue(errorList.length);
  AddFeedBack();

  //Don't terminate if we haven't initialized or if we've already terminated
  if (initialized == false || finishCalled == true) {
    return;
  }

  score = GetLMSScore(userScore);

  if (typeof (score) === "number") {

    let actualScoreKMme = getValue("cmi.core.score.raw");
    console.log("Nota Anterior", actualScoreKMme, ", Nueva Nota", score);

    if (actualScoreKMme <= score) {
      setValue("cmi.core.score.raw", score);
    } else {
      console.log("Se deja la anterior calificación por ser más alta");
    }

  }

  setValue("cmi.core.lesson_status", "completed");
  /*setValue("cmi.core.lesson_status", "incomplete");*/

  result = API.LMSFinish("");

  finishCalled = true;

  if (result == SCORM_FALSE) {
    var errorNumber = API.LMSGetLastError();
    var errorString = API.LMSGetErrorString(errorNumber);
    var diagnostic = API.LMSGetDiagnostic(errorNumber);

    var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

    alert("Error - Could not terminate communication with the LMS.\n\nYour results may not be recorded.\n\n" + errorDescription);
    return;
  }
}

/*
Assign the processing functions to the page's load and unload
events. The onbeforeunload event is included because it can be 
more reliable than the onunload event and we want to make sure 
that Terminate is ALWAYS called.
*/

/*
window.onload = ScormProcessInitialize;
window.onunload = ScormProcessFinish;
window.onbeforeunload = ScormProcessFinish;
*/