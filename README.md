Deric Panet-Raymond IoT Test submission

This application uses Docker Compose to instantiate the three different containers.  There is a mongodb instance that is used to store 
the device data, a simulation application that use Express, React, and Node to create the RESTful interface and the UI for interacting
with the simulation and finally the Dashboard, a Node/Express container that uses Websockets to receive the device data from the Database.  
Whenever the database is modified through the REST interface an "device_data" event is generated which contains all the device data from 
the DB.
