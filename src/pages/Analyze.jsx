import React, { use, useState } from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent, LinearProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useRetrieveResumeDataQuery } from '../slices/uploadResume/uploadApiSlice';
import { PdfHighlighter, PdfLoader } from 'react-pdf-highlighter';
import { Document, Page } from 'react-pdf';
import { RPProvider, RPDefaultLayout, RPPages, RPConfig } from '@pdf-viewer/react'



const AnalyzeStyle = {
  resumetext: {
    fontSize: '16px',
    lineHeight: '1.5',
  },
  errorHighlight: {
    color: 'red',
    fontWeight: 'bold',
  },
  scrollableRightPanel: {
    height: '80vh',
    overflowY: 'auto',
  },
  hideScrollbar: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
  },
};




const Analyze = () => {
  const resume_id=useParams(); // Using useParams to potentially access route parameters, if needed
  console.log("Resume ID:", resume_id.id); // Log the resume ID for debugging
  const {data, error, isLoading} = useRetrieveResumeDataQuery(resume_id.id);
  console.log("Data from API:", data); // Log the data received from the API for debugging
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess( numPages) {
    setNumPages(numPages);
  }

  // Use 'data' instead of 'dta', and fall back to 'analysis.issues' if data is not available
  if (isLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }
  // Transform the analysis object into an array of issues for rendering
  const analysis = data?.analysis || {};
  const accuracy = analysis.accuracy || 'N/A';

  // Prepare a flat array of issues by category
  const issues = Object.entries(analysis)
    .filter(([key, value]) => typeof value === 'object' && value !== null && 'score' in value)
    .map(([type, value]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      errors: Array.isArray(value.error) ? value.error : [],
      score: value.score,
    }));
    console.log("Issues:", issues.flatMap(issue =>
                    issue.errors.map(err => ({
                      text: err.incorrect_text,
                      
                    }))
                  )); // Log the issues for debugging

  return (
    <Box sx={{ p: 3, backgroundColor: '#f0f2f5' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} sx={{ flexGrow: 1 }}>
          <Paper elevation={3} sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#1976d2',
                borderBottom: '2px solid #1976d2',
                pb: 1,
                mb: 2,
              }}
            >
              Resume Preview
            </Typography>
            {/* PDF Viewer with highlights */}
            {data?.file_url ? (
              <Box sx={{ width: '100%', height: '700px', position: 'relative' }}>
                {console.log("PDF URL:", data.file_url)} {/* Debugging log for PDF URL */}
                {/* <PdfLoader 
                  url={data?.file_url}
                  beforeLoad={<Typography>Loading PDF...</Typography>}
                  onError={console.log(error)}
                  >
                  {pdfDocument => {
                    console.log("PDF Document Loaded",data?.file_url); // Debug
                    <PdfHighlighter
                      pdfDocument={pdfDocument}
                      url={data?.file_url}
                      highlights={[]}
                      onSelectionFinished={() => {}}
                      onHighlightClick={() => {}}
                    />
                  }}
                </PdfLoader> */}
 <RPConfig>
      <RPProvider src={data?.file_url}>
        <RPDefaultLayout style={{ height: '660px' }}>
          <RPPages />
        </RPDefaultLayout>
      </RPProvider>
    </RPConfig>
              </Box>
            ) : (
              <Typography>No resume file available.</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper
            elevation={3}
            sx={{
              ...AnalyzeStyle.scrollableRightPanel,
              ...AnalyzeStyle.hideScrollbar,
              p: 2,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#1976d2',
                borderBottom: '2px solid #1976d2',
                pb: 1,
                mb: 2,
              }}
            >
              Detected Issues
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#1976d2',
                pb: 1,
                mb: 2,
              }}
            >
              Overall Accuracy: {accuracy}%
            </Typography>
            {/* Highlight all errors from all categories */}
            {issues.length === 0 ? (
              <Typography>No issues detected.</Typography>
            ) : (
              issues.map((issue, idx) => (
                <Card
                  key={idx}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: '#e3f2fd',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}
                    >
                      {issue.type} <span style={{ fontWeight: 400, fontSize: 14 }}>(Score: {issue.score}%)</span>
                    </Typography>
                    {issue.errors.length === 0 ? (
                      <Typography color="text.secondary" sx={{ mb: 1 }}>
                        No issues found in this category.
                      </Typography>
                    ) : (
                      issue.errors.map((err, errIdx) => (
                        <Box
                          key={errIdx}
                          sx={{
                            mb: 2,
                            pl: 1,
                            backgroundColor: '#fff',
                            padding: 2,
                            borderRadius: 1,
                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <Typography color="text.secondary" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            {errIdx + 1}. Location: {err.location}
                          </Typography>
                          <Typography color="text.secondary" sx={{ mb: 0.5 }}>
                            <span style={{ fontWeight: 500 }}>Issue:</span>{' '}
                            <span style={AnalyzeStyle.errorHighlight}>{err.incorrect_text}</span>
                          </Typography>
                          <Typography color="text.secondary" sx={{ mb: 0.5 }}>
                            <span style={{ fontWeight: 500 }}>Detail:</span> {err.detail}
                          </Typography>
                          <Box sx={{ my: 1 }}>
                            <Box sx={{ borderTop: '2px dashed rgb(2, 53, 103)', my: 1 }} />
                            <Typography color="primary" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                              Suggestion: {err.corrected_text}
                            </Typography>
                            <Box sx={{ borderTop: '2px dashed rgb(2, 53, 103)', my: 1 }} />
                          </Box>
                        </Box>
                      ))
                    )}
                    <Box sx={{ mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={issue.score}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#f0f0f0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor:
                              issue.score > 80
                                ? 'green'
                                : issue.score > 60
                                ? 'orange'
                                : 'red',
                          },
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analyze;
