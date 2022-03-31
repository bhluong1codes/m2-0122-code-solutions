select "customers"."firstName",
  "customers"."lastName",
  sum("payments"."amount") as "totalPayment"
  from "customers"
  join "payments" using ("customerId")
  group by "customerId"
  order by "totalPayment" desc;
