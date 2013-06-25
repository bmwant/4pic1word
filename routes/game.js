
exports.image = function(req, res) {
    var level = req.params.level
        , num = req.params.num;
    res.sendfile('public/images/' + level + '/' + num + ".jpg");
};

exports.load_level = function(req, res) {
    fs = require('fs');
    var words_arr = [];
    fs.readFile('levels/words.txt', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        words_arr = data.split('\n');
        var s = words_arr[req.param('level')];
        s.trim();
        res.send(s.substring(0, s.length-1));
    });

};

exports.checkAnswer = function(req, res) {
    if(req.xhr == true) {
        var ans = req.param('answer').join("");
        console.log(ans);
        if(ans == "CAR") {
            res.send({correct: 1});
        } else {
            res.send({correct: 0});
        }
    }
};

exports.start = function(req, res) {
    fs = require('fs');
    var max_letters = 10;
    fs.readFile('levels/words.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var words_arr = data.split('\n');
        var first = words_arr[0];
        var answer =  first.substring(0, first.length-1).toUpperCase();
        var letters = answer.split("", max_letters);
        var more_letters = letters.length;
        for(var i = more_letters; i < max_letters; i++) {
            var randomChar = String.fromCharCode(65 + getRandomInt(0, 25));
            letters.push(randomChar);
        }
        shuffle(letters);
//        res.attachment('public/images/0/1.jpg');
        res.jsonp({
            "currentLevel": 1,
            "answerLength": answer.length,
            "letters": letters
        });
    });
};

function shuffle(myArray) {
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
