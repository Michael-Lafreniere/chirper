export const getCountryData = data => {
  let results = [];
  data.map(country =>
    results.push({ key: country.countryShortCode, data: country.countryName })
  );
  return results;
};

export const getRegionData = (countryName, data) => {
  let country = data.filter(country => country.countryName === countryName);
  if (country !== undefined) {
    let results = [];
    country[0].regions.map(region =>
      results.push({ key: region.shortCode, data: region.name })
    );
    return results;
  }
  return [];
};
