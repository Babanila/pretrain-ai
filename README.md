# Pretrain-AI-App

### Overview of Pretrain-AI-App

The Pretrain-AI-App provides a single API endpoint to search for
movie information.

### Modules

The Pretrain-AI-App combines different npm modules for it to work normally:

- Nodejs
- React
- Jest

### Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Usage](#usage)

## Features

Pretrain-AI-App is a frontend app with a user interface where user can check and also see pretrained intents used for bots which have the below properties:-

- `id`: The unique ID that identifies the intent.
- `name`: The name of that intent.
- `description`: A string describing what the intent is used for.
- `trainingData`: The training data that is used to train the AI. It contains:
  - `expressionCount`: the total number of training expressions for this intent
  - `expressions`: An array with three example expressions for this intent, each with a unique `id` and a `text` field with the expression.
- `reply`: The reply the bot will give when the intent is recognized, containing again a unique `id` and a `text` field with the actual reply.

## Requirements

- Install git, node, npm.
- Download Code Editor of your choice (VSCode recommended).
- Clone the repo ( [link](https://github.com/Babanila/pretrain-ai.git) or use `git clone git@github.com:Babanila/pretrain-ai.git`).
- Go into root of the cloned directory and run `npm install`.
- Open the editor (VSCode) and locate the downloaded directory to start developing (or with `code .` in the project director on your terminal).
- A web browser (`e.g. Google Chrome, Mozila, Firefox,Safari e.t.c`).
  git@github.com:Babanila/pretrain-ai.git

## Usage

### How to start Pretrain-AI-App

- Open another computer terminal (`command-line interface`).
- Locate the downloaded pretrain-ai folder.
- Change the directory to the pretrain-ai folder(e.g `cd pretrain-ai`).
- Run `yarn install`.
- Run `yarn start`.
- The default system web browser would be open anf if not follow the steps below
  - Open a web browser of your choice
  - Enter the localhost address using port 8080 (`e.g http://localhost:8080`)

### Test

- From the root directory run `yarn test`.

### Things to consider doing for future

- Search functionality.
- Sorting of tables.
- Paging of results.
