// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    console.log(result);

    // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => { 
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);

    });

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    let sampleData = sampleArray[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sampleData.otu_ids; 
    let otu_labels = sampleData.otu_labels; 
    let sample_values = sampleData.sample_values

    // Build a Bubble Chart
    var bubblechart = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values,
        sizemode: 'area'
      }
    }];

    var bubbleLayout = {
      title: 'Bacteria Cultures per Sample',
      showlegend: false,
      height: 600,
      width: 1000,
      xaxis: { title: 'OTU ID'},
      yaxis: { title: 'Number of Bacteria' }
    };
    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubblechart, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    var barData = [{
       x: sample_values.slice(0, 10).reverse(), 
       y: yticks, 
       text: otu_labels.slice(0, 10).reverse(), 
       type: 'bar', 
       orientation: 'h', 
      }];

      var barLayout = {
      title: 'Top 10 Bacteria Cultures Found', 
      xaxis: { title: 'Number of Bacteria'},
      margin: { t: 30, l: 150 } 
    };
    // Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((name) => { 
      dropdown.append("option").text(name).property("value", name);
    });

    // Get the first sample from the list
    const firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);

  });
}

// Function for event listener
function optionChanged(sample) {

  // Build charts and metadata panel each time a new sample is selected
buildCharts(sample); 
buildMetadata(sample);
}

  // Initialize the dashboard
init();
