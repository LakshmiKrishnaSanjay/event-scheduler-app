// components/EventForm.js
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EventForm({ onSubmit, initialValues = {} }) {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [startTime, setStartTime] = useState(initialValues.startTime ? new Date(initialValues.startTime) : new Date());
  const [endTime, setEndTime] = useState(initialValues.endTime ? new Date(initialValues.endTime) : new Date());
  const [location, setLocation] = useState(initialValues.location || '');
  const [isRecurring, setIsRecurring] = useState(initialValues.isRecurring || false);
  const [recurrenceRule, setRecurrenceRule] = useState(initialValues.recurrenceRule || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startTime >= endTime) {
      alert('Start time must be before end time.');
      return;
    }
    onSubmit({
      title,
      description,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      location,
      isRecurring,
      recurrenceRule: isRecurring ? recurrenceRule : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        className="w-full border p-2 rounded"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="w-full border p-2 rounded"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <div>
        <label className="block text-sm mb-1">Start Time</label>
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          showTimeSelect
          dateFormat="Pp"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">End Time</label>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          showTimeSelect
          dateFormat="Pp"
          className="border p-2 rounded w-full"
        />
      </div>

      <input
        type="text"
        placeholder="Location"
        className="w-full border p-2 rounded"
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={() => setIsRecurring(!isRecurring)}
        />
        <label>Recurring Event</label>
      </div>

      {isRecurring && (
        <input
          type="text"
          placeholder='Recurrence Rule (e.g., "weekly", "monthly")'
          className="w-full border p-2 rounded"
          value={recurrenceRule}
          onChange={e => setRecurrenceRule(e.target.value)}
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
