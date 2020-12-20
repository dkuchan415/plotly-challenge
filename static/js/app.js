//Read in the file using D3

const url = "data/samples.json"

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs 
//found in that individual. Act. 15-03-06

d3.json(url).then(function(data) {
    console.log(data);
    var sample_values = data.samples[0].sample_values;
    var otu_ids = data.samples[0].otu_ids;
    var otu_labels = data.samples[0].otu_labels;
    var trace1 = {
        x: sample_values,
        y: otu_ids,
        type: "bar" 
    };

    // sort and slice top items
    var bardata = [trace1];

    var layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Number of Samples" },
        yaxis: { title: "OTU ID" }
    };

    Plotly.newPlot("bar", bardata, layout);
});

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs 
//found in that individual.

