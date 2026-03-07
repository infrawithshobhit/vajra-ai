import { Card, CardContent, Typography } from "@mui/material";

const incidents = [
  {
    service: "payment-service",
    severity: "Critical",
    message: "Error rate spike detected (18%)",
    time: "2 mins ago",
  },
  {
    service: "auth-service",
    severity: "High",
    message: "Latency increased to 4.2s",
    time: "5 mins ago",
  },
  {
    service: "checkout-service",
    severity: "Medium",
    message: "CPU usage above 85%",
    time: "9 mins ago",
  },
];

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
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        🚨 Incident Feed
      </Typography>

      {incidents.map((incident, index) => (
        <Card
          key={index}
          style={{
            marginBottom: "10px",
            backgroundColor: "#0f172a",
            borderLeft: `5px solid ${getSeverityColor(incident.severity)}`,
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" style={{ color: "#94a3b8" }}>
              {incident.service}
            </Typography>

            <Typography variant="body1" style={{ color: "white" }}>
              {incident.message}
            </Typography>

            <Typography variant="caption" style={{ color: "#64748b" }}>
              {incident.time}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default IncidentFeed;