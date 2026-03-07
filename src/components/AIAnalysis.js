import { useState } from "react";
import axios from "axios";
import { Button, Typography, Card, CardContent } from "@mui/material";

function AIAnalysis({ onAnalysis }) {
  const [analysis, setAnalysis] = useState(null);
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeIncident = async () => {
    setLoading(true);

    const payload = {
      service: "payment-service",
      traffic: 4500,
      error_rate: 18,
      latency: 4200,
      cpu_usage: 92,
      memory_usage: 88,
      request_rate: 5100,
      security_anomaly_score: 74
    };

    try {
      const response = await axios.post(
        "https://qc4igddd5m.execute-api.ap-south-1.amazonaws.com/Prod/incident",
        payload
      );

      console.log("AI Response:", response.data);

      setAnalysis(response.data);
      setTelemetry(payload);

      // Extract remediation data if present
      let remediationData = null;

      if (response.data?.remediation) {
        remediationData = response.data.remediation;
      }

      // NEW: Digital Twin data
      let digitalTwinData = null;

      if (response.data?.digital_twin) {
        digitalTwinData = response.data.digital_twin;
      }

      // Some Lambda responses wrap body as string
      if (response.data?.body) {
        try {
          const parsed = JSON.parse(response.data.body);

          remediationData = parsed;

          // NEW: Digital Twin extraction
          if (parsed.digital_twin) {
            digitalTwinData = parsed.digital_twin;
          }

        } catch (e) {
          console.log("No remediation body to parse");
        }
      }

      // Send analysis + telemetry + remediation + digital twin to App.js
      if (onAnalysis) {
        onAnalysis({
          analysis: response.data,
          telemetry: payload,
          remediation: remediationData,
          digital_twin: digitalTwinData
        });
      }

    } catch (error) {
      console.error("API Error:", error);
      alert("API call failed. Check console.");
    }

    setLoading(false);
  };

  const ai = analysis?.analysis;

  return (
    <div>
      <Typography variant="h6" style={{ color: "white" }}>
        🧠 AI Analysis
      </Typography>

      <Button
        variant="contained"
        color="error"
        onClick={analyzeIncident}
        style={{ marginTop: "10px" }}
      >
        {loading ? "Analyzing..." : "Analyze Incident"}
      </Button>

      {ai && (
        <Card
          style={{
            marginTop: "15px",
            backgroundColor: "#0f172a",
            color: "white"
          }}
        >
          <CardContent>

            <Typography variant="subtitle1">
              Severity: {ai.severity}
            </Typography>

            <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
              Summary:
            </Typography>
            <Typography>
              {ai.summary}
            </Typography>

            <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
              Root Causes:
            </Typography>
            <ul>
              {ai.probable_root_causes?.map((cause, index) => (
                <li key={index}>{cause}</li>
              ))}
            </ul>

            <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
              Recommended Actions:
            </Typography>
            <ul>
              {ai.recommended_actions?.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>

            <Typography variant="subtitle2" style={{ marginTop: "10px" }}>
              Incident Score: {ai.incident_score}
            </Typography>

            <Typography variant="subtitle2">
              Confidence: {ai.confidence}
            </Typography>

          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AIAnalysis;