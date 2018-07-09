
# Rijksmuseum Collection

See [Overview of Rijksmuseum Collection](https://www.johnvincent.io/johnvincent/rijksmuseum-overview/)

### Sass Compiler

./collection/resources/sass-compiler is a script to compile SCSS files to css.

### Node HTTP Server

Script to install and/or start.

```
#!/bin/sh
#
# script to create and start a node http server
#
# ref:
# https://www.npmjs.com/package/http-server
#

echo "Script to create and start a node http server"
echo " "
PORT=$1
if [ -z "$PORT" ]; then
    echo "Usage: node-http-server port"
    exit 1
fi
#
# check whether jitsu is installed
#
if [ ! -f "/usr/local/bin/jitsu" ]; then
    echo "Installing jitsu."
    npm install jitsu -g
fi
#
CURRENT_DIR="`pwd`"
NODE_SERVER_DIR="`pwd`/http-server"
echo "http-server directory: $NODE_SERVER_DIR port: $PORT"
#
echo "Checking if node server directory $NODE_SERVER_DIR already exists"
if [ ! -d "$NODE_SERVER_DIR" ]; then
#
# install http-server
#
    echo "Creating node server at http-server"
    jitsu install http-server
fi
#
echo "cd to http-server"
cd http-server

#
# starting the server
#
pwd
echo "Starting the http-server, caching turned off"
node bin/http-server -p $PORT -c-1 $CURRENT_DIR
#
# done
#
echo " "
echo "Completed"
#

```

To start an instance of the HTTP Server:

```
node-http-server 8080
```

