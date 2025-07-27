# Movie App

## Installation

Add packages with 
```
npm i
```

## Development server

To start a local development server, run:

```bash
npx ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
npx ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npx ng test
```

## Github workflow 

The app uses github workflows to test, build and deploy the app upon merge to `main` branch.  
For more info see the pipeline definition here [.github/workflows/build-deploy.yml](https://github.com/gizm0bill/movie-app-ngrx/blob/main/.github/workflows/build-deploy.yml)
