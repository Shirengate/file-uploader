FROM node as build

WORKDIR /app

COPY package.json yarn.lock ./

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL


RUN yarn install 

COPY . .

RUN yarn build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
