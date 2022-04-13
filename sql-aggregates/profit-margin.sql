WITH film_cost AS (
  SELECT
    "films"."title",
    count("inventory".*)*"films"."replacementCost" as totalCost
    from films
    join inventory using ("filmId")
  group by "films"."filmId"
),

film_revenue AS (
  SELECT
    "films"."title",
    "films"."description",
    "films"."rating",
    sum("payments"."amount") as totalPayment
    from films
    join inventory using ("filmId")
    join rentals using ("inventoryId")
    join payments using ("rentalId")
    group by "films"."filmId"

)

select
  title,
  description,
  rating,
  totalPayment - totalCost AS totalProfit
  from film_revenue
  join film_cost using ("title")
ORDER BY totalProfit desc;
