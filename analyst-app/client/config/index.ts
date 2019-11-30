import fs from 'fs';

let config: IConfig = {
  isProdApi: true,
};

if (fs.existsSync('./config.json')) {
  config = require('./config.json');
}

export interface IConfig {
  isProdApi: boolean;
}

const configTypescriptBridge: IConfig = {
  isProdApi: config.isProdApi,
};

export default configTypescriptBridge;
