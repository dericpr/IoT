# Deric Panet-Raymond IoT Test submission

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
simulator    | { MongoNetworkError: failed to connect to server [mongodb:27017] on first connect [MongoNetworkError: connect ECONNREFUSED 172.21.0.3:27017]
simulator    |     at Pool.<anonymous> (/node_modules/mongodb-core/lib/topologies/server.js:505:11)
simulator    |     at emitOne (events.js:116:13)
simulator    |     at Pool.emit (events.js:211:7)
simulator    |     at Connection.<anonymous> (/node_modules/mongodb-core/lib/connection/pool.js:329:12)
simulator    |     at Object.onceWrapper (events.js:317:30)
simulator    |     at emitTwo (events.js:126:13)
simulator    |     at Connection.emit (events.js:214:7)
simulator    |     at Socket.<anonymous> (/node_modules/mongodb-core/lib/connection/connection.js:245:50)
simulator    |     at Object.onceWrapper (events.js:315:30)
simulator    |     at emitOne (events.js:116:13)
simulator    |     at Socket.emit (events.js:211:7)
simulator    |     at emitErrorNT (internal/streams/destroy.js:64:8)
simulator    |     at _combinedTickCallback (internal/process/next_tick.js:138:11)
simulator    |     at process._tickCallback (internal/process/next_tick.js:180:9)
simulator    | From previous event:
simulator    |     at NativeConnection.Connection.openUri (/node_modules/mongoose/lib/connection.js:424:19)
simulator    |     at Mongoose.connect (/node_modules/mongoose/lib/index.js:207:15)
simulator    |     at dbConnect (/app.js:41:12)
simulator    |     at Object.<anonymous> (/app.js:53:3)
simulator    |     at Module._compile (module.js:652:30)
simulator    |     at Object.Module._extensions..js (module.js:663:10)
simulator    |     at Module.load (module.js:565:32)
simulator    |     at tryModuleLoad (module.js:505:12)
simulator    |     at Function.Module._load (module.js:497:3)
simulator    |     at Module.require (module.js:596:17)
simulator    |     at require (internal/module.js:11:18)
simulator    |     at Object.<anonymous> (/bin/www:7:11)
simulator    |     at Module._compile (module.js:652:30)
simulator    |     at Object.Module._extensions..js (module.js:663:10)
simulator    |     at Module.load (module.js:565:32)
simulator    |     at tryModuleLoad (module.js:505:12)
simulator    |     at Function.Module._load (module.js:497:3)
simulator    |     at Function.Module.runMain (module.js:693:10)
simulator    |     at startup (bootstrap_node.js:188:16)
simulator    |     at bootstrap_node.js:609:3
simulator    |   name: 'MongoNetworkError',
simulator    |   message: 'failed to connect to server [mongodb:27017] on first connect [MongoNetworkError: connect ECONNREFUSED 172.21.0.3:27017]' }
simulator    | Setting timeout or 1 second to reconnect
```
This is normal, the mongo instance hasn't had a chance to start properly and so the simulator app will try to reconnect every second until it is succesful  you will see the following message when it's connected

```
simulator    | Connected!
```

## Connecting to the Simulator

open a browser and go to http://localhost:3000

## Connecting to the Dashboard

open a browser and go to http://localhost:4000/devices

## Operating the Application

Use the simulator to add / delete / edit device entries.  Once the change is completed the Dashboard will fadeout and fade back in with the new data.
