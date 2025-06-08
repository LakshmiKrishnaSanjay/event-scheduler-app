const { ObjectId } = require('mongodb');

const mapEvent = (event) => ({
  id: event._id.toString(),
  title: event.title,
  description: event.description,
  startTime: event.startTime ? event.startTime.toISOString() : null,
  endTime: event.endTime ? event.endTime.toISOString() : null,  // <-- handle missing endTime
  location: event.location,
  isRecurring: event.isRecurring,
  recurrenceRule: event.recurrenceRule,
});


const resolvers = {
  Query: {
events: async (_, __, { db }) => {
  console.log(`[Query events] Fetching all events`);
  const events = await db.collection('events')
    .find({})
    .sort({ startTime: 1 }) // optional: sort by date
    .toArray();
  console.log(`[Query events] Found ${events.length} events`);
  return events.map(mapEvent);
},


    event: async (_, { id }, { db }) => {
      console.log(`[Query event] Fetching event with id: ${id}`);
      const event = await db.collection('events').findOne({ _id: new ObjectId(id) });
      if (event) {
        console.log(`[Query event] Found event: ${event.title}`);
      } else {
        console.log(`[Query event] No event found with id: ${id}`);
      }
      return event ? mapEvent(event) : null;
    },

    eventsByDateRange: async (_, { start, end }, { db }) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      console.log(`[Query eventsByDateRange] Fetching events between ${startDate.toISOString()} and ${endDate.toISOString()}`);
      const events = await db.collection('events').find({
        startTime: { $gte: startDate },
        endTime: { $lte: endDate }
      }).toArray();
      console.log(`[Query eventsByDateRange] Found ${events.length} events`);
      return events.map(mapEvent);
    },
  },

  Mutation: {
    addEvent: async (_, { input }, { db }) => {
      console.log('[Mutation addEvent] Adding event:', input);
      const newEvent = {
        ...input,
        startTime: new Date(input.startTime),
        endTime: new Date(input.endTime),
      };
      const result = await db.collection('events').insertOne(newEvent);
      console.log('[Mutation addEvent] Inserted event with id:', result.insertedId.toString());
      return mapEvent({ _id: result.insertedId, ...newEvent });
    },

    updateEvent: async (_, { id, input }, { db }) => {
      console.log(`[Mutation updateEvent] Updating event id: ${id} with data:`, input);
      const updatedData = { ...input };
      if (input.startTime) updatedData.startTime = new Date(input.startTime);
      if (input.endTime) updatedData.endTime = new Date(input.endTime);
      const updateResult = await db.collection('events').updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
      console.log(`[Mutation updateEvent] Matched ${updateResult.matchedCount}, Modified ${updateResult.modifiedCount}`);
      const updatedEvent = await db.collection('events').findOne({ _id: new ObjectId(id) });
      return mapEvent(updatedEvent);
    },

    deleteEvent: async (_, { id }, { db }) => {
      console.log(`[Mutation deleteEvent] Deleting event with id: ${id}`);
      const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });
      console.log(`[Mutation deleteEvent] Deleted count: ${result.deletedCount}`);
      return result.deletedCount === 1;
    },
  },
};

module.exports = resolvers;
