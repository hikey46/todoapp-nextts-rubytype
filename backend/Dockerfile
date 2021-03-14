FROM ruby:3-alpine3.13
ENV LANG C.UTF-8

RUN apk update \
  && apk add --no-cache tzdata libxml2-dev curl-dev make gcc libc-dev g++ \
      mariadb-client mariadb-dev git curl file openssh openssl less bash nodejs

RUN mkdir /app

ENV APP_ROOT /app
WORKDIR $APP_ROOT

ADD ./Gemfile $APP_ROOT/Gemfile
ADD ./Gemfile.lock $APP_ROOT/Gemfile.lock

RUN bundle install

ADD . $APP_ROOT
