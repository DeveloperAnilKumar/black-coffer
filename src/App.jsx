import React, { useEffect, useState } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";
import MyChart from "./component/ChartContainer";
import { defaults } from "chart.js";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  //  fetch  data from api
  function getData() {
    fetch("http://localhost:8081/api/data")
      .then((res) => res.json())
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  //filter all data based on topic year etc...
  function fetchDataByFilter(endpoint, filterValue) {
    return fetch(`http://localhost:8081/api/filter/${endpoint}/${filterValue}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return [];
      });
  }

  function handleChange(endpoint, filterValue) {
    fetchDataByFilter(endpoint, filterValue).then((response) => {
      setData(response);
    });
  }

  //get all unique countries
  const uniqueCountries = [
    ...new Set(data.map((c) => c.country.trim()).filter((c) => c !== "")),
  ];

  const chartData = {
    labels: uniqueCountries.map((c) => c),
    datasets: [
      {
        label: "Intensity",
        data: data.map((c) => c.intensity ?? 0),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Likelihood",
        data: data.map((c) => c.likelihood ?? 0),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Relevance",
        data: data.map((c) => c.relevance ?? 0),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Countries Data",
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Value",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Countries",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <>
      <header>
        <h1>dashboard</h1>
      </header>
      <div className="app-container">
        {/* filters  */}
        <div className="filters-container">
          <select onChange={(e) => handleChange("endYear", e.target.value)}>
            <option value="">Select End Year</option>
            {[...new Set(data.map((item) => item.endYear))]
              .filter((endYear) => endYear)
              .map((endYear) => (
                <option key={endYear} value={endYear}>
                  {endYear}
                </option>
              ))}
          </select>
          <select onChange={(e) => handleChange("topic", e.target.value)}>
            <option value="">Select Topic</option>
            {[...new Set(data.map((item) => item.topic))]
              .filter((topic) => topic)
              .map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
          </select>
          <select onChange={(e) => handleChange("sector", e.target.value)}>
            <option value="">Select Sector</option>
            {[...new Set(data.map((item) => item.sector))]
              .filter((sector) => sector)
              .map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
          </select>
          <select onChange={(e) => handleChange("region", e.target.value)}>
            <option value="">Select Region</option>
            {[...new Set(data.map((item) => item.region))]
              .filter((region) => region)
              .map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
          </select>
          <select onChange={(e) => handleChange("pestle", e.target.value)}>
            <option value="">Select PESTLE</option>
            {[...new Set(data.map((item) => item.pestle))]
              .filter((pestle) => pestle)
              .map((pestle) => (
                <option key={pestle} value={pestle}>
                  {pestle}
                </option>
              ))}
          </select>
          <select onChange={(e) => handleChange("source", e.target.value)}>
            <option value="">Select Source</option>
            {[...new Set(data.map((item) => item.source))]
              .filter((source) => source)
              .map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
          </select>
          <select onChange={(e) => handleChange("swot", e.target.value)}>
            <option value="">Select SWOT</option>
            {[...new Set(data.map((item) => item.swot))]
              .filter((swot) => swot)
              .map((swot) => (
                <option key={swot} value={swot}>
                  {swot}
                </option>
              ))}
          </select>
          <select onChange={(e) => handleChange("country", e.target.value)}>
            <option value="">Select Country</option>
            {[...new Set(data.map((item) => item.country))]
              .filter((country) => country)
              .map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
          </select>
          <select onChange={(e) => handleChange("city", e.target.value)}>
            <option value="">Select City</option>
            {[...new Set(data.map((item) => item.city))]
              .filter((city) => city)
              .map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>

        {/* charts  */}
        <div className="chart-container">
          <div
            className="chart"
            style={{
              width: "100%",
            }}
          >
            <MyChart data={chartData} width={100} options={options} />
          </div>

          <div
            style={{
              width: "100%",
            }}
            className="chart"
          >
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
