#!/bin/bash

#update repository and get prerequesits
sudo apt-get update
sudo apt-get install mongodb git build-essential openssl libssl-dev pkg-config

#get nodejs this will include npm
cd ~
wget http://nodejs.org/dist/v0.10.33/node-v0.10.33.tar.gz

#extract the tar file
tar xzvf node-v*
cd node-v*

#compile application
./configure
make

#install on distro
sudo make install

#now that its installed cleanup
cd ~
rm -rf ~/node-v*

#use npm to install bower/grunt
sudo npm install -g bower grunt-cli

####Alternative here is to clone meanjs if a blank project is needed####
https://github.com/neumannk/wxyz.git /opt/mean

cd /opt/mean
sudo npm install

sudo bower --allow-root --config.interactive=false install
