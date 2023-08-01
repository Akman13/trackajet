# TrackAJet Project

## Introduction
TrackAJet is a live flight tracking application utilising multiple APIs to provide accurate and current information on en-route flights from all around the world!

## Access
TrackAJet is deployed and free to access at Amazon S3 ([here](http://trackajet.s3-website-ap-southeast-2.amazonaws.com/)) and on GitHub Pages ([here](https://akman13.github.io/trackajet/)).

## Tech Stack
TrackAJet is a Single Page Application built with React. The following techs were also heavily used:
- [React Google Maps API](https://www.npmjs.com/package/@react-google-maps/api)
- [Mantine UI](https://mantine.dev/)
- [AirLabs](https://airlabs.co/)
- [Flight Plan Database](https://flightplandatabase.com/)

## Design Process
TrackAJet was designed to contain two key process flows within the app; 
1. A search bar-fed input that connected the home page to the live map display, and
2. A flight cards display of active flights on the home page

With the intended primary use-case of this app being to track particular flights of interest, the search-bar process flow and its corresponding components were built initially. In this flow, the user's input in the search bar is first checked for its validity against active flights. If valid, the app then renders the map page, with the selected flight provided to the component as a prop.

After fully implementing the components in this flow, the flight cards display on the home page was then built. This was intended primarily for users who have no particular flight in mind, however wished to experience the app and explore its functionalities without having to search for an active flight first. This flow works similar to that of the search-bar components, however is different in that there is no user input and thus no user validation. Instead, six random flights from around the world are selected and validated against a number of in-built conditions (eg. non-courier flights, en-route) before being displayed on flight cards. Selection of a flight card will trigger the rendering of the map page and provide it with the flight's information as a prop.

## Features
- TrackAJet is built with UX as a key consideration. The app is fully responsive and can be used with ease on mobile and large-screen devices, with different components rendered depending on the screen size to ensure ease of use. 
- TrackAJet also utilises Mantine's loading overlays to clearly indicate to the user that their input has been received and is being processed. 
- When viewing a live flight on the map page, additional information of the flight can be viewed by accessing the left-hand information pane. You can also request a live version of this information by clicking the refresh button in the pane.
- The flight's path is split in two around its current location, with each of the traversed and untraversed lines displayed on the Google map with different styling


<!-- Gif here -->

<!-- Gif here -->

## Bugs
There are currently two known bugs which are being investigated:
- For certain flights, the flight data displayed in the map page may display invalid information (eg. negative estimated arrival time)
- For certain flights, the flight data displayed in the map page may be missing certain information (eg. missing data pertaining to flight departure/arrival times, or progress of flight)

If you experience any other issues that may resemble a bug or a sign of poor responsiveness, please let me know so I can look into it.

## Challenges
In the earlier stages of the app's development, another fully free-to-use flights API was utilised. Over time, the API began displaying more frequent uptime issues for more prolonged periods of time, and eventually cases of incorrect data being returned. My initial approach in handling this was to explore alternative APIs to replace this, whilst providing feedback to the user that the website's API was currently down. As the API became more unstable, eventually the decision was made to rebuild the app with the integration of two new flight APIs (AirLabs and Flight Plan Database).

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