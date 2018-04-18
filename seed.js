
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
    photoUrl: 'http://www.richard-seaman.com/USA/Cities/Chicago/Landmarks/ChicagoSkyline1.jpg',
    userId: 1
  },
  {
    name: 'Famous Chicago Pizza',
    description: 'Take a wonderful super awesome tour of the tallest buildings in Chicago... The Sears/Willis Tower, The John Hancock, The Trump Tower, and many many more! What an enjoyable time with many buildings to visit!!! SO great!!',
    locationCount: 4,
    photoUrl: 'https://giordanos.com/content/uploads/Pizza_New-Homepage-image.jpg',
    userId: 1
  },
  {
    name: 'A Taste of Fulton Market',
    description: 'Immerse yourself in a few of the fun activities that this new and exciting tech hub of Chicago has to offer! Take a tour and enjoy some drinks, delicious bites, and some good times!',
    locationCount: 7,
    photoUrl: 'http://www.sterlingbay.com/sites/default/files/property/hero/FultonMarket_SterlingBay_1.jpg',
    userId: 1
  },

]

const locations = [
  {
    name: 'The Drifter',
    clue: 'Bootleggers and rum-runners once ran the show in this authentic, restored speakeasy. Now, patrons can order cocktails presented on tarot cards and imagine life during prohibition. Look for streets named for the Great Lakes to find your next clue.',
    hints: ['It is located underneath an establishment opened in 1921 which was named for the color of it’s door indicating the presence of a speakeasy within.',
    'Where Orleans meets the Great Lake with the longest shoreline.'],
    latitude: 0,
    longitude: 0,
    positionInHunt: 1,
    adventureId: 1,
  },
  {
    name: 'Watershed',
    clue: 'After you enjoy a nice cocktail, head to the southeast, to a place named for "an event marking a turning point in a course of action or state of affairs".',
    hints: ['If you find yourself in a place where patrons "Pop Champagne", you are right on top of it.', 'Where Sinatra\'s "great street" meets Ohio, is where you will find your next clue. Onward, young adventurer!'],
    latitude: '41.894630',
    longitude: '-87.637211',
    positionInHunt: 2,
    adventureId: 1,
  },
  {
    name: 'Three Dots and a Dash',
    clue: 'You may be feeling victorious at this point, but not so fast young adventurer, there is more exploring to do! Your next clue is located to the southwest at a place named for the "V" in the victory of World War II.',
    hints: ['If you are looking for three drinks with a dash of fun, this speakeasy can provide all you seek.', 'If you find yourself walking south on Clark Street, turn left on Hubbard and look down the alleyway. You just may see something interesting.'],
    latitude: '41.892592',
    longitude: '-87.628032',
    positionInHunt: 3,
    adventureId: 1,
  },
  {
    name: 'The Library',
    clue: 'You may get slapped with a penalty if you return an item late to the namesake of this hidden gem',
    hints: ['No need to feel "Gilt" about the state you are in at this point, because a few blocks to the southwest, and one floor down lies your next clue.', '¿Donde está la biblioteca?'],
    latitude: '41.890357',
    longitude: '-87.631015',
    positionInHunt: 4,
    adventureId: 1,
  },
  {
    name: 'WINNER',
    clue: 'Congratulations resourceful scavenger, you have completed this hunt in stunning fashion!',
    latitude: '41.889319',
    longitude: '-87.635441',
    positionInHunt: 5,
    adventureId: 1,
  },
  {
    name: 'Punch Bowl Social',
    clue: 'Get in touch with your inner child at this 30,000 square-foot playpen known for its bowling and booze.',
    hints: ['Despite the name, there is no punching allowed here. It\'s stocked with a delectable collection of unequalled music, food, games, and beverages for you to enjoy',
    'PBS in this case, does not stand for Public Broadcasting System.'],
    latitude: 0,
    longitude: 0,
    positionInHunt: 1,
    adventureId: 5,
  },
  {
    name: 'WeWork Fulton Market',
    clue: 'This tech hub hosts a variety of heavy-hitters, ranging from PR, media, law, to real-estate and more. Their mission is to create a world where people work to make a life, not just a living',
    hints: ['If you walked 2 blocks south, you\'ve gone too far.',
    'Whether you need a desk or an office suite, they\'ve got you hooked up.'],
    latitude: '41.887103',
    longitude: '-87.648777',
    positionInHunt: 2,
    adventureId: 5,
  },
  {
    name: 'Au Cheval',
    clue: 'Hungry? Head here where diner chic meets the best burger in town. Just be prepared to wait! It is well worth it!',
    hints: ['Winner of The Food Network\'s 2015 "Best Burger Award"', 'Translation: By Horse'],
    latitude: '41.886273',
    longitude: '-87.648719',
    positionInHunt: 3,
    adventureId: 5,
  },
  {
    name: 'Booze Box',
    clue: 'Situated below a prominent sushi establishment, this hidden gem is "boxed" inside a comfortable, dark room.',
    hints: ['This bar features their version of Japanese "trail-mix" snacks.', 'Follow the red arrow in the alley next to Soho.'],
    latitude: '41.884555',
    longitude: '-87.647518',
    positionInHunt: 4,
    adventureId: 5,
  },
  {
    name: 'Federales',
    clue: 'It is taco time! Head over to this taqueria in a funky warehouse setting and load up!',
    hints: ['Named for the Spanglish word to denote federal security forces.', 'Follow the sounds and smells below the Morgan CTA stop.'],
    latitude: '41.883975',
    longitude: '-87.648507',
    positionInHunt: 5,
    adventureId: 5,
  },
  {
    name: 'Google',
    clue: 'This tech goliath made big waves when they laid stake in the Fulton Market District.',
    hints: ['A mispelling of the term for a 1 with 100 zeros following it.', 'I\'m feeling lucky. Stuck? Just Google it.'],
    latitude: '41.885431',
    longitude: '-87.652198',
    positionInHunt: 6,
    adventureId: 5,
  },
  {
    name: 'WINNER',
    clue: 'Congratulations resourceful scavenger, you have completed this hunt in stunning fashion!',
    latitude: '41.887256',
    longitude: '-87.652239',
    positionInHunt: 7,
    adventureId: 5,
  },

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
