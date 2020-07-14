# Image page: <https://hub.docker.com/_/node>
FROM node:12.18.2-alpine as builder

# Prepare sources directory
RUN set -x \
  && mkdir /src \
  && chown node:node /src

WORKDIR /src

# Copy sources into image
COPY --chown=node . .

# Use an unprivileged user
USER node:node

# Install dependencies
RUN npm install --only=prod

ENTRYPOINT ["/src/bin/readable.js"]
