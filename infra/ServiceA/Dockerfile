FROM node:16 AS build

WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the docs package.json
COPY apps/service-a-container ./apps/service-a-container
COPY packages/logger ./packages/logger
COPY packages/tsconfig ./packages/tsconfig

RUN npm install && npm run build --workspace=logger && npm run build --workspace=service-a-container

FROM node:16 

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY apps/service-a-container/package.json ./apps/service-a-container/
COPY packages/logger/package.json ./packages/logger/

RUN npm install

COPY --from=build /usr/src/app/apps/service-a-container/dist /usr/src/app/apps/service-a-container/dist 
COPY --from=build /usr/src/app/packages/logger/dist /usr/src/app/packages/logger/dist 

ENTRYPOINT ["npm", "run", "start", "--workspace=service-a-container"]

