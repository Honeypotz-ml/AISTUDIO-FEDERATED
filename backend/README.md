
#AISTUDIO FEDERATED - template backend,

#### Run App on local machine:

##### Install local dependencies:
- `yarn install`

------------

##### Adjust local db:
###### 1.  Install postgres:
 - MacOS:
   - `brew install postgres`

- Ubuntu:
  - `sudo apt update`
  - `sudo apt install postgresql postgresql-contrib`

###### 2. Create db and admin user:
 - Before run and test connection, make sure you have created a database as described in the above configuration. You can use the `psql` command to create a user and database.
   - `psql postgres --u postgres`

- Next, type this command for creating a new user with password then give access for creating the database.
  - `postgres-# CREATE ROLE admin WITH LOGIN PASSWORD 'admin_pass';`
  - `postgres-# ALTER ROLE admin CREATEDB;`

- Quit `psql` then log in again using the new user that previously created.
  - `postgres-# \q`
  - `psql postgres -U admin`

- Type this command to creating a new database.
  - `postgres=> CREATE DATABASE db_aistudio_federated;`

- Then give that new user privileges to the new database then quit the `psql`.
  - `postgres=> GRANT ALL PRIVILEGES ON DATABASE db_aistudio_federated TO admin;`
  - `postgres=> \q`

------------

#### Api Documentation (Swagger)

http://localhost:8080/api-docs (local host)

http://host_name/api-docs

------------

 ##### Setup database tables or update after schema change
 - `yarn db:migrate`

 ##### Seed the initial data (admin accounts, relevant for the first setup):
 - `yarn db:seed`

 ##### Start build:
 - `yarn start`
