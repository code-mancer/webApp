#!/bin/bash

while [! nc -z webapp-database-host 5432]; do
  sleep 1
done

npm run migrate:up
npm run seed

if [ "$NODE_ENV" == "production" ]; then
  npm start
else
  npm run dev
fi