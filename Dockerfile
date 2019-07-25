FROM node:10.16.0

ARG RTB_BOT_TOKEN

RUN wget http://download.redis.io/redis-stable.tar.gz && \
    tar xvzf redis-stable.tar.gz && \
    cd redis-stable && \
    make && \
    mv src/redis-server /usr/bin/ && \
    cd .. && \
    rm -r redis-stable && \
    npm install -g concurrently   

EXPOSE 6379

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN sed -i 's/${RTB_BOT_TOKEN}/'${RTB_BOT_TOKEN}/ /app/config.json

CMD concurrently "/usr/bin/redis-server --bind '0.0.0.0'" "sleep 5s; node /app/RealTimeBot.js"

#build it
#docker build --build-arg "RTB_BOT_TOKEN=${RTB_BOT_TOKEN}" -t realtimebusbot .
#run it
#docker run -it -p 6379:6379 bot
