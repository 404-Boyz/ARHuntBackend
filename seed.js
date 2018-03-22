
const Sequelize = require('sequelize');
const { User, Adventure, Location } = require('./server/db/models');
const db = require('./server/db');


const users = [
  {
    firstName: 'Wanderer',
    lastName: 'Whit',
    userName: 'Wackywhit',
    email: 'Whit@gmail.com',
    password: 'Pirates',
    googleID: 'askjeeves',
  },
  {
    firstName: 'Blue',
    lastName: 'Beard',
    userName: 'Pirate',
    email: 'bluebeard@gmail.com',
    password: 'Pirates',
    googleID: 'crossbones',
  }
];

const adventures = [
  {
    name: 'FullStack Neighborhood',
    location: 'Chicago, IL',
    description: "Take a tour of fullstacks surrounding neighborhood... you might see a starbucks, a courthouse and a bunch of nice cars by the carwash. Its great!",
    locationCount: 4,
    photoUrl: 'https://media.sabrecdn.com/wyndhamchicago/application/files/5414/7437/1155/int-push_Chicago.jpg',
    userId: 1
  },
  {
    name: 'Chicago Highrises',
    location: 'Chicago, IL',
    description: 'If You love pizza, look no further! This delicious hunt to taste a slice from every one of our Chicago-Famouse pizza spots. Come hunrgy, Leave Happy!',
    locationCount: 4,
    photoUrl: 'https://media.sabrecdn.com/wyndhamchicago/application/files/5414/7437/1155/int-push_Chicago.jpg',
    userId: 1
  },
  {
    name: 'Famous Chicago Pizza',
    location: 'Chicago, IL',
    description: 'Take a wonderful super awesome tour of the tallest buildings in Chicago... The Sears/Willis Tower, The John Hancock, The Trump Tower, and many many more! What an enjoyable time with many buildings to visit!!! SO great!!',
    locationCount: 4,
    photoUrl: 'https://media.sabrecdn.com/wyndhamchicago/application/files/5414/7437/1155/int-push_Chicago.jpg',
    userId: 1
  },

]

const locations = [
  {
    name: 'The Green Door Tavern',
    clue: 'This establishment opened in 1921, was named for the color of it’s door which indicated the presence of a speakeasy within.',
    latitude: '41.8945938',
    longitude: '-87.63743520000003',
    positionInHunt: 1,
    adventureId: 1,
  },
  {
    name: 'National Public Housing Museum',
    clue: 'A place of stories that mine the vastly complex history of public and publicly subsidized housing in America.',
    latitude: '41.8928203',
    longitude: '-87.6407312',
    positionInHunt: 2,
    adventureId: 1,
  },
  {
    name: 'Ward, A. Montgomery Park',
    clue: 'Sitting on a 3-acre parcel stretching along the north branch of the Chicago River, this park was named in honor of Aaron Montgomery Ward, Chicago’s famous mail order entrepreneur who became known as the “Watchdog of the Lakefront”.',
    latitude: '41.8936415',
    longitude: '-87.6419353',
    positionInHunt: 3,
    adventureId: 1,
  },
  {
    name: 'Jesse White Foundation',
    clue: 'The home to the foundation of the Secretary of State with a mission to support programs benefitting at risk youth and provide educational opportunities for low income students',
    latitude: '41.8969762',
    longitude: '-87.6392664',
    positionInHunt: 4,
    adventureId: 1,
  }
];

const seed = () =>
  Promise.all(users.map(user =>
    User.create(user))
  )
    .then(() =>
      Promise.all(adventures.map(adventure =>
        Adventure.create(adventure))
      ))
    .then(() =>
      Promise.all(locations.map(location =>
        Location.create(location))
      )
    )
    .catch(err => console.error(err))

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
