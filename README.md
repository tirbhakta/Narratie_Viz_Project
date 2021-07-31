# CS 416: A Narrative Visualization project by Tirthankar Bhakta
# Email: tbhakta2@illinois.edu
# COVID-19 Dashboard Narrative Visualization

## Introduction:

Dashboard to display total cases, casualties, recoveries and active cases worldwide. 
There is a link in the Dashboard that navigates to my Github repository where this page is hosted.

The Dashboard consists of 2 graphs: 

1. Country-wise Covid-19 Statistics ScatterPlot (Total Recovered versus Total Confirmed)
2. Worldwide Covid-19 Summarized Line Graph (summarized parameters - Total Confirmed cases, Total Recovered, Total Deaths and Total Active Cases)


## Usage: 

The dashboard has some functionalities:
1. Country-wise Covid-19 Statistics ScatterPlot - 

   a) on mouse hover show the Country
   
   b) X-axis denotes the Total Recovered Cases per country
   
   c) Y-axis denotes the Total Confirmed Cases per Country
   
   d) Random colors to distinguish each country
   

2. Covid-19 Summarized Line Graph - 

   a) Each parameter is displayed in a separate color
   
   b) Aggregated values of Total Confirmed cases, Recovered, Deaths and Active across all countries
   
   c) Y-axis displays the countries
   
   d) X-axis displays the aggregated parameters in tick format
   
   e) Static tooltip with a circle overlay showing the exact count for each parameter
   

## Technical files: 
### D3.js files:

The following files are used to visualize the graphs: 

1. d3 js files/scatterPlotWorld.js** is for the country-wise statistics ScatterPlot graph. 
2. d3 js files/worldSummary.js** renders the Worldwide summarized Line graph.

### Data file
World_Covid_Data.csv - this is the main Covid-19 datasheet used. This is referenced from the public site https://ourworldindata.org/coronavirus-source-data

### HTML Webpage:
index.html - this is the main HTML file for the Dashboard

### CSS file:
bootStrap.css - generic CSS file used for styling. Core CSS properties and values are inline in the HTML file and the D3.js files

### LINKS:
Github Repo: https://github.com/tirbhakta/Narrative_Viz_Project

Github Page: https://tirbhakta.github.io/Narrative_Viz_Project/

***** Thank you for visiting my Dashboard *****
