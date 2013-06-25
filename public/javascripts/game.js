$(document).on("ready", startGame);

var answer = "";

function startGame() {
    var answer_buttons = [];
    var letter_buttons = [];
    var answer = [];

    $.getJSON('start', function(data) {

        $("#level-menu").text("You are now at level " + data.currentLevel);

        //initialize temporary answer
        for(var i = 0; i < data.answerLength; i++) {
            answer[i] = " ";
        }

        //add player answer field buttons
        $("#level-menu").slideDown('slow');
        for(var i = 0; i < data.answerLength; i++) {
            answer_buttons.push($('<div id=a' + i + '> </div>'));
            answer_buttons[i].addClass('my-button');
            answer_buttons[i].addClass('empty-button');
            answer_buttons[i].click(function() {
                var nowLetter = $(this).text();
                $(this).text(" ");
                answer[$(this).attr('id')[1]] = " ";
                for(var j = 0; j < letter_buttons.length; j++) {
                    if(letter_buttons[j].is(":visible") == false && letter_buttons[j].text() == nowLetter) {
                        letter_buttons[j].fadeIn('fast');
                        $(this).addClass('empty-button');
                        $(this).removeClass('answer-button');
                        break;
                    }
                }
            });
            $('#answer').append(answer_buttons[i]);
        }

        //add available letters buttons
        var howLetters = data.letters.length;
        for(var i = 0; i < howLetters; i++) {
            var x = data.letters[i];
            letter_buttons.push($('<div id=l' + i + x + '>' + x + '</div>'));
            letter_buttons[i].addClass('my-button');
            letter_buttons[i].addClass('letter-button');
            letter_buttons[i].click(function() {
                var letterNow = $(this).text();
                for(var j = 0; j < answer_buttons.length; j++) {
                    if(answer_buttons[j].text() == " ") {
                        answer[j] = letterNow;
                        answer_buttons[j].text(letterNow);
                        answer_buttons[j].removeClass('empty-button');
                        answer_buttons[j].addClass('answer-button');
                        $(this).fadeToggle('fast');
                        checkAnswer(answer);
                        break;
                    }
                }
            });
            if (i >= howLetters / 2) {
                $('#row-2').append(letter_buttons[i]);
            } else {
                $('#row-1').append(letter_buttons[i]);
            }
        }
        loadImages(data.currentLevel);
    });
}

function checkAnswer(answer) {
    var flag = true;
    for(var i = 0; i < answer.length; i++) {
        if(answer[i] == " ") {
            flag = false;
            break;
        }
    }
    if(flag === true) {
        $.ajax({
            type: "get",
            url: "check",
            data: { answer: answer }
        }).done(function( msg ) {
            if(msg.correct == 1) {
                $("#info-menu").text("You pass the level");
                $("#info-menu").slideDown('slow');
                $("#next-menu").delay(2000).slideDown('slow');
            } else {
                $("#answer").effect("highlight", {}, 3000);
            }
        });
    }
}

function clearAll() {
    $("#answer").empty();
    $("#letters").empty();
    $(".picture").empty();
}

function loadImages(level) {
    var images = [];
    for(var i = 1; i <= 4; i++) {
        images[i-1] = $('<img>', {  src: 'img/' + level + '/' + i,
            class: 'picture',
            mouseover: function() {$(this).css("opacity", "0.5");},
            mouseleave: function() {$(this).css("opacity", "1");}
        });
        $('#picture-' + i).append(images[i-1]);
    }
}