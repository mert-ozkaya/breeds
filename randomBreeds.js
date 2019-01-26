const MongoClient=require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/',{useNewUrlParser: true},function(err,client){
    let db = client.db('breeds');

    if(err){
        console.error(err);
    }   
    else{

        console.log("baglandi");

        let randCatArray =[];
        let randDogArray =[];
        db.collection('cat_breeds').estimatedDocumentCount((err,result)=>{
            //cat_breeds collection genişliği max olacak şekilde 5 adet random sayı bulma
             for(let i=0;i<5;i++)
             {
                var randNumber = Math.floor(Math.random() * Math.floor(result))

                for(var j=i;j>=0;j--)
                {
                    while(randNumber == randCatArray[j])
                    {
                        var randNumber = Math.floor(Math.random() * Math.floor(result))
                        j=i;
                    }
                }
                randCatArray.push(randNumber);
             }

                
                db.collection('cat_breeds').find().toArray((err,documents)=> {
                    for(i=0;i<5;i++)
                    {  
                        console.log(documents[randCatArray[i]]);
                    }
                });
                
        });
        
        
        //dog_breeds collection genişliği max olacak şekilde 5 adet random sayı bulma
        db.collection('dog_breeds').estimatedDocumentCount((err,result)=>{

            for(let i=0;i<5;i++)
            {
               var randNumber = Math.floor(Math.random() * Math.floor(result))

               for(var j=i;j>=0;j--)
               {
                   while(randNumber == randDogArray[j])
                   {
                       var randNumber = Math.floor(Math.random() * Math.floor(result))
                       j=i;
                   }
               }
               randDogArray.push(randNumber);
            }
                //tüm köpek türleri arraya alınıp random sayının indexi
               db.collection('dog_breeds').find().toArray((err,documents)=> {
                for(i=0;i<5;i++)
                {  
                   console.log(documents[randDogArray[i]]);
                }
               });
           
       });
        
        
    }

}) 











