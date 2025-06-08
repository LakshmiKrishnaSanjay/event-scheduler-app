// pages/index.js
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import EventCard from '../components/EventCard';

const GET_EVENTS = gql`
  query {
    events {
      id
      title
      startTime
      endTime
      location
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;
console.log('Fetched events:', data.events);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
        <Link href="/add-event" className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Event
        </Link>
      </div>
      {data.events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        data.events.map(event => (
          <EventCard key={event.id} event={event} />
        ))
      )}
    </div>
  );
}
