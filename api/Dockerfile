FROM node:12.9.0
WORKDIR /opt/api
COPY ./package.json ./
RUN npm i
COPY . ./
RUN mkdir -p uploads
CMD ["npm", "start"]
