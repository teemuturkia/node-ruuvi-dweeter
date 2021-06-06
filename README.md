# node-ruuvi-dweeter
This script is meant to run on Raspberry Pi. It reads data from [RuuviTag](https://ruuvi.com) and send it to [Dweet.io](http://dweet.io/).

## Before You Begin
Copy template-config.json to config.json and edit the values.
- interval: How many minutes should be between Dweet posting
- dweetName: Unique name that you'll be using to fetch your data

Check README.md on https://github.com/sandeepmistry/noble#running-on-linux to see how to authorize the adapter state so that sudo is not needed when running this.

## Prerequisites
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
```bash
$ npm install
```

## Run
You might want to run this script in Screen.
```bash
$ node index.js
```
