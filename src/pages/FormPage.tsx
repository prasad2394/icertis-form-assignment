import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadSchema } from '../features/form/formSlice';
import DynamicForm from '../components/DyanmicForm';
import type { FieldValue } from '../features/form/types';
import Header from '../components/Header';

const FormPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.form);
  const [submittedData, setSubmittedData] = useState<Record<string, FieldValue> | null>(null); // <-- State to hold submitted data

  useEffect(() => {
    dispatch(loadSchema());
  }, [dispatch]);

  const handleSubmit = (formData: Record<string, FieldValue>) => {
    console.log('Submitted:', formData);
    setSubmittedData(formData); // <-- Save submitted data to state
  };

  if (loading) return <p>Loading form...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <>
      <main className="font-[Sen,sans-serif] p-6 max-w-3xl mx-auto space-y-6">
        <Header />
        <DynamicForm onSubmit={handleSubmit} />

        {/* Show submitted data below the form */}
        {submittedData && (
          <div className="mt-8 bg-gray-100 p-4 rounded border border-gray-300">
            <h3 className="text-lg font-semibold mb-2 text-blue-700">Submitted Data:</h3>
            <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </>
  );
};

export default FormPage;