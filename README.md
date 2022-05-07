## Image-Processing-Api

Project : Image Processing Api
## Development server
Run `npm install` insall node module of project
Run `npm run start` for a dev server. Navigate to `http://localhost:5000/`. 

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Test and Build

Run `npm run test` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run jasmine` to execute the unit tests via [Jasmine](https://github.com/jasmine/jasmine).
## Running prettier
Run `npm run prettier` check all development code by prettier in app project.
## List Api Valid

http://localhost:5000/api/img/:name
change :name to image name. List available image
    - encenadaport
    - fjord
    - icelandwaterfall
    - palmtunnel
    - santamonica
example : http://localhost:5000/api/img/encenadaport
will display images by encenadaport

http://localhost:5000/api/img/encenadaport?width=200&height=200
Query params value: 
    - width: positive number
    - heigth: positive number
Will scale the encenadaport according to the width and height value.

## List API Invalid

http://localhost:5000/api/img/encenadaport?width=200&height=-200
return status `400` and show message `Height must be positive number`

http://localhost:5000/api/img/encenadaport?width=-200&height=200
return status `400` and show message `Width must be positive number`

http://localhost:5000/api/img/test100
return status `404` and show message `Image not found`

http://localhost:5000/api/img/encenadaport?width=a&height=200
return status `400` and show message `Width must be number`
