FROM node

RUN npm install -g nodemon

RUN npm install

EXPOSE 8080

WORKDIR /var/www

CMD ["./init.sh"]
