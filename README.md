# TrackAJet Project

## Introduction
TrackAJet is a flight tracking project initially created by a team of four developers using React and Google Maps API. The project involved working with the OpenSky API to fetch real-time flight data and displaying them on a Google Map. I am currently maintaining the app by resolving current bugs and aim to implement additional features in the future. 

## Access
TrackAJet is live and has been deployed on GitHub using GitHub Pages. The app can be accessed using this [link](https://akman13.github.io/trackajet/).

## Current bugs
I am aware of on-going issues users are experiencing with TrackAJet where the app does not display the flight cards on the home screen nor allow for the search of an active flight. This issue has been traced back to a server-side issue with the responses received from the OpenSky API, which has been communicated to the OpenSky development team. 
In the meantime, I am working on:
- Making this information known to users when this is the case
- Investigating potential alternatives for TrackAJet

## Organisation
This project was initially created as part of a group project under the name of [ElonJet](https://github.com/BigBBazz/react-flights). At the start of the project, we created a wire-frame and a Trello board to organise ourselves. We divided the workload based on strengths, and also on interest on which challenges we wanted to take on, with each member of the team assigned tasks such as UI/UX design, API integration, front-end, and back-end development.

## Challenges
Earlier in the development of the app, one of the biggest challenges we faced was dealing with API issues. There were times when the OpenSky API came to the limitations of the free versions request limits, making it impossible to fetch flight data.<br>To solve this issue, we created multiple logins in order to continue development, we also implemented a contingency plan by having a backup API that we could switch to if the primary API was unavailable.

## Trello Board
To keep track of our progress, we created a Trello board with different columns such as “To-Do,” “In-Progress,” “Testing,” and “Completed.” Each task was assigned a due date and labeled with the name of the person responsible for it. The board made it easy for us to track progress and know which tasks needed to be done. Especially during times when we were having difficulty finishing or bug fixing certain tasks.

## Packages and APIs
Various packages and APIs were needed to build the project. We used the React Google Maps API to integrate Google Maps into our application. The package allowed us to display markers and flight data on the map. We also used the OpenSky API to fetch real-time flight data.


## Styling
We used basic CSS to style the application. The color scheme we chose was a timeless blue, grey, and white. Using different shades of blue to differentiate between different flight markers. We also added a search bar that allowed users to search for specific flights.

## Installation
To install TrackAJet on your local machine, follow these steps:

- Clone this repository.
- Run npm install in your terminal.
- Run npm start in your terminal.
- Open your browser and navigate to http://localhost:3000.
### Usage
Tom has already used this application in the real world to display a loved ones private jet home from LA.<br>
Be more like Tom.

To use TrackAJet, follow these steps:

- Open your browser and navigate to http://localhost:3000.
- Enter your desired flight number in the search bar.
- Press enter or click on the search button.
- The map will display the location of your desired flight.

## Contributing
If you would like to contribute to TrackAJet, please follow these steps:

- Fork this repository.
- Create a new branch.
- Make your changes and commit them.
- Push your changes to your forked repository.
- Submit a pull request.

## Credits
TrackAJet is based on [ElonJet](https://github.com/BigBBazz/react-flights), which was created by [Tom](https://github.com/BigBBazz), [Iffath](https://github.com/iffath02), [Akram](https://github.com/Akman13), and [Caleb](https://github.com/caleb-love) as part of a group project for the General Assembly Engineering Immersive course.

## License
TrackAJet is licensed under the MIT License.