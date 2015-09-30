#!/bin/bash

echo "This is a script to setup protractor"

read -p "Install java developer kit...   			press return"
sudo apt-get install openjdk-7-jdk

read -p "Install protractor... 			            press return"
sudo npm install -g protractor

read -p "Update webdriver-manager...     			press return"
sudo webdriver-manager update

read -p "Install google chrome (not chromium)		press return"
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
sudo apt-get update
sudo apt-get install google-chrome-stable

read -p "Starting selinium KEEP TERMINAL OPEN...	press return"
sudo webdriver-manager start
