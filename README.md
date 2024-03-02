<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Backend REST API for movie hub (Nest.js, MongoDB)

---

## Description

Server REST API based on Nest.js framework for movie-hub like online cinema with following 
entities: authorization, user, actor, movie, rating and file. Entire validation routes data
and handling errors.

---

### Stack technologies:
* Server:
    - Nest.js Framework with TypeScript
    - MongoDB database
    - Mongoose (Typegoose) ORM
    - class-validator, class-transformer
    - argon2 for hashing passwords
    - passport, passport-jwt
    - fs-extra and app-root-path for resolving paths for media files
    - Swagger documentation API

## Get started

Create **.env** file based on **.env.example** file!


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Swagger API documentation is available, when server launched:

> By default:
> http://localhost:4200/api

or set new variable **PORT** with certain value in .env file

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
