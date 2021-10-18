# SCREEN PROJECT DOCUMENTATION

# PM2 Documentations

## list server 
````cmd
$ pm2 list
````

## start new server with ecosystem
````cmd
$ pm2 start npm ecosystem.config.js
````

## start new server without ecosystem
````cmd
$ pm2 start --name "app" -- run dev

````
<center>
<h3>OR</h3>
</center>

````cmd
$ pm2 start --name "app" -- start dev

````

## Start a simple node server

````cmd
$ pm2 start server.js

````

## Delete server into PM2
````cmd
$ pm2 delete "app"

````
## Restart PM2 server


````cmd
$ pm2 start restart "app"

````

## PM2 log serve
````cmd
$ pm2 log


$ pm2 log "id"
````