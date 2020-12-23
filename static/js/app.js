//Read in the file using D3

const url = "data/samples.json"


// init function
function init() {
    d3.json(url).then(function(data) {
        var namesArray = data.names;
        var dropdown = d3.select("#selDataset");
        namesArray.forEach(function(name) {
            var option = dropdown.append("option");
            option.property("value", name);
            option.text(name);
        });
        updatePlotly(namesArray[0]);
    });
}

init()

//Update all of the plots any time that a new sample is selected.

d3.selectAll("#selDataset").on("change", updatePage)

function updatePage() {
    var dropdown = d3.select("#selDataset");
      // Assign the dropdown menu item ID to a variable
    var selectedOption = dropdown.property("value");
    // Assign the dropdown menu option to a variable

    console.log(selectedOption);
    updatePlotly();
};

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs 
//found in that individual. Act. 15-03-06

function updatePlotly(name) {
    d3.json(url).then(function(data) {
        var filteredSampleData = data.samples.filter((sample) => sample.id === name)[0];
        console.log(filteredSampleData);
        // console.log("updatePlotly -> name type", typeof(name) )
        var filteredMetaData = data.metadata.filter((meta) => String(meta.id) === name)[0];
        console.log(filteredMetaData);
        var sample_values = filteredSampleData.sample_values;
        var otu_ids = filteredSampleData.otu_ids;
        var otu_labels = filteredSampleData.otu_labels;
        var id = filteredMetaData.id;
        var ethnicity = filteredMetaData.ethnicity;
        var gender = filteredMetaData.gender;
        var age = filteredMetaData.age;
        var location = filteredMetaData.location;
        var bbtype = filteredMetaData.bbtype;
        var wfreq = filteredMetaData.wfreq;

        //Bar Chart

        var sliced_values = filteredSampleData.sample_values.slice(0, 10).reverse()
        //make a string
        var sliced_otu_ids = String(filteredSampleData.otu_ids.slice(0, 10).reverse())
        var sliced_otu_labels = filteredSampleData.otu_labels.slice(0, 10).reverse()

        var trace1 = {
            x: sliced_values,
            y: sliced_otu_ids,
            text: sliced_otu_labels,
            type: "bar",
            orientation: "h"
        };
    // sort and slice top items
        var bardata = [trace1];

        var layout1 = {
            title: "Top 10 OTUs",
            xaxis: { title: "Number of Samples" },
            yaxis: { title: "OTU ID" }
        };

        Plotly.newPlot("bar", bardata, layout1);

//Create a bubble chart that displays each sample.

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            text: otu_labels,
            marker: { color: otu_ids,
                size: sample_values
            }
        };

        var bubbledata = [trace2];

        var layout2 = {
            title: "Sample size by OTU ID",
            xaxis: { title: "OTU ID"},
            yaxis: { title: "Sample Value"}
        };

        Plotly.plot("bubble", bubbledata, layout2);

    //Display the sample metadata, i.e., an individual's demographic information.

        d3.select("panel-body")
            .select("#table")
            .data(filteredMetaData)
            .enter()
            .append("tr")
            .html(function(md) {
                return `<td>${md.id}</td><td>${md.ethnicity}</td><td>${md.gender}</td><td>${md.age}</td><td>${md.location}</td><td>${md.bbtype}</td><td>${md.wfreq}</td>`
            });

        // filteredMetaData.forEach(function(metaTable) {
        //     console.log(metaTable);
        // })

});

}


//Update all of the plots any time that a new sample is selected.

// d3.selectAll("#selDataset").on("change", updatePlotly);

// function updatePlotly() {
//     var dropdown = d3.select("#selDataset")
//         .append;
//     var dataset = dropdown.property("value");
// };

