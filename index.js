const axios = require('axios');
const ruuvi = require('node-ruuvitag');
const config = require('./config.json');

const {interval, dweetName} = config;
const millis = interval * 60 * 1000;
const dweetUrl = `https://dweet.io/dweet/for/${dweetName}`;
const tags = {};

const time = () => {
  const now = new Date();
  return `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
};

const log = (msg) => {
  console.log(`[${time()}] ${msg}`);
};

log('Started to look for RuuviTags...');
ruuvi.on('found', tag => {
  log('Found RuuviTag, id: ' + tag.id);
  tags[tag.id] = {
    updated: 0
  };
  tag.on('updated', data => {
    log(`Got data from ${tag.id}`);
    const now = Date.now();
    const latestPost = tags[tag.id].updated;
    if (latestPost + millis > now) {
      // Not enough time has passed since last post, so skip Dweeting
      return;
    }
    tags[tag.id] = {...data, updated: now};
    log(`Posting tags to ${dweetUrl}`);
    axios.post(dweetUrl, tags).catch(console.error);
  });
});

ruuvi.on('warning', message => {
  console.error(new Error(message));
});
