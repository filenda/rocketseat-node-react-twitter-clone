const Tweet = require('../models/Tweet');

module.exports = {
    async index(req, res){
        //return all tweets with no filters applied using descending order (minus signal followed by the field)
        const tweets = await Tweet.find({}).sort("-createdAt");

        return res.json(tweets);
    },

    //this route is commonly called create in rest api's
    async store(req, res){
        const tweet = await Tweet.create(req.body);

        req.io.emit('tweet', tweet);

        //return tweet created with all info inclusding id
        return res.json(tweet);
    }
}