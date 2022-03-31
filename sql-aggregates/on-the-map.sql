select "countries"."name",
  count("cities".*) as "numOfCities"
  from "countries"
  join "cities" using ("countryId")
  group by "countries"."countryId";
