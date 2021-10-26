/// <reference path="./typings.d.ts"/>

import { ApolloServer } from "apollo-server";
import casual from "casual";
import fs from "fs";
import path from "path";
import random_name from "node-random-name";
import { getRandomDate } from "random-date-generator";

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

interface WithTypename {
  __typename: string;
}

const resolvers = {
  Player: {
    __resolveType(obj: WithTypename) {
      return obj.__typename;
    },
  },
  Team: {
    __resolveType(obj: WithTypename) {
      return obj.__typename;
    },
  },
  Match: {
    __resolveType(obj: WithTypename) {
      return obj.__typename;
    },
  },
} as const;

const startDOBDate = new Date();
const endDOBDate = new Date(startDOBDate);
startDOBDate.setFullYear(startDOBDate.getFullYear() - 35);
endDOBDate.setFullYear(endDOBDate.getFullYear() - 18);

const mocks = {
  Player: () => {
    const dateOfBirth = getRandomDate(startDOBDate, endDOBDate).toUTCString();
    const squadNumber = casual.integer(1, 25);
    const nationality = casual.country;
    const seed = `${dateOfBirth}:${squadNumber}:${nationality}`;
    return {
      firstname: random_name({ gender: "male", first: true, seed }),
      lastname: random_name({ last: true, seed }),
      // Changed height mock generator to match Graphql Schema type "height: Int!"
      // height: 150 + (Math.random() * 50).toFixed(2),
      height: Math.round(150 + Math.random() * 50),
      dateOfBirth,
      squadNumber,
      nationality,
    };
  },
  Team: () => ({
    name: casual.company_name,
    stadium: casual.city,
    firstEleven: [...new Array(11)].map(() => ({ __typename: "Player" })),
  }),
  Match: () => ({
    date: new Date().toUTCString(),
  }),
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
});

server
  .listen({
    port: 3001,
    host: "0.0.0.0",
  })
  .then(({ url }) => {
    console.log(`🚀 Public mock graphql server ready at ${url}`);
  });
