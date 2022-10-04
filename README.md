# Chess-Frontend ♟️

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Setup](#setup)

## Introduction

This project uses logic from the chess.js library to create an app that offers an exciting chess experience.

It contains a login and register system , which allows users to create accounts so they can begin to play. The user is taken to the home page after they log in where they can decide whether they want to play against AI or play online. Users can also save games that they play against AI and view them at a later data from the home page. Passwords are encrypted using the [bcrypt](https://deno.land/x/bcrypt@v0.3.0/mod.ts) package, and stored in a hosted database.

## Technologies

This project has been created with:

- socket.io version: 4.4.1
- yarn version: 1.22.17
- bootstrap version: 5.1.3
- react version: 17.0.2
- react-dom version: 17.0.2
- react-router-dom version: 5.2.0

## Setup

To run locally using yarn:

```
$ cd ../chess
$ yarn install
$ yarn start
```

As well as this, there is a related backend Server which will also be required in order for the App to function properly. The backend repository for this project can be found [here](https://github.com/ErikBoonprakong/chess-backend/blob/main/Procfile). We recommend cloning both repositories to your local machine.
