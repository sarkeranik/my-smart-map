# My Smart Map

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## Architectural Features
- Integrated NGRX for Sate Management (Actions/Effects/Reducer/Selector/State).
- Used best practises of RXJS for, 
    - Converting existing code for async operations into observables
    - Iterating through the values in a stream
    - Mapping values to different types
    - Handled consecutive api calls efficiatly for, on type address search
 - Followed DRY Principle, Used DI, Followed Flux Design Pattern for State Management.
 - Used HTTPClient for External API calls.
 
## Project Features
- Remove all Markers on one click.
- Auto Zoom to center map on a group of markers on click.
- Move to Current Users Location (You have give GPS location permission for this).
- Add a Marker/Point with Custom Title. (To Use it type you text that you want to show in the marker and then double click on map, click on the marker the pop up will appear)
- Search like Google Map feature. Type any location name to the “Zoom To”  text field, the search suggestions will appear, click on it and the map will zoom to the location and track your movement also.
- Load the pins from Smart Apartment Data API XHR response. Click on an apartment item the map will zoom to it.

<img width="958" alt="Smart Aparment Data Project Demonstration" src="https://user-images.githubusercontent.com/65606710/197065141-affe9cf2-970b-4a6e-972e-9075cff1681f.png">

You will find this projects video demonstration from here. (https://vimeo.com/762442990)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running the project

Go to the root directory of this project, Run `npm install` to install node packages neccessary for the project. After that Run `npm start` to start the project.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
