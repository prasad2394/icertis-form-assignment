export type FieldType = 'text' | 'number' | 'select' | 'checkbox' | 'date';

export type FieldValue = string | number | boolean | null;

export type ValidationRule =
  | { type: 'required'; message: string }
  | { type: 'minLength'; value: number; message: string }
  | { type: 'maxLength'; value: number; message: string }
  | { type: 'pattern'; value: string; message: string }
  | { type: 'min'; value: number; message: string }
  | { type: 'max'; value: number; message: string };

export interface FieldSchema {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'date';
  options?: { label: string; value: string }[];
  validation?: ValidationRule[];
  dependsOn?: {
    fieldId: string;
    condition: 'equals'; // can extend later
    value: string;
  };
}


export interface FormSchema {
  title: string;
  fields: FieldSchema[];
}
