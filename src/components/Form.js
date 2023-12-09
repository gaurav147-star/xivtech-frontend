import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Box, Paper, Typography } from "@mui/material";

const Form = () => {
  const [cities, setCities] = useState([""]);
  const [weatherData, setWeatherData] = useState({});

  const handleInputChange = (index, event) => {
    const newCities = [...cities];
    newCities[index] = event.target.value;
    setCities(newCities);
  };

  const addCityInput = () => {
    const newCities = [...cities, ""];
    setCities(newCities);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://xivtech-backend-uvoc.onrender.com/getWeather",
        {
          cities,
        }
      );
      setWeatherData(response.data.weather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        marginTop: "50px",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          width: "500px",
        }}
      >
        {cities.map((city, index) => (
          <Box key={index} sx={{ display: "flex", gap: "10px" }}>
            <TextField
              label={`City ${index + 1}`}
              value={city}
              onChange={(event) => handleInputChange(index, event)}
              sx={{ display: "flex", gap: "10px", marginBottom: "10px" }}
            />
            {index === cities.length - 1 && (
              <Button
                variant="contained"
                onClick={addCityInput}
                startIcon={<AddIcon />}
                size="small"
              >
                Add City
              </Button>
            )}
          </Box>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: "20px" }}
        >
          Get Weather
        </Button>
        <Box sx={{ marginTop: "20px", width: "100%" }}>
          {Object.keys(weatherData).map((city) => (
            <Paper key={city} sx={{ padding: "10px", marginBottom: "10px" }}>
              <Typography
                variant="subtitle1"
                sx={{ fontSize: "25px", fontWeight: "600" }}
              >
                {city.charAt(0).toUpperCase() + city.slice(1)}
              </Typography>
              <Typography variant="body1">
                Temperature: {weatherData[city]}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
