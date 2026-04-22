# The Disappearing Night Sky in Europe

## Project overview

This project studies how artificial nighttime brightness has evolved across 30 European cities (2013-2024) and which urban characteristics are associated with higher levels and faster growth of light pollution. Using VIIRS satellite radiance data merged with Eurostat socioeconomic indicators and OpenStreetMap urban-morphology features, we build a balanced panel of 360 city-year observations and apply time-series, regression, and clustering.

## Core research question

How has artificial nighttime brightness evolved across European cities over the past decade, and which urban characteristics are associated with higher levels and faster growth of light pollution?

## Key findings

- **Aggregate brightness is declining** across the 30-city sample at -0.19 nW/cm^2/sr per year (p = 0.001), though individual city trajectories are highly heterogeneous.
- **Road density and building area** are the strongest cross-sectional predictors of nighttime brightness; green fraction is associated with lower brightness.
- **Four city archetypes** emerge from clustering: a Rotterdam extreme-outlier, a moderate-brightness declining group (11 cities), a lower-brightness stable group (16 cities), and a high-brightness pair (Athens, Paris).

## Notebook pipeline

| # | Notebook | Description |
|---|----------|-------------|
| 01 | `01_data_inventory.ipynb` | Documents the four upstream data sources, URLs, and access methods |
| 02 | `02_viirs_collection.ipynb` | Cleans the VIIRS Earth Engine export into a city-year panel (360 rows) |
| 03 | `03_osm_features.ipynb` | Extracts urban-morphology features from OpenStreetMap for 30 cities |
| 04 | `04_eurostat_data.ipynb` | Collects population, GDP, and density from the Eurostat API |
| 05 | `05_merge_panel.ipynb` | Merges VIIRS + OSM + Eurostat into the final `analysis_panel.csv` (37 columns) |
| 06 | `06_eda_and_maps.ipynb` | Exploratory data analysis: distributions, trends, correlations, and maps |
| 07 | `07_time_series.ipynb` | Trend estimation (OLS, Mann-Kendall, Theil-Sen), ADF stationarity, ARIMA forecasting |
| 08 | `08_regression.ipynb` | Pooled OLS, cross-sectional, and city fixed-effects regression with VIF and HC3 robust SEs |
| 09 | `09_clustering.ipynb` | K-Means and hierarchical clustering of cities into brightness archetypes with PCA |

## Data sources

- **VIIRS Nighttime Lights** — annual composites from NOAA/EOG via Google Earth Engine (2013-2024)
- **OpenStreetMap** — roads, buildings, land use, green areas, street lamps via Overpass API
- **Eurostat** — population (Urban Audit), GDP per capita (NUTS-3), population density
  
## Repository structure

```
nightsky/
  data/
    raw/              # Original downloads (gitignored)
    interim/          # Intermediate processing artifacts
    processed/        # Final analysis-ready CSVs
  notebooks/          # 01-09, run in order
  src/                # Google Earth Engine extraction script
  outputs/
    figures/          # All saved PNG figures
    tables/           # Exported summary tables
    maps/             # Reserved for interactive map exports
```

## Reproducibility

1. Install dependencies: `pip install -r requirements.txt`
2. Notebooks 01-05 require API access (Earth Engine, Overpass, Eurostat). The processed data files in `data/processed/` are committed so notebooks 06-09 can run independently.
3. All analytical notebooks (06-09) run top-to-bottom from `data/processed/analysis_panel.csv`.
4. Random seeds are set in notebooks 07-09 for reproducibility (`np.random.seed(42)`).

## Team

- Project Lead: Rakel
- Data Acquisition: Jose, Brian
- Analysis: Jenna, Neal, Fares
- Report & Presentation: Marevi
