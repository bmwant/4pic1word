$(document).ready(function() {
    startLevel(0);
});

function startLevel(level) {
    var wordsArray = [ 'first', 'secondary', 'elementary', 'another', 'car' ];
    var word = wordsArray[level];
    loadImages(level);
    loadAvailableLetters(word);
}

function loadAvailableLetters(word) {
    var answer = "";
    for(var i = 0; i < word.length; i++) {
        var x = word[i];
        $('#letters').append('<div id=l' + x + '>' + x + '</div>');
        $('#l'+x).button();
        $('#l'+x).click(function() {
            $(this).fadeOut('fast');
            var letterNow = $(this).attr('id')[1];
            answer += letterNow;
            $('#answer').append('<div id=a' + letterNow + '>' + letterNow + '</div>');
            $('#a'+letterNow).button();
            $('#a'+letterNow).click(function() {
                //answer.reverse();
                //answer.pop();
                //answer.reverse();
                $(this).fadeOut('fast');
                $('#l'+letterNow).fadeIn('fast');
            });
            if(answer == word) {
                showInfo('You win..');
                //startLevel(1);
            }
        });
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