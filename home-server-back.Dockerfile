FROM node:16
COPY ["package.json","package-lock.json","/home/app/"]
WORKDIR /home/app
COPY [".","/home/app/"]
RUN npm install
EXPOSE ${APP_SERVER_PORT}
CMD ["npm", "start"]
