select "a"."line1",
  "a"."district",
  "c"."name" as "city",
  "co"."name" as "country"
  from "addresses" as "a"
  join "cities" as "c" using ("cityId")
  join "countries" as "co" using ("countryId");
