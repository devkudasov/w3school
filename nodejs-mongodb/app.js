const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, (err, db) => {
  if (err) throw err;

  console.log('DB created!');

  const dbo = db.db('mydb');

  dbo.createCollection('customers', (err, collection) => {
    if (err) throw err;

    console.log('Collection created!');

    const myobj = [
      { name: 'John', address: 'Highway 71'},
      { name: 'Peter', address: 'Lowstreet 4'},
      { name: 'Amy', address: 'Apple st 652'},
      { name: 'Hannah', address: 'Mountain 21'},
      { name: 'Michael', address: 'Valley 345'},
      { name: 'Sandy', address: 'Ocean blvd 2'},
      { name: 'Betty', address: 'Green Grass 1'},
      { name: 'Richard', address: 'Sky st 331'},
      { name: 'Susan', address: 'One way 98'},
      { name: 'Vicky', address: 'Yellow Garden 2'},
      { name: 'Ben', address: 'Park Lane 38'},
      { name: 'William', address: 'Central st 954'},
      { name: 'Chuck', address: 'Main Road 989'},
      { name: 'Viola', address: 'Sideway 1633'}
    ];

    collection.insertMany(myobj, (err, res) => {
      if (err) throw err;

      console.log(`${res.insertedCount} documents inserted!`)

      collection.find({address: /^S/}).sort({name: -1}).limit(5).toArray((err, res) => {
        if (err) throw err;

        console.log(res);

        collection.updateMany({address: /^S/}, {$set: {name: 'KudaSoff'}}, (err, res) => {
          if (err) throw err;

          console.log(`${res.result.nModified} documents updated!`);

          collection.find({address: /^S/}).limit(5).sort({name: -1}).toArray((err, res) => {
            if (err) throw err;
    
            console.log(res);

            collection.deleteMany({}, (err, res) => {
              if (err) throw err;
    
              console.log(`${res.result.n} documents deleted!`);
    
              collection.drop((err, delOk) => {
                if (err) throw err;
                if (delOk) console.log('Collection deleted!');
    
                db.close();
              });
            });
          });
        });
      });
    });
  });
});