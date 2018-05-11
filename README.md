#Deric Panet-Raymond IoT Test submission

This application uses Docker Compose to instantiate the three different containers.  There is a mongodb instance that is used to store 
the device data, a simulation application that use Express, React, and Node to create the RESTful interface and the UI for interacting
with the simulation and finally the Dashboard, a Node/Express container that uses Websockets to receive the device data from the Database.  
Whenever the database is modified through the REST interface an "device_data" event is generated which contains all the device data from 
the DB.

## Required Software

* Docker
* Docker Compose

## Deploying

Download or checkout the project, the root directory should container a docker-compose.yml file.  To start run

```
docker-compose up --build
```
This will kick off the container download and build process and launch the containers.  When completed you should be able to see three containers running

```
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS                      NAMES
da6fab816862        deric_test_simulator   "npm start"              About an hour ago   Up 11 seconds       0.0.0.0:3000->3000/tcp     simulator
8d38db56a3b3        deric_test_dashboard   "node index.js"          About an hour ago   Up 12 seconds       0.0.0.0:4000->4000/tcp     dashboard
0967aa4ec6be        mongo:latest           "docker-entrypoint.s…"   31 hours ago        Up 12 seconds       0.0.0.0:27017->27017/tcp   mongodb
```

## Console Output

This application has been tested on a Macbook Pro running High Sierra 10.13.4.  It was tested on Windows, but the simulator was not able to connect to the Mongo container.  it was also tested in a Linux VM, and things start but the Simulator application seems to have a pathing error I wasn't able to resolve in time, I believe it has to do with running the containers in a VM.

You might see the following in the docker-compose command output when you first start

```
