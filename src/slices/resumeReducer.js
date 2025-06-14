import { createSlice } from '@reduxjs/toolkit';

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    resumeText: '',
    analysis: '',
  },
  reducers: {
    setResumeText(state, action) {
      state.resumeText = action.payload;
    },
    setAnalysis(state, action) {
      state.analysis = action.payload;
    },
  },
});

export const { setResumeText, setAnalysis } = resumeSlice.actions;
export default resumeSlice.reducer;
