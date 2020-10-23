FROM node:slim
LABEL org.opencontainers.image.authors=vincentbollaert@gmail.com
LABEL org.opencontainers.image.title="microservices music store - client"
LABEL org.opencontainers.image.licenses=MIT
LABEL com.vincentbollaert.nodeversion=$NODE_VERSION

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

WORKDIR /opt
COPY package*.json ./
EXPOSE 3000
RUN npm install
COPY . .

CMD ["npm", "run", "develop"]
