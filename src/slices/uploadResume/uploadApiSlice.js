import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";


export const uploadApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }), // replace with your real URL
    endpoints: (builder) => ({
        saveResumeUrl: builder.mutation({
            queryFn: _saveResumeUrl
        }),
        retrieveResumeData: builder.query({
            queryFn: _retrieveResumeData
        }),
    }),
});


async function  _saveResumeUrl({ user_id, file,resume_type }) {
    if (!file || !user_id) {
        throw new Error("File and user_id are required");
    }
  const file_url = await uploadResumeToFirebase(file);
  const body = {
    user_id: user_id,
    file_url: file_url,
    resume_type: resume_type
  }
  
    try {
      const response = await axios.post("http://localhost:8000/upload/resume-url",body, {   
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.data; 
      console.log("User registered:", data);
      return {data}; // Return the response data
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

async function _retrieveResumeData(resume_id) {
    try {
        const response = await axios.get(`http://localhost:8000/upload/resume-url/${resume_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.data;
        return { data }; // Return the response data
    } catch (err) {
        console.error("Failed to retrieve resume data", err);
        throw err; // Rethrow the error for further handling
    }
}   

const uploadResumeToFirebase = async (file) => {
    const userId = localStorage.getItem("user_id")||"9efda808-73dd-4fb1-ad57-a6c3f57e136b"; 
    if (!file || !userId) {
        throw new Error("File and userId are required");
    }
  console.log("Uploading file:", file.name, "for user:", userId);
  const fileRef = ref(storage, `resumes/${userId}/${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File uploaded successfully:", downloadURL);
  return downloadURL;
};

export const { useSaveResumeUrlMutation,useRetrieveResumeDataQuery } = uploadApiSlice;
