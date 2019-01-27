FROM node:11-alpine
WORKDIR /src/app
COPY package.json yarn.lock ./
RUN yarn

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]