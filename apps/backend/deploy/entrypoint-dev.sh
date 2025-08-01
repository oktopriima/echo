#!/bin/sh

npx prisma migrate dev --name auto --skip-seed
npm run dev