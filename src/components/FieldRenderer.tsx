import React from 'react';
import type { FieldSchema, FieldValue } from '../features/form/types';

interface Props {
  field: FieldSchema;
  value: FieldValue;
  onChange: (id: string, value: FieldValue) => void;
  error?: string;
}

const FieldRenderer: React.FC<Props> = ({ field, value, onChange, error }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.currentTarget;

    let val: FieldValue;

    if (field.type === 'checkbox' && target instanceof HTMLInputElement) {
      val = target.checked;
    } else if (field.type === 'number') {
      val = Number(target.value);
    } else {
      val = target.value;
    }

    onChange(field.id, val);
  };

  return (
    <div className="flex flex-col gap-1">
      {field.type !== 'checkbox' ? (
        <>
          <label htmlFor={field.id} className="font-semibold">
            {field.label}
          </label>
          {field.type === 'text' && (
            <input
              id={field.id}
              type="text"
              value={typeof value === 'string' ? value : ''}
              onChange={handleChange}
              className="border rounded p-2"
            />
          )}
          {field.type === 'number' && (
            <input
              id={field.id}
              type="number"
              value={
                typeof value === 'number' || typeof value === 'string'
                  ? value
                  : ''
              }
              onChange={handleChange}
              className="border rounded p-2"
            />
          )}
          {field.type === 'date' && (
            <input
              id={field.id}
              type="date"
              value={typeof value === 'string' ? value : ''}
              onChange={handleChange}
              className="border rounded p-2"
              min={new Date().toISOString().split('T')[0]}
            />
          )}
          {field.type === 'select' && (
            <select
              id={field.id}
              value={typeof value === 'string' ? value : ''}
              onChange={handleChange}
              className="border rounded p-2"
            >
              <option value="">Select</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </>
      ) : (
        <div className="flex items-center gap-2">
          <input
            id={field.id}
            type="checkbox"
            checked={Boolean(value)}
            onChange={handleChange}
            className="border rounded"
          />
          <label htmlFor={field.id} className="font-semibold">
            {field.label}
          </label>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FieldRenderer;