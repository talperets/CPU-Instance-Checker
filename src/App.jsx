import { useState } from "react";
import { DateTime } from "luxon";
import "./App.css";
import LineChart from "./components/LineChart";

function App() {
  const [endTime, setEndtime] = useState(null);
  const [startTime, setstartTime] = useState("");
  const [period, setPeriod] = useState("");
  const [IP, setIP] = useState("");
  const [data, setData] = useState({
    Datapoints: [
      {
        Timestamp: "2014-04-09T11:18:00Z",
        Maximum: 44.79,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T20:18:00Z",
        Maximum: 47.92,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T19:18:00Z",
        Maximum: 50.85,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T09:18:00Z",
        Maximum: 47.92,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T03:18:00Z",
        Maximum: 76.84,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T21:18:00Z",
        Maximum: 48.96,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T14:18:00Z",
        Maximum: 47.92,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T08:18:00Z",
        Maximum: 47.92,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T16:18:00Z",
        Maximum: 45.55,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T06:18:00Z",
        Maximum: 47.92,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T13:18:00Z",
        Maximum: 45.08,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T05:18:00Z",
        Maximum: 47.92,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T18:18:00Z",
        Maximum: 46.88,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T17:18:00Z",
        Maximum: 52.08,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T07:18:00Z",
        Maximum: 47.92,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T02:18:00Z",
        Maximum: 51.23,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T12:18:00Z",
        Maximum: 47.67,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-08T23:18:00Z",
        Maximum: 46.88,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T10:18:00Z",
        Maximum: 51.91,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T04:18:00Z",
        Maximum: 47.13,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T15:18:00Z",
        Maximum: 48.96,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T00:18:00Z",
        Maximum: 48.16,
        Unit: "Percent",
      },
      {
        Timestamp: "2014-04-09T01:18:00Z",
        Maximum: 49.18,
        Unit: "Percent",
      },
    ],
    Label: "CPUUtilization",
  });

  const handleTimePeriodChange = (e) => {
    const now = DateTime.utc();
    setEndtime(now.toISO());

    switch (e.target.value) {
      case "Last Day":
        setstartTime(now.minus({ days: 1 }).toISO());
        break;
      case "Last Week":
        setstartTime(now.minus({ weeks: 1 }).toISO());
        break;
      case "Last Month":
        setstartTime(now.minus({ months: 1 }).toISO());
        break;
      default:
        break;
    }
  };
  const load = () => {
    fetch("http://localhost:3000/apitest", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        IP,
        startTime,
        endTime,
        period,
      }),
    })
      .then((response) => response.json())

      .then((data) => setData(data))

      .catch((error) => console.log(error));
  };

  const chartData = {
    labels: data.Datapoints.map((data) => data.Timestamp),
    datasets: [
      {
        label: "Maximum",
        data: data.Datapoints.map((data) => data.Maximum),
        borderColor: "pink",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <h1>AWS Instance CPU Usage</h1>
      <label>Time Period:</label>
      <select onChange={(e) => handleTimePeriodChange(e)}>
        <option value="Last Day">Last Day</option>
        <option value="Last Week">Last week</option>
        <option value="Last Month">Last Month</option>
      </select>
      <br />
      <label>Period:</label>
      <input
        type="number"
        onChange={(e) => {
          setPeriod(e.target.value);
        }}
      />
      <br />
      <label>IP Address:</label>
      <input
        type="text"
        onChange={(e) => {
          setIP(e.target.value);
        }}
      />
      <button onClick={load}>Load</button>
      <br />
      <LineChart chartData={chartData} />
    </>
  );
}

export default App;
