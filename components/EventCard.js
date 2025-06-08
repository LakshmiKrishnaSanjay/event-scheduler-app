import Link from 'next/link';
import moment from 'moment';

// Helper function to safely parse dates
function parseDate(date) {
  if (!date) return null; // handle null or undefined
  if (typeof date === 'string' && /^\d+$/.test(date)) {
    return new Date(parseInt(date));
  }
  const parsed = new Date(date);
  return isNaN(parsed) ? null : parsed;
}

export default function EventCard({ event }) {
  const start = parseDate(event.startTime);
  const end = parseDate(event.endTime);

  console.log('Event endTime raw:', event.endTime);

  return (
    <Link
      href={`/event/${event.id}`}
      className="block border p-4 mb-4 rounded hover:bg-gray-50"
    >
      <h2 className="text-xl font-semibold">{event.title}</h2>
      <p className="text-sm text-gray-600">
        Start: {start ? moment(start).format('LLL') : 'Not specified'}
      </p>
      <p className="text-sm  text-gray-600" >
        End: {end ? moment(end).format('LLL') : 'Not specified'}
      </p>
      <p className="text-sm">{event.location}</p>
    </Link>
  );
}
