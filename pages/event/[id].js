import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import moment from 'moment';

function parseDate(date) {
  if (!date) return null;
  if (typeof date === 'string' && /^\d+$/.test(date)) {
    return new Date(parseInt(date));
  }
  const parsed = new Date(date);
  return isNaN(parsed) ? null : parsed;
}

function formatDate(date) {
  const parsed = parseDate(date);
  return parsed ? moment(parsed).format('LLL') : 'Not specified';
}

const GET_EVENT = gql`
  query ($id: ID!) {
    event(id: $id) {
      id
      title
      description
      startTime
      endTime
      location
      isRecurring
      recurrenceRule
    }
  }
`;

const DELETE_EVENT = gql`
  mutation ($id: ID!) {
    deleteEvent(id: $id)
  }
`;

export default function EventDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { id },
    skip: !id,
  });

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    variables: { id },
    onCompleted: () => router.push('/'),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event.</p>;

  if (!data || !data.event) {
    return <p>No event found.</p>;
  }

  const { title, description, startTime, endTime, location, isRecurring, recurrenceRule } = data.event;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p>{description}</p>
      <p><strong>Start:</strong> {formatDate(startTime)}</p>
      <p><strong>End:</strong> {formatDate(endTime)}</p>
      <p><strong>Location:</strong> {location || 'Not specified'}</p>
      <p><strong>Recurring:</strong> {isRecurring ? 'Yes' : 'No'}</p>
      {isRecurring && <p><strong>Rule:</strong> {recurrenceRule}</p>}

      <div className="mt-4">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => {
            if (confirm('Are you sure you want to delete this event?')) {
              deleteEvent();
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
