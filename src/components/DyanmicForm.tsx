import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateField } from '../features/form/formSlice';
import FieldRenderer from './FieldRenderer';
import type { FieldSchema, FieldValue } from '../features/form/types';

interface Props {
  onSubmit: (data: Record<string, FieldValue>) => void;
}

const DynamicForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const { schema, data, loading } = useAppSelector(state => state.form);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isVisible = (field: FieldSchema): boolean => {
    if (!field.dependsOn) return true;
    return data[field.dependsOn.fieldId] === field.dependsOn.value;
  };

  const validateField = (field: FieldSchema): string | null => {
  const value = data[field.id];
  const rules = field.validation;
  const errors: string[] = [];

  if (!rules) return null;

  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (value === undefined || value === null || value === '') {
          errors.push(rule.message);
        }
        break;
      case 'minLength':
        if (typeof value === 'string' && value.length < rule.value) {
          errors.push(rule.message);
        }
        break;
      case 'maxLength':
        if (typeof value === 'string' && value.length > rule.value) {
          errors.push(rule.message);
        }
        break;
      case 'pattern':
        if (typeof value === 'string' && !new RegExp(rule.value).test(value)) {
          errors.push(rule.message);
        }
        break;
      case 'min':
        if (typeof value === 'number' && value < rule.value) {
          errors.push(rule.message);
        }
        break;
      case 'max':
        if (typeof value === 'number' && value > rule.value) {
          errors.push(rule.message);
        }
        break;
    }
  }

  return errors.length > 0 ? errors.join('\n') : null;
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    schema?.fields.forEach(field => {
        if (!isVisible(field)) return;
        const error = validateField(field);
        if (error) {
          newErrors[field.id] = error;
          toast.error(`${field.label}: ${error}`);
        }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      onSubmit(data);
      toast.success('Form submitted successfully!');
    }

  };

  const handleChange = (id: string, value: FieldValue) => {
    dispatch(updateField({ id, value }));
  };

  if (!schema?.fields?.length || loading) {
    return <div className="text-center py-10 text-gray-500">Loading form...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-blue-700">{schema.title}</h2>
      <div className="grid grid-cols-1 text-left sm:grid-cols-1 gap-6">
        {schema.fields.map(
          (field) =>
            isVisible(field) && (
              <FieldRenderer
                key={field.id}
                field={field}
                value={data[field.id]}
                onChange={handleChange}
                error={errors[field.id]}
              />
            )
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-6 rounded hover:scale-105 transition"
        >
        {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;