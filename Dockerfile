FROM node

RUN npm install -g nodemon

EXPOSE 8080

WORKDIR /var/www

CMD ["./init.sh"]
