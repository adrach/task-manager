# [Task Manager]
Forked off the [Starter Full-Stack Project: Postgres + Rails + React (PRR)](https://github.com/adrach/starter-postgres-rails-react)

## Overview

This project was bootstrapped with [React-Rails](https://github.com/reactjs/react-rails).
The backend was generated by Ruby On Rails template [Generation](http://guides.rubyonrails.org/getting_started.html).

## Folder Structure

After creation, your project should look like this:

```
Project/
  app/
  bin/
  config/
  db/
  lib/
  log/
  public/
  spec/
  storage/
  test/
  tmp/
  vendor/
  Gemfile
  package.json
  README.md
```



## Prerequisites
Before installing, please make sure to have global installations of
* [node v10 or higher](https://nodejs.org/en/download/)
* npm v6 or higher
* [PostgreSQL](https://www.postgresql.org/download/) (if running a local DB instance)
* [Ruby On Rails](https://rubyonrails.org/) (ruby@2.6.4 & rails@6.0.0)

## Installation
1. Execute `bundle install && npm install` to configure the local environment.
2. Compile webpack dependencies via `rails webpacker:compile`
3. Update the DB configuration in `config/database.yml`
4. Perform DB initialization/migration and seeding
```
$ rails db:create
$ rails db:migrate
$ rails db:seed
```
5. Start the development server `rails s`


## Usage
This application uses npm and rails scripts for testing, development, and deployment.

* `$ rails s`: run the development version of the app
* `$ rails s -e production`: run the production version of the app
* `$ rails db:create`: perform DB initialization
* `$ rails db:migrate`: perform DB migrations
* `$ rails db:seed`: perform DB seeding
* `$ rubocop`: perform linting of the BE code
* `$ npm run lint`: perform linting of the FE code
