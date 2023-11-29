// Harsh Zadafiya 8866930 - backend/fix bug
// Rohit Banwal   8879715 - frontend
// Kishan Joshi   8816399 - graphql
// Ramandeep kaur 8885823 - frontend

import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFile } from "node:fs/promises";
import { connectToDb, getDb } from "./db.js";
import { ObjectId } from "mongodb";

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

const empUpdate = async (_root, { emp }) => {
  const { id, ...updateData } = emp;

  console.log(emp);
  await db
    .collection("employees")
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  const updatedEmp = await db
    .collection("employees")
    .findOne({ _id: new ObjectId(id) });
  return updatedEmp;
};

const empDelete = async (_root, args) => {
  console.log(args);
  const { id } = args;

  const result = await db
    .collection("employees")
    .deleteOne({ _id: new ObjectId(id) });
  console.log(result);
  if (result.deletedCount == 1) {
    return { success: true, message: "Employee deleted successfully" };
  } else {
    return {
      success: false,
      message: "Employee not found or delete operation failed",
    };
  }
};

const empList = async () => {
  const emps = await db.collection("employees").find({}).toArray();
  return emps;
};

const typeDefs = await readFile("./schema.graphql", "utf8");

const resolvers = {
  Query: {
    name: () => "Harsh",
    emp: async (parent, args) => {
      const { id } = args;

      const emps = await db
        .collection("employees")
        .findOne({ _id: ObjectId(id) });
      return emps;
    },
    empList: empList,
  },
  Mutation: {
    sendName: (_root, { name }) => {
      return name + "!";
    },
    empAdd: empAdd,
    empUpdate: empUpdate,
    empDelete: empDelete,
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
