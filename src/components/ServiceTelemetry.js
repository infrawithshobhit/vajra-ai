import { Typography, Card, CardContent } from "@mui/material";

function ServiceTelemetry({ telemetry }) {

  if (!telemetry) {
    return (
      <Typography style={{ color: "#94a3b8" }}>
        Awaiting telemetry...
      </Typography>
    );
  }

  return (
    <Card style={{ backgroundColor: "#0f172a", color: "white" }}>
      <CardContent>

        <Typography variant="h6">
          📊 Service Telemetry
        </Typography>

        <Typography style={{ marginTop: "10px" }}>
          Traffic: {telemetry.traffic} req/sec
        </Typography>

        <Typography>
          Error Rate: {telemetry.error_rate} %
        </Typography>

        <Typography>
          Latency: {telemetry.latency} ms
        </Typography>

        <Typography>
          CPU Usage: {telemetry.cpu_usage} %
        </Typography>

        <Typography>
          Memory Usage: {telemetry.memory_usage} %
        </Typography>

        <Typography>
          Request Rate: {telemetry.request_rate} req/sec
        </Typography>

        <Typography>
          Security Score: {telemetry.security_anomaly_score}
        </Typography>

      </CardContent>
    </Card>
  );
}

export default ServiceTelemetry;