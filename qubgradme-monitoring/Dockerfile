FROM --platform=linux/amd64 node:18.12
WORKDIR /app

COPY package.json package.json
RUN npm install --omit=dev
ENV PORT=80
COPY . /app

CMD [ "node", "index.js" ]
EXPOSE 80