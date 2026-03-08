import { useEffect, useState } from "react";

export default function PredictionCard() {

  const [data, setData] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [error, setError] = useState(false);

  const API_URL = "https://xlgtgttwl4.execute-api.ap-south-1.amazonaws.com/prediction";

  const loadPrediction = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLastRefresh(new Date().toLocaleTimeString());
        setError(false);
      })
      .catch(err => {
        console.error("Prediction API error:", err);
        setError(true);
      });
  };

  useEffect(() => {

    // first load
    loadPrediction();

    // auto refresh every 10 seconds
    const interval = setInterval(() => {
      loadPrediction();
    }, 10000);

    return () => clearInterval(interval);

  }, []);

  if (error) {
    return (
      <div style={{
        border:"1px solid #ff4d4d",
        padding:"15px",
        borderRadius:"8px",
        marginBottom:"20px",
        color:"#ff4d4d"
      }}>
        AI Prediction service unavailable
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{
        border:"1px solid #ccc",
        padding:"15px",
        borderRadius:"8px",
        marginBottom:"20px"
      }}>
        Loading AI prediction...
      </div>
    );
  }

  return (
    <div style={{
      border:"1px solid #ccc",
      padding:"15px",
      borderRadius:"8px",
      marginBottom:"20px"
    }}>

      <h3>AI Prediction</h3>

      <p>
        <b>{data.prediction}</b>
      </p>

      <p>
        Confidence: {data.confidence}%
      </p>

      <p>
        Last updated: {new Date().toLocaleString()}
      </p>

      <p style={{fontSize:"12px", opacity:0.7}}>
        Refreshed at: {lastRefresh}
      </p>

    </div>
  );
}