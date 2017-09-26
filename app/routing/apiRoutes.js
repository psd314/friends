var data = require('../data/friends.js');

module.exports = function(app) {

    app.post('/api/submit', function(req, res) {
        // return best friend info
        var scoreArray = [];
        // convert user array to int's
        var userScore = req.body['scores[]'].reduce(function(sum, value) {
            return parseInt(sum) + parseInt(value);
        });
        // convert data arrays to int's
        for (i in data) {
            for (j in data[i]['scores[]']) {
                data[i]['scores[]'][j] = parseInt(data[i]['scores[]'][j]);
            }
            var test = data[i]['scores[]'].reduce(function(sum, value) {
                return sum + value;
            });
            scoreArray.push(test);
        }

        // store differences between friends list and user score
        differencesArray = [];
        for (score in scoreArray) {
            differencesArray.push(Math.abs(scoreArray[score] - userScore));
        }
        // return index of minimum difference
        var minIndex = differencesArray.indexOf(Math.min.apply(Math, differencesArray));
        // add user to friends list
        data.push(req.body);
        console.log(data);
        // return friend with closest score
        res.json(data[minIndex]);
    });

    app.get('/api/friends_list', function(req, res) {
        res.json(data);
    });
}