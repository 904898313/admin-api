import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};
// 读取项目配置
export default () => {
  const yamlPath = join(process.cwd(), `${getEnv()}.yml`);
  return yaml.load(readFileSync(yamlPath, 'utf8')) as Record<string, any>;
};
