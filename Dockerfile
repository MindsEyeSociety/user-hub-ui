FROM node

RUN npm install -g nodemon

WORKDIR /var/www

CMD ["./init.sh"]
