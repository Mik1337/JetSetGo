/**
 * CityCodes are used to map city names to their respective airport codes
 * This speeds up lookup times and reduces the need to make additional API calls
 */

interface CityCodeType {
  [key: string]: string;
}

export const CityCodes: CityCodeType = {
  bom: 'BOM',
  bombay: 'BOM',
  mumbai: 'BOM',

  del: 'DEL',
  delhi: 'DEL',
  newDelhi: 'DEL',

  maa: 'MAA',
  chennai: 'MAA',
  madras: 'MAA',
};

// note: i have hardcoded only the city codes the api is using
// if the api is expanded to include more cities, we can add them here
// i checked the city codes using this
// curl https://api.npoint.io/4829d4ab0e96bfab50e7 | jq '.data.result[].displayData.source.airport.cityName'
// curl https://api.npoint.io/4829d4ab0e96bfab50e7 | jq '.data.result[].displayData.destination.airport.cityName'
