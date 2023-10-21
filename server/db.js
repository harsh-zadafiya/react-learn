import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://Harsh123:Harsh123@cluster1.l8z0ydb.mongodb.net/emps?retryWrites=true&w=majority";

let db;

const connectToDb = (callback) => {
  MongoClient.connect(url)
    .then((client) => {
      db = client.db();
      return callback(url);
    })
    .catch((err) => {
      console.log(err);
      return callback(url, err);
    });
};

const getDb = () => {
  return db;
};

export { connectToDb, getDb };
