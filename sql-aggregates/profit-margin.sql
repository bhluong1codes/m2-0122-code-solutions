WITH film_cost AS (
 select
    "films"."filmId",
    count("inventory".*)*"films"."replacementCost" as totalCost
    from films
    join inventory using ("filmId")
  group by "filmId"
),


film_revenue AS (
  select
    "films"."filmId",
    "films"."title",
    "films"."description",
    "films"."rating",
    sum("payments"."amount") as totalPayment
    from films
    join inventory using ("filmId")
    join rentals using ("inventoryId")
    join payments using ("rentalId")
  group by "filmId"
)

 select
    title,
    description,
    rating,
    totalPayment - totalCost AS totalProfit
    from film_revenue
    join film_cost using ("filmId")
    ORDER BY totalProfit desc
    limit 5;
