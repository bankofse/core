FROM iojs

RUN mkdir /src
WORKDIR /src

COPY ./src/package.json /src/package.json
RUN npm install

COPY ./src/index.js /src/index.js

CMD iojs --harmony_arrow_functions index.js
