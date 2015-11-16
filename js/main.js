document.addEventListener('DOMContentLoaded', function() {

  document.getElementsByTagName('form')[0].onsubmit = function(evt) {
    evt.preventDefault(); // Preventing the form from submitting
    checkWord(); // Do your magic and check the entered word/sentence
    scrollToBottomOfResults();
    document.getElementById('terminalTextInput').focus();
  }

  // Get the focus to the text input to enter a word right away.
  document.getElementById('terminalTextInput').focus();

  document.getElementById('terminalCont').addEventListener('click', function() {
    document.getElementById('terminalTextInput').focus();
  }, false);

  // Getting the text from the input
  var textInputValue = document.getElementById('terminalTextInput').value.trim();

  var inputHistory    = []
  var currentHistory  = inputHistory.length

  document.onkeydown = checkKey;
  function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
      if(currentHistory <= inputHistory.length && currentHistory > 0){
        currentHistory -= 1;
        document.getElementById('terminalTextInput').value = inputHistory[currentHistory];
      }
    }
    else if (e.keyCode == '40') {
      if(currentHistory < inputHistory.length && currentHistory >= 0){
        currentHistory += 1;
        if(currentHistory == inputHistory.length){
          document.getElementById('terminalTextInput').value = '';
        } else {
          document.getElementById('terminalTextInput').value = inputHistory[currentHistory];
        }
      } else {
        document.getElementById('terminalTextInput').value = '';
      }
    }
  }

  //Getting the text from the results div
  var textResultsValue = document.getElementById('terminalReslutsCont').innerHTML;

  // Clear text input
  var clearInput = function(){
    document.getElementById('terminalTextInput').value = "";
  }

  // Scrtoll to the bottom of the results div
  var scrollToBottomOfResults = function(){
    var terminalResultsDiv = document.getElementById('terminalCont');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }

  // Scroll to the bottom of the results
  scrollToBottomOfResults();

  // Add text to the results div
  var addTextInResults = function(textToAdd){
    document.getElementById('terminalReslutsCont').innerHTML += textToAdd
    scrollToBottomOfResults();
  }

  // Add text to the results div
  var addTextToResults = function(textToAdd){
    addTextInResults("<p><span class='green'>✓</span> " + textToAdd + "</p>");
  }

  // Add text to the results div
  var addFailTextToResults = function(textToAdd){
    addTextInResults("<p><span class='red'>✗</span> " + textToAdd + "</p>");
  }

  // Add text to the results div
  var addUserTextToResults = function(textToAdd){
    addTextInResults("<p class='userEnteredText'><span class='orange'>$</span> " + textToAdd + "</p>");
  }

  // Getting the list of keywords for help & posting it to the screen
  var postHelpList = function(){
    // Array of all the help keywords
    var helpKeyWords = [
      "<b>Here are available commands:</b>",
      "",
      "- <b>Open + website URL</b>    to open it in the browser           (alt: <b>o + website URL</b>)",
      "- <b>Google + keyword</b>      to search directly in Google        (alt: <b>search + keyword</b> and <b>g + keyword</b>)",
      "- <b>YouTube + keyword</b>     to search directly in YouTube       (alt: <b>y + keyword</b>)",
      "- <b>Wikipedia + keyword</b>   to search directly in Wikipedia     (alt: <b>wiki + keyword</b> and <b>w + keyword</b>)",
      "- <b>Facebook + keyword</b>    to search directly in Facebook      (alt: <b>fb + keyword</b> and <b>f + keyword</b>)",
      "- <b>Twitter + keyword</b>     to search directly in Twitter       (alt: <b>t + keyword</b>)",
      "- <b>Github + keyword</b>      to search directly in Github        (alt: <b>git + keyword</b>)",
      "- <b>Translate + words</b>     to translate via Google Translate   (alt: <b>tr + words</b>)",
      "- <b>Hunt</b>                  to browse Producthunt               (alt: <b>ph</b>)",
      "- <b>Gmail</b>                 to browse Gmail                     (alt: <b>gm</b>)",
      "- <b>Time</b>                  will display the current time.      (alt: <b>now</b>)",
      "- <b>Date</b>                  will display the current date.      (alt: <b>today</b>)",
      "- <b>I love you</b>            to spread the love.",
      "",
      "* There are more keywords that you have to discover by yourself."
    ].join('<br>').replace(/ /g, '&nbsp;');
    addTextToResults(helpKeyWords);
  }

  // Getting the time and date and post it depending on what you request for
  var getTimeAndDate = function(postTimeDay){
    var timeAndDate = new Date();
    var timeHours = timeAndDate.getHours();
    var timeMinutes = timeAndDate.getMinutes();
    var dateDay = timeAndDate.getDate();
    console.log(dateDay);
    var dateMonth = timeAndDate.getMonth() + 1; // Because JS starts counting months from 0
    var dateYear = timeAndDate.getFullYear(); // Otherwise we'll get the count like 98,99,100,101...etc.

    if (timeHours < 10){ // if 1 number display 0 before it.
      timeHours = "0" + timeHours;
    }

    if (timeMinutes < 10){ // if 1 number display 0 before it.
      timeMinutes = "0" + timeMinutes;
    }

    var currentTime = timeHours + ":" + timeMinutes;
    var currentDate = dateDay + "/" + dateMonth + "/" + dateYear;

    if (postTimeDay == "date"){
      addTextToResults(currentDate);
    }
    if (postTimeDay == "datetime"){
      addTextToResults(currentDate + ' ' + currentTime);
    }
  }

  // Opening links in a new window
  var openLinkInNewWindow = function(linkToOpen){
    window.open(linkToOpen, '_blank');
    clearInput();
  }

  // Having a specific text reply to specific strings
  var textReplies = function() {
    switch(textInputValueLowerCase){
      case "i love you":
      case "i love u":
      case "love you":
      case "love u":
      case "love":
        clearInput();
        addTextToResults("Ohh! So sweet! I love you too ❤");
        break;

      case "eva":
      case "hello":
      case "hello eva":
      case "hi":
      case "hi eva":
      case "hola":
        clearInput();
        addTextToResults("Hello, I'm Eva, at your service!");
        break;

      case "creator":
      case "by":
        clearInput();
        addTextToResults("Eva's proud father is <a href='http://rdlh.io' target='_blank'>Rémi Delhaye</a>.");
        break;

      case "youtube":
      case "y":
        clearInput();
        addFailTextToResults("Type youtube + something to search for.");
        break;

      case "open":
      case "o":
        clearInput();
        addFailTextToResults("Type open + website url to browse this website.");
        break;

      case "google":
      case "search":
      case "g":
        clearInput();
        openLinkInNewWindow('https://google.com');
        addMatchedTextToResultsWithoutParam('Google');
        break;

      case "wikipedia":
      case "wiki":
      case "w":
        clearInput();
        openLinkInNewWindow('https://wikipedia.com');
        addMatchedTextToResultsWithoutParam('Wikipedia');
        break;

      case "facebook":
      case "fb":
      case "f":
        clearInput();
        openLinkInNewWindow('https://facebook.com');
        addMatchedTextToResultsWithoutParam('Facebook');
        break;

      case "twitter":
      case "t":
        clearInput();
        openLinkInNewWindow('https://twitter.com');
        addMatchedTextToResultsWithoutParam('Twitter');
        break;

      case "github":
      case "git":
        clearInput();
        openLinkInNewWindow('https://github.com');
        addMatchedTextToResultsWithoutParam('GitHub');
        break;

      case "translate":
      case "tr":
        clearInput();
        openLinkInNewWindow('https://translate.google.com/');
        addMatchedTextToResultsWithoutParam('Google Translate');
        break;

      case "hunt":
      case "ph":
        clearInput();
        openLinkInNewWindow('https://www.producthunt.com/');
        addMatchedTextToResultsWithoutParam('ProductHunt');
        break;

      case "gmail":
      case "gm":
        clearInput();
        openLinkInNewWindow('https://mail.google.com/mail/u/0/#inbox');
        addMatchedTextToResultsWithoutParam('Gmail');
        break;

      case "date":
      case "today":
        clearInput();
        getTimeAndDate("date");
        break;

      case "time":
      case "now":
        clearInput();
        getTimeAndDate("datetime");
        break;

      case "help":
      case "?":
        clearInput();
        postHelpList();
        break;

      case "clear":
      case "clean":
        clearInput();
        document.getElementById('terminalReslutsCont').innerHTML = ''
        break;

      default:
      clearInput();
      addFailTextToResults("<i>The command <b>" + textInputValue + "</b> was not found. Type <b>Help</b> to see all commands.</i>");
      break;
    }
  }

  // Main function to check the entered text and assign it to the correct function
  var checkWord = function(forcedTrigger) {
    if(forcedTrigger === undefined){
      textInputValue = document.getElementById('terminalTextInput').value.trim(); //get the text from the text input to a variable
    } else {
      textInputValue = forcedTrigger
    }
    textInputValueLowerCase = textInputValue.toLowerCase(); //get the lower case of the string

    inputHistory.push(textInputValue);
    currentHistory = inputHistory.length

    if (textInputValue != ""){ //checking if text was entered
      addUserTextToResults(textInputValue);
      actionValue = textInputValueLowerCase.split(' ')[0];
      actionParam = textInputValueLowerCase.replace(actionValue + ' ', '');

      if(actionValue != actionParam){
        if (actionValue == "open" || actionValue == "o") {
          actionParam = actionParam.replace('http://', '')
          actionParam = actionParam.replace('https://', '')
          openLinkInNewWindow('http://' + actionParam);
          addMatchedTextToResultsWithoutParam(actionParam);
        } else if (actionValue == "youtube" || actionValue == "y") {
          openLinkInNewWindow('https://www.youtube.com/results?search_query=' + actionParam);
          addMatchedTextToResults('YouTube', actionParam);
        } else if (actionValue == "facebook" || actionValue == "fb" || actionValue == "f") {
          openLinkInNewWindow('https://www.facebook.com/search/top/?q=' + actionParam);
          addMatchedTextToResults('Facebook', actionParam);
        } else if (actionValue == "google" || actionValue == "g" || actionValue == "search") {
          openLinkInNewWindow('https://www.google.com/search?q=' + actionParam);
          addMatchedTextToResults('Google', actionParam);
        } else if (actionValue == "twitter" || actionValue == "t") {
          openLinkInNewWindow('https://twitter.com/search?q=' + actionParam + '&src=typd');
          addMatchedTextToResults('Twitter', actionParam);
        } else if (actionValue == "wikipedia" || actionValue == "wiki" || actionValue == "w"){
          openLinkInNewWindow('https://wikipedia.org/w/index.php?search=' + actionParam);
          addMatchedTextToResults('Wikipedia', actionParam);
        } else if (actionValue == "github" || actionValue == "git"){
          openLinkInNewWindow('https://github.com/search?q=' + actionParam);
          addMatchedTextToResults('GitHub', actionParam);
        } else if (actionValue == "translate" || actionValue == "tr"){
          openLinkInNewWindow('https://translate.google.com/#auto/fr/' + actionParam);
          addMatchedTextToResults('Google Translate', actionParam);
        } else{
          textReplies();
        }
      } else{
        textReplies();
      }
    }
  };

  var addMatchedTextToResults = function(action, param) {
    addTextToResults("<i>I've searched on <b>" + action + "</b> for <b>" + param + "</b>, it should be opened now.</i>");
  };

  var addMatchedTextToResultsWithoutParam = function(action) {
    addTextToResults("<i>I've reached on <b>" + action + "</b>, it should be opened now.</i>");
  };

  checkWord('Hello Eva');
  checkWord('help');
});
