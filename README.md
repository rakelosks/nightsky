# The Disappearing Night Sky in Europe

## Project overview
This project studies how artificial nighttime brightness has evolved across European cities over the past decade and which urban characteristics are associated with higher levels and faster growth of light pollution. The broader narrative is the disappearance of the night sky due to urban development, with a possible extension on satellite mega-constellations as an emerging additional threat.

## Core research question
How has artificial nighttime brightness evolved across European cities over the past decade, and which urban characteristics are associated with higher levels and faster growth of light pollution?

## Optional extension
How might satellite mega-constellations further threaten Europe’s remaining dark sky regions?

## Data sources
- VIIRS Nighttime Lights (Earth Observation Group / NOAA-based products)
- OpenStreetMap data via Overpass API
- Eurostat Statistics API
- CelesTrak Starlink GP data (extension)

## Planned methods
- Data collection via APIs and public downloads
- Geospatial aggregation at city level
- Exploratory data analysis and mapping
- Time series analysis of light pollution trends
- Regression modeling using urban characteristics
- Optional clustering of city trajectories
- Optional satellite overlay analysis

## Repository structure
- `data/`: raw, interim, and processed data
- `notebooks/`: notebooks in execution order
- `src/`: reusable scripts and helper functions
- `outputs/`: figures, maps, and tables
- `report/`: report draft material
- `slides/`: presentation material

## Reproducibility
All notebooks are intended to run top-to-bottom. Data download or API instructions will be documented here as the project progresses.

## Team roles
- Project Lead: Rakel 
- Data Acquisition Team: José, Brian
- Analysis Team: Jenna, Neal, Fares
- Report & Presentation Lead: Marevi
