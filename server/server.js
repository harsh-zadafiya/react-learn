// Harsh Zadafiya 8866930 - backend/fix bug
// Rohit Banwal   8879715 - frontend
// Kishan Joshi   8816399 - graphql
// Ramandeep kaur 8885823 - frontend

import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFile } from "node:fs/promises";
import { connectToDb, getDb } from "./db.js";

let db;

const app = express();

app.use(express.json());

const empAdd = async (_root, { emp }) => {
  const result = await db.collection("employees").insertOne(emp);
  const savedEmp = await db
    .collection("employees")
    .findOne({ _id: result.insertedId });
  return savedEmp;
};

const empList = async () => {
  const emps = await db.collection("employees").find({}).toArray();
  return emps;
};

const typeDefs = await readFile("./schema.graphql", "utf8");

const resolvers = {
  Query: {
    name: () => "Harsh",
    empList: empList,
  },
  Mutation: {
    sendName: (_root, { name }) => {
      return name + "!";
    },
    empAdd: empAdd,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();

app.use("/graphql", expressMiddleware(apolloServer));

connectToDb((url, err) => {
  if (!err) {
    app.listen(3031, () => {
      console.log("Express Server started on port 3031");
      console.log(
        "GraphQl Server started on port http://localhost:3031/graphql"
      );
      console.log("MongoDb connected to ", url);
    });
    db = getDb();
  }
});
