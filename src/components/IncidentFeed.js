import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const API_URL =
  "https://qc4igddd5m.execute-api.ap-south-1.amazonaws.com/Prod/incident";

const getSeverityColor = (severity) => {
  switch (severity) {
    case "Critical":
      return "#dc2626";
    case "High":
      return "#f97316";
    case "Medium":
      return "#eab308";
    default:
      return "#22c55e";
  }
};

function IncidentFeed() {
  const [incidents, setIncidents] = useState([]);

  const loadIncidents = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item, index) => ({
          id: item.incident_id || `INC-${index}`,
          service: item.service || "unknown-service",
          severity: item.analysis?.severity || "Low",
          message: item.analysis?.summary || "Incident detected",
          time: "Just now",
        }));

        setIncidents(formatted.reverse());
      })
      .catch((err) => {
        console.error("Incident API error:", err);
      });
  };

  useEffect(() => {
    // first load
    loadIncidents();

    // refresh every 10 seconds
    const interval = setInterval(() => {
      loadIncidents();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        🚨 Active Incidents
      </Typography>

      {incidents.length === 0 && (
        <Typography variant="body2" style={{ color: "#64748b" }}>
          No incidents detected
        </Typography>
      )}

      {incidents.slice(0, 3).map((incident, index) => (
        <Card
          key={index}
          onClick={() =>
            window.open(`/incident/${incident.id}`, "_blank")
          }
          style={{
            marginBottom: "12px",
            backgroundColor: "#0f172a",
            borderLeft: `5px solid ${getSeverityColor(incident.severity)}`,
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          <CardContent>
            <Typography
              variant="subtitle2"
              style={{ color: "#94a3b8" }}
            >
              {incident.id} — {incident.service}
            </Typography>

            <Typography
              variant="body1"
              style={{ color: "white", marginTop: "4px" }}
            >
              {incident.message}
            </Typography>

            <Typography
              variant="caption"
              style={{
                color: getSeverityColor(incident.severity),
                display: "block",
                marginTop: "6px",
              }}
            >
              Severity: {incident.severity}
            </Typography>

            <Typography
              variant="caption"
              style={{ color: "#64748b" }}
            >
              {incident.time}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default IncidentFeed;