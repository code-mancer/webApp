FROM node:18

COPY ./package.json ./
RUN npm install

COPY ./ /app
COPY ./entrypoint.sh /app
WORKDIR /app

RUN chmod +x entrypoint.sh

EXPOSE 5000

CMD ["./entrypoint.sh"]
