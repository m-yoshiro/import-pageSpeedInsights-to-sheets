import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config();

const pageSpeedApi = google.pagespeedonline('v5');

const options = {
  url: process.env.URL,
  key: process.env.APIKEY,
  locale: 'ja',
  strategy: 'mobile',
};

// node.js
const request = async (options) => {
  const { data } = await pageSpeedApi.pagespeedapi.runpagespeed(options);

  const result: object = {
    strategy: data.lighthouseResult.configSettings.emulatedFormFactor,
    FIRST_CONTENTFUL_PAINT_MS: {
      id: 'FCP',
      title: 'コンテンツの初回ペイント（FCP）',
      ...data.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS,
    },
    FIRST_INPUT_DELAY_MS: {
      id: 'FID',
      title: '初回入力遅延（FID）',
      ...data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS,
    },
    labData: {
      id: 'labData',
      title: 'ラボデータ',
      ...data.lighthouseResult.audits,
    },
    categories: {
      ...data.lighthouseResult.categories,
    }
  }
  console.log(result)
}

request(options);
