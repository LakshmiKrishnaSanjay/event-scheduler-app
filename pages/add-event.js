// pages/add-event.js
import EventForm from '../components/EventForm';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const ADD_EVENT = gql`
  mutation AddEvent($input: EventInput!) {
    addEvent(input: $input) {
      id
      title
    }
  }
`;

export default function AddEventPage() {
  const router = useRouter();

  const [addEvent] = useMutation(ADD_EVENT, {
    onCompleted: () => router.push('/'),
  });

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
      <EventForm onSubmit={input => addEvent({ variables: { input } })} />
    </div>
  );
}
