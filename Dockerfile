FROM bionexo/node:latest

# Install express-oauth2
ADD . /opt/apps/express-oauth2
WORKDIR /opt/apps/express-oauth2
RUN npm install

WORKDIR /
RUN apt-get -y autoremove && \
    find /var/cache/apt/ -type f -exec rm -f {} \; && \
    find /var/lib/apt/lists/ -type f -exec rm -f {} \;

EXPOSE 3000
CMD node /opt/apps/express-oauth2/bin/www

