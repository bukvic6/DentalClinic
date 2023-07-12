RUN: docker-compose up

DENTIST EMAIL: zubar@mail.com  

-------------------------------------

INFO: An email will be sent to the USER only on appointment cancellation.
      The backend lacks a few validation checks

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




