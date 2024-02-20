# Getting Started with Job Boarding web app

## Create image

`docker image build -t job-board-node-image .`

## Run container

`docker run -dp 3000:3000 --name job-board-node job-board-node-image`

## Open Browser

type in `localhost:3000`