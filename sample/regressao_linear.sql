
-- Criar o modelo
CREATE or REPLACE MODEL `meetup.taxyFare_model` 
OPTIONS
 (model_type='linear_reg', input_label_cols=['total_fare'], min_rel_progress=0.005) AS
 --1)Linear regression 2)Binary logistic regression 3)Multiclass logistic regression for classification
 
SELECT * FROM `meetup.taxyFare` 




-- Quem testar o modelo
  select * except(total_fare, passengers, dayofweek, hourofday), count(1) qtde
  from `meetup.taxyFare`
  group by 1,2,3,4
  having qtde > 1
  order by qtde desc
  
  select *  from `meetup.taxyFare`
     where pickuplon = -73.99268341064453
     and pickuplat = 	40.72050094604492
     and dropofflon = -73.99268341064453	
     and dropofflat = 40.72050094604492





-- Como ficou o resultado usando a predição
SELECT
 *
FROM
  ML.PREDICT(MODEL `meetup.taxyFare_model`, (
     select * except(total_fare) from `meetup.taxyFare`
     where pickuplon = -73.99268341064453
     and pickuplat = 	40.72050094604492
     and dropofflon = -73.99268341064453	
     and dropofflat = 40.72050094604492
  )) 
  
