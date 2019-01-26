const fs = require('fs');
const MongoClient=require('mongodb').MongoClient;
//const url='mongodb://localhost:27017/breeds';


var cat_breeds = []
var dog_breeds = []


MongoClient.connect('mongodb://localhost:27017/',{useNewUrlParser: true},function(err,client){
    let db = client.db('breeds');

    if(err){
        console.error(err);
    }   
    else{
        console.log("baglandi")
        fs.readFile('cat_breeds.tsv', function(err, data) {
            var i;
            lines=data.toString().split("\n")
            for(i=0;i<lines.length;i++)
            {
                    var line = lines[i].split("\t");
                    var cat_breed = {
                        code: line[0],
                        type: 'C',
                        name: line[1],
                        name_tr: line[2]
                    }
                    cat_breeds.push(cat_breed)
            }

            db.collection('cat_breeds').insertMany(cat_breeds,(err,result)=>{
                if(err)
                throw err;
                else
                console.log('kediler eklendi '+ result.insertedCount);
            });

            
            console.log(cat_breeds.length)
        
        }); 

        db.collection('cat_breeds').aggregate([
            { $sample: { size: 5 } }
        ],(err, cursor)=> {
            cursor.toArray((err, documents)=>{
                console.log("-------------KEDILER----------")
                console.log(documents);
            })

        })
        
        
        fs.readFile('dog_breeds.tsv', function(err, data) {
            var i;
            lines=data.toString().split("\n")
            for(i=0;i<lines.length;i++)
            {
                    var line = lines[i].split("\t");
                    var dog_breed = {
                        code: line[0],
                        type: 'D',
                        name: line[1],
                        name_tr: line[2]
                    }
                    dog_breeds.push(dog_breed)
            }
            db.collection('dog_breeds').insertMany(dog_breeds,(err,result)=>{
                if(err)
                console.log(err);
                else
                console.log('kopekler eklendi '+result.insertedCount);
            });

            console.log(dog_breeds.length)
        
        });

        db.collection('dog_breeds').aggregate([
            {$sample: {size:5}}
        ],(err,cursor)=> {
            cursor.toArray((err,documents)=>{
                console.log("-------------KOPEKLER----------")
                console.log(documents);
            })

        })
    }

}) 











