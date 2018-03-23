
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
    name: 'Speakeasy Stroll',
    description: 'Take a drunken historical tour of some of Chicago\'s finest hidden establishments.',
    locationCount: 5,
    photoUrl: 'http://blog.digimapps.com/wp-content/uploads/2017/07/secret_savannah_speakeasy.jpg',
    userId: 1
  },
  {
    name: 'FullStack Neighborhood',
    description: "Take a tour of fullstacks surrounding neighborhood... you might see a starbucks, a courthouse and a bunch of nice cars by the carwash. Its great!",
    locationCount: 4,
    photoUrl: 'https://media.sabrecdn.com/wyndhamchicago/application/files/5414/7437/1155/int-push_Chicago.jpg',
    userId: 1
  },
  {
    name: 'Chicago Highrises',
    description: 'If You love pizza, look no further! This delicious hunt to taste a slice from every one of our Chicago-Famouse pizza spots. Come hunrgy, Leave Happy!',
    locationCount: 4,
    photoUrl: 'https://media.sabrecdn.com/wyndhamchicago/application/files/5414/7437/1155/int-push_Chicago.jpg',
    userId: 1
  },
  {
    name: 'Famous Chicago Pizza',
    description: 'Take a wonderful super awesome tour of the tallest buildings in Chicago... The Sears/Willis Tower, The John Hancock, The Trump Tower, and many many more! What an enjoyable time with many buildings to visit!!! SO great!!',
    locationCount: 4,
    photoUrl: 'https://media.sabrecdn.com/wyndhamchicago/application/files/5414/7437/1155/int-push_Chicago.jpg',
    userId: 1
  },

]

const locations = [
  {
    name: 'The Drifter',
    clue: 'Bootleggers and rum-runners once ran the show in this authentic, restored speakeasy. Now, patrons can order cocktails presented on tarot cards and imagine life during prohibition. Look for streets named for the Great Lakes to find your next clue.',
    hints: ['It is located underneath an establishment opened in 1921 which was named for the color of it’s door indicating the presence of a speakeasy within.', 'Where Orleans meets the Great Lake with the longest shoreline.'],
    latitude: 0,
    longitude: 0,
    positionInHunt: 1,
    adventureId: 1,
  },
  {
    name: 'Watershed',
    clue: 'After you enjoy a nice cocktail, head to the southeast, to a place named for "an event marking a turning point in a course of action or state of affairs".',
    hints: ['If you find yourself in a place where patrons "Pop Champagne", you are right on top of it.', 'Where Sinatra\'s "great street" meets Ohio, is where you will find your next clue. Onward, young adventurer!'],
    latitude: '41.894701',
    longitude: '87.637450',
    positionInHunt: 2,
    adventureId: 1,
  },
  {
    name: 'Three Dots and a Dash',
    clue: 'You may be feeling victorious at this point, but not so fast young adventurer, there is more exploring to do! Your next clue is located to the southwest at a place named for the "V" in the victory of World War II.',
    hints: ['If you are looking for three drinks with a dash of fun, this speakeasy can provide all you seek.', 'If you find yourself walking south on Clark Street, turn left on Hubbard and look down the alleyway. You just may see something interesting.'],
    latitude: '41.892669',
    longitude: '-87.627864',
    positionInHunt: 3,
    adventureId: 1,
  },
  {
    name: 'The Library',
    clue: 'You may get slapped with a penalty if you return an item late to the namesake of this hidden gem',
    hints: ['No need to feel "Gilt" about the state you are in at this point, because a few blocks to the southwest, and one floor down lies your next clue.', '¿Donde está la biblioteca?'],
    latitude: '41.8928203',
    longitude: '-87.6407312',
    positionInHunt: 4,
    adventureId: 1,
  },
  {
    name: 'WINNER',
    clue: 'Congratulations resourceful scavenger, you have completed this hunt in stunning fashion!',
    latitude: '41.889224',
    longitude: '87.635311',
    positionInHunt: 5,
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
