# belly-button-challenge

# Interactive Dashboard for Bacterial Analysis

This repository contains an interactive dashboard that visualizes bacterial analysis data using D3.js and Plotly.js. The dashboard provides metadata, bar charts, and bubble charts to represent the bacterial cultures found in different samples.

## Features

- Dropdown menu to select different sample IDs
- Dynamic metadata panel updating with selected sample information
- Interactive bar chart showing the top 10 bacterial cultures found in each sample
- Interactive bubble chart displaying the bacterial cultures per sample

## Files

- `index.html`: Main HTML file containing the structure of the dashboard
- `app.js`: JavaScript file containing the logic for fetching data, building charts, and updating metadata
- `samples.json`: JSON file containing the sample data used for analysis

## Usage

To use this dashboard, clone this repository and open `index.html` in your preferred web browser. The dashboard will automatically load the data and display the default sample's information.

Alternatively, the report is available online directly using Github Pages at https://jgraves79.github.io/belly-button-challenge/

### Functions in `app.js`

#### `init()`

This function runs on page load to initialize the dashboard:
- Fetches data from `samples.json`
- Populates the dropdown menu with sample IDs
- Builds charts and metadata panel with the first sample

#### `optionChanged(newSample)`

This function is called whenever a new sample is selected from the dropdown:
- Rebuilds charts and metadata panel with the selected sample

#### `buildMetadata(sample)`

This function builds the metadata panel with information from the selected sample:
- Fetches metadata from `samples.json`
- Filters metadata for the desired sample number
- Updates the metadata panel with key-value pairs of the sample's metadata
- Logs the metadata to the console

#### `buildCharts(sample)`

This function builds the bar and bubble charts with data from the selected sample:
- Fetches sample data from `samples.json`
- Filters data for the desired sample number
- Builds a bubble chart with OTU IDs and sample values
- Builds a bar chart with the top 10 bacterial cultures found in the sample

## Dependencies

- [D3.js](https://d3js.org/)
- [Plotly.js](https://plotly.com/javascript/)

## License

This project is licensed under the MIT License.

