import { useEffect, useState } from "react";
import { Typography, Card, CardContent } from "@mui/material";

function RevenueImpact({ analysis }) {

  /* -------------------------------- */
  /* BUSINESS ASSUMPTIONS FOR DEMO */
  /* -------------------------------- */

  const trafficPerMinute =
    analysis?.telemetry?.traffic || 3000; // fallback for demo

  const conversionRate = 0.04; // 4% conversion
  const avgRevenuePerTxn = 1200; // ₹ per order

  const ordersPerMinute = trafficPerMinute * conversionRate;

  /* -------------------------------- */
  /* SEVERITY BASED FAILURE RATE */
  /* -------------------------------- */

  const errorRate =
    analysis?.analysis?.severity === "Critical"
      ? 25
      : analysis?.analysis?.severity === "High"
      ? 18
      : analysis?.analysis?.severity === "Medium"
      ? 8
      : 2;

  /* -------------------------------- */
  /* REVENUE LOSS CALCULATION */
  /* -------------------------------- */

  const lossPerMinute =
    (errorRate / 100) * ordersPerMinute * avgRevenuePerTxn;

  /* -------------------------------- */
  /* LIVE LOSS COUNTER */
  /* -------------------------------- */

  const [cumulativeLoss, setCumulativeLoss] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(900); // 15 min SLA

  useEffect(() => {

    if (!analysis) return;

    const interval = setInterval(() => {

      setCumulativeLoss((prev) => prev + lossPerMinute / 60);

      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));

    }, 1000);

    return () => clearInterval(interval);

  }, [analysis, lossPerMinute]);

  /* -------------------------------- */
  /* SEVERITY COLOR */
  /* -------------------------------- */

  const severityColor =
    errorRate >= 20 ? "#dc2626" :
    errorRate >= 10 ? "#f97316" :
    "#22c55e";

  /* -------------------------------- */

  return (

    <Card
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        minHeight: "250px"
      }}
    >

      <CardContent>

        <Typography variant="h6">
          💰 Revenue Protection
        </Typography>

        {analysis ? (

          <>

            <Typography
              variant="h5"
              style={{ marginTop: "15px", color: severityColor }}
            >
              ₹ {Math.floor(lossPerMinute).toLocaleString()} / minute
            </Typography>

            <Typography variant="body2" style={{ marginTop: "8px" }}>
              Traffic: {trafficPerMinute.toLocaleString()} users/min
            </Typography>

            <Typography variant="body2">
              Conversion Rate: {(conversionRate * 100)}%
            </Typography>

            <Typography variant="body2">
              Avg Order Value: ₹ {avgRevenuePerTxn}
            </Typography>

            <Typography
              variant="h6"
              style={{ marginTop: "20px", color: "#ef4444" }}
            >
              Cumulative Impact: ₹ {Math.floor(cumulativeLoss).toLocaleString()}
            </Typography>

            <Typography variant="body2" style={{ marginTop: "10px" }}>
              SLA Breach In: {Math.floor(secondsRemaining / 60)}m {secondsRemaining % 60}s
            </Typography>

          </>

        ) : (

          <Typography variant="body2" style={{ marginTop: "10px" }}>
            Awaiting AI analysis...
          </Typography>

        )}

      </CardContent>

    </Card>

  );
}

export default RevenueImpact;