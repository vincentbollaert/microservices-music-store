FROM node:alpine
LABEL org.opencontainers.image.authors=vincentbollaert@gmail.com
LABEL org.opencontainers.image.title="microservices playground - music store"
LABEL org.opencontainers.image.licenses=MIT
LABEL com.vincentbollaert.nodeversion=$NODE_VERSION

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

WORKDIR /opt
ENV PATH=/opt/node_modules/.bin:$PATH
COPY package*.json ./
EXPOSE 3000
RUN npm install
COPY . .

CMD ts-node-dev src/index.ts
