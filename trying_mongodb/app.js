// const { MongoClient } = require('mongodb');

// const url = 'mongodb://localhost:27017';
// const dbName = 'Mayank';

// async function main() {
//   const client = new MongoClient(url);
//   await client.connect();
//   const db = client.db(dbName);
//   await db.collection('testcollection').insertOne({ name: "Sample", value: "This is a test" });
//   console.log(`Database and collection created, document inserted.`);
//   await client.close();
// }

// main();

// const { MongoClient } = require('mongodb');

// const url = 'mongodb://localhost:27017';
// const dbName = 'Mayank';

// async function main() {
//   const client = new MongoClient(url);
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection('testcollection');
  
//   const documents = [
//     { name: "yo", age: 0 },
//     { name: "nacho", age: 10 },
//     { name: "yeup", age: 100 }
//   ];
  
// //   await collection.insertMany(documents);
// //   console.log('Documents inserted.');
//     const results = await collection.find({}).toArray();
//     console.log(results);
  
//   await client.close();
// }

// main();


const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'Mayank';
const client = new MongoClient(url);

client.connect(function(err) {
  if (err) throw err;
  const db = client.db(dbName);
  const collection = db.collection('testcollection');

  const documents = [
    { name: "yo", age: 0 },
    { name: "nacho", age: 10 },
    { name: "yeup", age: 100 }
  ];

  collection.insertMany(documents, function(err, res) {
    if (err) throw err;
    console.log('Documents inserted.');

    collection.find({}).toArray(function(err, docs) {
      if (err) throw err;
      console.log('Found documents:', docs);

      client.close();
    });
  });
});
