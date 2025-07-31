import {PrismaClient} from '@prisma/client';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {WriteStream} from "node:fs";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const logDir: string = path.join(__dirname, '../../logs/mysql');
const logFilePath: string = path.join(logDir, 'prisma.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, {recursive: true});
}

const logStream: WriteStream = fs.createWriteStream(logFilePath, {flags: 'a'});

const prisma = new PrismaClient({
  log: [
    {emit: 'event', level: 'query'},
    {emit: 'event', level: 'info'},
    {emit: 'event', level: 'warn'},
    {emit: 'event', level: 'error'},
  ],
});

const getTime: () => string = (): string => {
  const now = new Date();
  return now.toISOString().replace('T', ' ').slice(0, 19);
};

prisma.$on('query', (e: any): void => {
  logStream.write(`[${getTime()}] [QUERY] ${e.query} | ${e.params}\n`);
});

prisma.$on('info', (e: any): void => {
  logStream.write(`[${getTime()}] [INFO] ${e.message}\n`);
});

prisma.$on('warn', (e: any): void => {
  logStream.write(`[${getTime()}] [WARN] ${e.message}\n`);
});

prisma.$on('error', (e: any): void => {
  logStream.write(`[${getTime()}] [ERROR] ${e.message}\n`);
});

export default prisma;
