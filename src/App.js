import { useState } from "react";
import { Grid, Paper } from "@mui/material";

import PredictionCard from "./components/PredictionCard";
import IncidentFeed from "./components/IncidentFeed";
import BotAttackChart from "./components/BotAttackChart";
import AIAnalysis from "./components/AIAnalysis";
import RevenueImpact from "./components/RevenueImpact";
import BotThreatIntel from "./components/BotThreatIntel";
import ServiceTelemetry from "./components/ServiceTelemetry";

function App() {

const [analysisData, setAnalysisData] = useState(null);
const [telemetryData, setTelemetryData] = useState(null);

const [prediction, setPrediction] = useState(null);
const [digitalTwin, setDigitalTwin] = useState(null);

const [decision, setDecision] = useState(null);
const [remediationStatus, setRemediationStatus] = useState(null);

/* ---------- STAGE HEADER ---------- */

const stageHeader = (title) => (
  <div
    style={{
      marginTop: "30px",
      marginBottom: "10px",
      color: "#94a3b8",
      fontSize: "14px",
      fontWeight: "600",
      letterSpacing: "1px"
    }}
  >
    {title}
  </div>
);

return (
<div
style={{
backgroundColor: "#0f172a",
minHeight: "100vh",
padding: "20px"
}}
>

{/* HEADER */}

<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "20px"
}}
>

<div>

<h1 style={{ color: "white", margin: 0 }}>
⚡ Vajra AI Command Center
</h1>

<p style={{ color: "#94a3b8", marginTop: "5px" }}>
AI-Powered Reliability War Room
</p>

</div>

<div
style={{
background: "#1e293b",
padding: "8px 14px",
borderRadius: "8px",
fontSize: "12px",
color: "#94a3b8"
}}
>
Live Monitoring
</div>

</div>

{/* MAIN GRID */}

<Grid container spacing={3}>

{/* ---------------- STAGE 1 ---------------- */}

<Grid item xs={12} md={3}>

{stageHeader("STAGE 1 — DETECTION & OBSERVABILITY")}

<Paper
style={{
padding:"18px",
background:"linear-gradient(145deg,#0f172a,#1e293b)",
color:"white",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.4)",
border:"1px solid rgba(255,255,255,0.05)",
minHeight:"250px",
marginBottom:"20px"
}}
>
<PredictionCard prediction={prediction} />
</Paper>

<Paper
style={{
padding:"18px",
background:"linear-gradient(145deg,#0f172a,#1e293b)",
color:"white",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.4)",
border:"1px solid rgba(255,255,255,0.05)",
minHeight:"250px",
marginBottom:"20px"
}}
>
<IncidentFeed />
</Paper>

<Paper
style={{
padding:"18px",
background:"linear-gradient(145deg,#0f172a,#1e293b)",
color:"white",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.4)",
border:"1px solid rgba(255,255,255,0.05)",
minHeight:"250px"
}}
>
<BotAttackChart />
</Paper>

</Grid>


{/* ---------------- STAGE 2 ---------------- */}

<Grid item xs={12} md={3}>

{stageHeader("STAGE 2 — AI DIAGNOSIS")}

<Paper
style={{
padding:"15px",
backgroundColor:"#1e293b",
color:"white",
minHeight:"250px",
marginBottom:"20px"
}}
>

<AIAnalysis
onAnalysis={(data)=>{

setAnalysisData(data.analysis);
setTelemetryData(data.telemetry);

if(data.prediction){
setPrediction(data.prediction);
}

if(data.digital_twin){
setDigitalTwin(data.digital_twin);
}

if(data.remediation){
setDecision(data.remediation.prediction);
setRemediationStatus(data.remediation.action_taken);
}

}}
/>

</Paper>

<Paper
style={{
padding:"15px",
backgroundColor:"#1e293b",
color:"white",
minHeight:"250px"
}}
>
<RevenueImpact analysis={analysisData}/>
</Paper>

</Grid>


{/* ---------------- STAGE 3 ---------------- */}

<Grid item xs={12} md={3}>

{stageHeader("STAGE 3 — SIMULATION & THREAT INTELLIGENCE")}

<Paper
style={{
padding:"15px",
backgroundColor:"#1e293b",
color:"white",
minHeight:"250px",
marginBottom:"20px"
}}
>
<ServiceTelemetry telemetry={telemetryData}/>
</Paper>

<Paper
style={{
padding:"15px",
backgroundColor:"#1e293b",
color:"white",
minHeight:"250px",
marginBottom:"20px"
}}
>
<BotThreatIntel/>
</Paper>

<Paper
style={{
padding:"15px",
backgroundColor:"#1e293b",
color:"white",
minHeight:"150px"
}}
>

<h3>🧠 Digital Twin Simulation</h3>

{digitalTwin ? (

digitalTwin.simulations.map((sim,i)=>(
<div key={i} style={{marginBottom:"10px"}}>

<b>{sim.action}</b>

<p style={{margin:"3px 0"}}>
Latency: {sim.predicted_latency} ms
</p>

<p style={{margin:"3px 0"}}>
Error Rate: {sim.predicted_error_rate}%
</p>

<p style={{margin:"3px 0"}}>
Cost Impact: {sim.cost_increase}
</p>

</div>
))

) : (

<p>Awaiting simulation results...</p>

)}

</Paper>

</Grid>


{/* ---------------- STAGE 4 ---------------- */}

<Grid item xs={12} md={3}>

{stageHeader("STAGE 4 — DECISION & REMEDIATION")}

<Paper
style={{
padding:"15px",
backgroundColor:"#1e293b",
color:"white",
minHeight:"150px",
marginBottom:"20px"
}}
>

<h3>⚡ AI Decision Engine</h3>

<p>
<b>Incident:</b>{" "}
{decision ? decision : "Awaiting AI decision..."}
</p>

<p>
<b>AI Decision:</b>{" "}
{decision ? "Scale Infrastructure" : "Pending"}
</p>

<p>
<b>Remediation Status:</b>{" "}
{remediationStatus ? remediationStatus : "Awaiting remediation"}
</p>

</Paper>

<Paper
style={{
padding:"15px",
backgroundColor:"#1e293b",
color:"white",
minHeight:"150px"
}}
>

<h3>📜 Incident Timeline</h3>

<ul>

<li>00:00 anomaly detected</li>
<li>00:05 AI root cause generated</li>
<li>00:08 failure predicted</li>
<li>00:10 digital twin simulation completed</li>
<li>00:12 remediation executed</li>

</ul>

</Paper>

</Grid>

</Grid>

</div>
);
}

export default App;