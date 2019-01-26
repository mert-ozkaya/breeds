const MongoClient=require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/', {useNewUrlParser: true}, function(err, client) {
    let db = client.db('breeds');

    var query = {_id: ObjectId('5b895c1aecc9c90760ac6b19')}   
      var options = {
        projection: {code: 1,name: 1,_id:0}
    } 

    var mysort={
        name:1
    }

    db.collection('dog_breeds').findOne(query,options,function(err, result) {
        if(err)
        return err;
        else
        console.log(result);
    })



})