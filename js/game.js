$(document).ready(function() {
    var lev = 0;
    $('#next-link').hide();
    $('#next-link').click(function() {
        startLevel(lev++);
        $(this).hide();
        $('#info').hide();
    });
    startLevel(lev++);
});

function startLevel(level) {
    var wordsArray = [ 'CAR', 'FLOWERS', 'RIVER' ];
    var word = wordsArray[level];
    clearAll();
    
    loadImages(level);
    loadAvailableLetters(word);
}

function clearAll() {
    $("#answer").empty();
    $("#letters").empty();
    $("#picture-1").empty();
    $("#picture-2").empty();
    $("#picture-3").empty();
    $("#picture-4").empty();
}

function loadAvailableLetters(word) {
    var answer_buttons = [];
    var letter_buttons = [];
    var answer = [];
    
    //create your answer letters
    for(var i = 0; i < word.length; i++) {
        answer[i] = " ";
        answer_buttons.push($('<div id=a' + i + '> </div>'));
        answer_buttons[i].button();
        answer_buttons[i].addClass('my-button');
        //answer_buttons[i].hide();
        answer_buttons[i].click(function() {
            var nowLetter = $(this).text();
            $(this).html(" ");
            for(var j = 0; j < letter_buttons.length; j++) {
                if(letter_buttons[j].is(":visible") == false && letter_buttons[j].text() == nowLetter) {
                    letter_buttons[j].fadeIn('fast');
                }
            }
        });
        $('#answer').append(answer_buttons[i]);
    }
    
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
            for(var j = 0; j < answer_buttons.length; j++) {
                if(answer_buttons[j].text() == " ") {
                    answer_buttons[j].html('<span class="ui-button-text">' + letterNow + '</span>');
                    answer_buttons[j].fadeIn('fast');
                    $(this).fadeToggle('fast');
                    answer[j] = letterNow;
                    var ans = answer.join("");
                    console.log(ans)
                    if(answer.join("") == word) {
                        showInfo("You win!");
                        $('#next-link').show();
                    }
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
        images[i-1] = $('<img>', {  src: 'img/' + level + '/' + i + '.jpg', 
                                    class: 'picture',
                                    mouseover: function() {$(this).css("opacity", "0.5");}, 
                                    mouseleave: function() {$(this).css("opacity", "1");},
                                    id: 'i'
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

