$(document).ready(function() {
    startLevel(0);
});

function startLevel(level) {
    var wordsArray = [ 'FIRST', 'secondary', 'elementary', 'another', 'car' ];
    var word = wordsArray[level];
    loadImages(level);
    loadAvailableLetters(word);
}

function loadAvailableLetters(word) {
    var answer_buttons = [];
    var letter_buttons = [];
    for(var i = 0; i < word.length; i++) {
        answer_buttons.push($('<div id=a' + i + '> </div>'));
        answer_buttons[i].button();
        //answer_buttons[i].addClass('my-button');
        answer_buttons[i].hide();
        answer_buttons[i].click(function() {
            var nowLetter = $(this).text();
            $(this).fadeToggle('fast');
            $(this).html(" ");
            for(var j = 0; j < letter_buttons.length; j++) {
                if(letter_buttons[j].is(":visible") == false && letter_buttons[j].text() == nowLetter) {
                    letter_buttons[j].fadeToggle('fast');
                }
            }
        });
        $('#answer').append(answer_buttons[i]);
    }
    
    var answer = "";
    //create word.length*2 avaible letters
    var letter_for_buttons = [];
    for(var i = 0; i < word.length; i++) {
        //one random letter
        var chr = String.fromCharCode(65 + getRandomInt(0, 25));
        letter_for_buttons.push(chr);
        //and one from word
        letter_for_buttons.push(word[i]);
    }
    //shuffle array
    fisherYates(letter_for_buttons);
    //create buttons with this letters
    
    for(var i = 0; i < word.length*2; i++) {
        var x = letter_for_buttons[i];
        letter_buttons.push($('<div id=l' + i + x + '>' + x + '</div>'));
        letter_buttons[i].button();
        letter_buttons[i].click(function() {
            var letterNow = $(this).text();
            answer += letterNow;
            for(var j = 0; j < answer_buttons.length; j++) {
                if(answer_buttons[j].text() == " ") {
                    answer_buttons[j].html('<span class="ui-button-text">' + letterNow + '</span>');
                    answer_buttons[j].fadeToggle('fast');
                    $(this).fadeToggle('fast');
                    break;
                }
            }
        });
        $('#letters').append(letter_buttons[i]);
    }
}

function loadImages(level) {
    var images = [];
    for(var i = 1; i <= 4; i++) {
        images[i-1] = $('<img>', {  src: 'img/' + i + '.jpg', 
                                    class: 'picture',
                                    mouseover: function() {$(this).css("opacity", "0.5");}, 
                                    mouseleave: function() {$(this).css("opacity", "1");} 
                                });
        $('#picture-' + i).append(images[i-1]);
    }
}

function showInfo(text) {
    $('#info').fadeIn('fast');
    $('#info-icon').fadeIn('fast');
    $('#info-text').text(text);
}

function fisherYates(myArray) {
  var i = myArray.length, j, temp;
  if ( i === 0 ) return false;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = myArray[i];
     myArray[i] = myArray[j]; 
     myArray[j] = temp;
   }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}