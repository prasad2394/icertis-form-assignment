import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchFormSchema } from '../../api/formApi';
import type { FormSchema, FieldValue } from './types';

interface FormState {
  schema: FormSchema | null;
  data: Record<string, FieldValue>;
  loading: boolean;
  error: string | null;
}

const initialState: FormState = {
  schema: null,
  data: {},
  loading: false,
  error: null,
};

export const loadSchema = createAsyncThunk<FormSchema>('form/loadSchema', async () => {
  const response = await fetchFormSchema();
  return response;
});

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ id: string; value: FieldValue }>
    ) => {
      state.data[action.payload.id] = action.payload.value;
    },
    resetForm: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(loadSchema.pending, state => {
            state.loading = true;
        })
        .addCase(loadSchema.fulfilled, (state, action) => {
            state.loading = false;
            state.schema = action.payload;
        })
        .addCase(loadSchema.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Error';
        });
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
