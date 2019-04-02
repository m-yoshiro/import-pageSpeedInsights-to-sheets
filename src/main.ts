import * as dotenv from 'dotenv';
import pageSpeedApi from "./pageSpeedApi";

dotenv.config();

const options = {
  url: process.env.URL,
  key: process.env.APIKEY,
  locale: 'ja',
  strategy: 'mobile',
};

const request = pageSpeedApi(options).then(data => console.log(data));
