const { gql } = require('apollo-server');

const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    description: String
    startTime: String!
    endTime: String!
    location: String!
    isRecurring: Boolean!
    recurrenceRule: String
  }

  type Query {
    events: [Event]
    event(id: ID!): Event
    eventsByDateRange(start: String!, end: String!): [Event]
  }

  input EventInput {
    title: String!
    description: String
    startTime: String!
    endTime: String!
    location: String!
    isRecurring: Boolean!
    recurrenceRule: String
  }

  type Mutation {
    addEvent(input: EventInput!): Event
    updateEvent(id: ID!, input: EventInput!): Event
    deleteEvent(id: ID!): Boolean
  }

  type Query {
  eventsInRange(start: String!, end: String!): [Event]
}

`;

module.exports = typeDefs;
