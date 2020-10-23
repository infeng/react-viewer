FROM node:10.15.1 as base
ARG ARG_NPM_RC
ENV ARG_NPM_RC $ARG_NPM_RC

# Excluir o NPM cache da imagem
VOLUME /root/.npm

# Copiar npm config
COPY .npmrc /root/.npmrc
RUN echo "$ARG_NPM_RC" >> /root/.npmrc

# Criar pasta onde aplicação será colocada
WORKDIR /var/app

COPY . /var/app/
# RUN ls .
RUN npm install
RUN npm run deploy-prod
#
# Criar o container definitivo
#
# FROM nginx:latest
# COPY --from=base /var/app/build /usr/share/nginx/html