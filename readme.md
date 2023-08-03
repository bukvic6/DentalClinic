RUN: docker-compose up

DENTIST EMAIL: zubar@mail.com  

-------------------------------------

INFO: An email will be sent to the USER only on appointment cancellation.
      The backend lacks a few validation checks

TODO:
      Need to change dependency array for calendar component *in the future* -> for now it renders page again

-------------------------------------

access database from docker container:
  - docker exec -it clinic_db bash
  - psql -U postgres

show list of relations:
  - \dt

-------------------------------------

front on: localhost:3000
backend on: localhost:8081

-------------------------------------
![Screenshot from 2023-08-03 11-42-27](https://github.com/bukvic6/DentalClinic/assets/79896979/e60b24e9-e7a3-475e-980a-6c432a62e4c4)
![Screenshot from 2023-08-03 11-45-47](https://github.com/bukvic6/DentalClinic/assets/79896979/cadcb097-625b-4da6-8240-a2ac78213789)
![Screenshot from 2023-08-03 11-48-17](https://github.com/bukvic6/DentalClinic/assets/79896979/8caba17e-4950-4da9-b2b3-3221341bbca4)


