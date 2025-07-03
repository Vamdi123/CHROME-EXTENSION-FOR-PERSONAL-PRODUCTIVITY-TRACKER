import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

function App() {
  const [timeData, setTimeData] = useState({});
  const [goal, setGoal] = useState(60); 

  useEffect(() => {
    chrome.storage.local.get(["timeData"], (res) => {
      setTimeData(res.timeData || {});
    });
  }, []);

  const chartData = {
    labels: Object.keys(timeData),
    datasets: [
      {
        label: "Time Spent (seconds)",
        data: Object.values(timeData),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>Daily Goal: {goal} mins</h3>
      <input
        type="number"
        value={goal}
        onChange={(e) => setGoal(Number(e.target.value))}
      />
      <Bar data={chartData} />
    </div>
  );
}

export default App;

