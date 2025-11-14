import { exec } from 'child_process';
import { promisify } from 'util';
import { defineSource } from '~/server/utils/source';

const execAsync = promisify(exec);

interface Trend {
  topic: string;
}

export default defineSource(async () => {
  const { stdout } = await execAsync('node scrape_tiktok_trends.js');
  const trends: Trend[] = JSON.parse(stdout);
  return trends.map((trend) => {
    return {
      id: trend.topic,
      title: trend.topic,
      url: `https://www.tiktok.com/tag/${encodeURIComponent(trend.topic)}`,
      mobileUrl: `https://www.tiktok.com/tag/${encodeURIComponent(trend.topic)}`,
    };
  });
});
