// ===============================
// 1. Load uploaded city table
// ===============================
var citiesTable = ee.FeatureCollection('projects/ietodoapp-7ed1d/assets/cities');

// Build point geometry explicitly from lat/lon columns
var cities = citiesTable.map(function(f) {
  var lon = ee.Number.parse(f.get('lon'));
  var lat = ee.Number.parse(f.get('lat'));
  var point = ee.Geometry.Point([lon, lat]);
  return ee.Feature(point, f.toDictionary());
});   

// ===============================
// 2. Create 25 km buffers
// ===============================
var cityBuffers = cities.map(function(f) {
  return f.buffer(25000);
});

// ===============================
// 3. Load VIIRS annual datasets
// ===============================
var viirs_v21 = ee.ImageCollection('NOAA/VIIRS/DNB/ANNUAL_V21');
var viirs_v22 = ee.ImageCollection('NOAA/VIIRS/DNB/ANNUAL_V22');

print('VIIRS V21', viirs_v21);
print('VIIRS V22', viirs_v22);

// ===============================
// 4. Visual checks
// ===============================
print('Cities table preview', cities.limit(5));
print('Buffered cities preview', cityBuffers.limit(5));

Map.centerObject(cities, 4);
Map.addLayer(cities, {color: 'red'}, 'City points');
Map.addLayer(cityBuffers, {color: 'blue'}, '25 km buffers');

// ===============================
// 5. Define years to use
// ===============================
var years = ee.List.sequence(2013, 2024);

// ===============================
// 6. Function to get correct image for a year
// ===============================
var getImageForYear = function(year) {
  year = ee.Number(year).toInt();

  var collection = ee.ImageCollection(
    ee.Algorithms.If(year.lte(2021), viirs_v21, viirs_v22)
  );

  var image = collection
    .filter(ee.Filter.calendarRange(year, year, 'year'))
    .first();

  return ee.Image(image);
};

// ===============================
// 7. Function to summarize one year
// ===============================
var summarizeYear = function(year) {
  year = ee.Number(year).toInt();

  var image = getImageForYear(year).select('average_masked');

  var stats = image.reduceRegions({
    collection: cityBuffers,
    reducer: ee.Reducer.mean()
      .combine({
        reducer2: ee.Reducer.median(),
        sharedInputs: true
      })
      .combine({
        reducer2: ee.Reducer.max(),
        sharedInputs: true
      })
      .combine({
        reducer2: ee.Reducer.count(),
        sharedInputs: true
      }),
    scale: 500
  });

  return stats.map(function(f) {
    return ee.Feature(f.geometry(), f.toDictionary())
      .set('year', year);
  });
};

// ===============================
// 8. Test one year first
// ===============================
var testResults = summarizeYear(2013);
print('Test results 2013', testResults.limit(10));

// ===============================
// 9. Full run
// ===============================
var yearlyCollections = years.map(summarizeYear);
var results = ee.FeatureCollection(yearlyCollections).flatten();

print('Results preview', results.limit(10));

// ===============================
// 10. Export
// ===============================
Export.table.toDrive({
  collection: results,
  description: 'viirs_city_panel_2013_2024',
  folder: 'earthengine',
  fileNamePrefix: 'viirs_city_panel_2013_2024',
  fileFormat: 'CSV'
});