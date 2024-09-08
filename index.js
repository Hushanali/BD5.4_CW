let express = require('express');
let { track } = require('./models/track.model');
let { user } = require('./models/user.model');
let { sequelize } = require('./lib/index');
let app = express();

app.use(express.json());

// Data
let tracks = [
  {
    name: 'Raabta',
    genre: 'Romantic',
    release_year: 2012,
    artist: 'Arijit Singh',
    album: 'Agent Vinod',
    duration: 4,
  },
  {
    name: 'Naina Da Kya Kasoor',
    genre: 'Pop',
    release_year: 2018,
    artist: 'Amit Trivedi',
    album: 'Andhadhun',
    duration: 3,
  },
  {
    name: 'Ghoomar',
    genre: 'Traditional',
    release_year: 2018,
    artist: 'Shreya Ghoshal',
    album: 'Padmaavat',
    duration: 3,
  },
  {
    name: 'Bekhayali',
    genre: 'Rock',
    release_year: 2019,
    artist: 'Sachet Tandon',
    album: 'Kabir Singh',
    duration: 6,
  },
  {
    name: 'Hawa Banke',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Darshan Raval',
    album: 'Hawa Banke (Single)',
    duration: 3,
  },
  {
    name: 'Ghungroo',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'War',
    duration: 5,
  },
  {
    name: 'Makhna',
    genre: 'Hip-Hop',
    release_year: 2019,
    artist: 'Tanishk Bagchi',
    album: 'Drive',
    duration: 3,
  },
  {
    name: 'Tera Ban Jaunga',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Tulsi Kumar',
    album: 'Kabir Singh',
    duration: 3,
  },
  {
    name: 'First Class',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 4,
  },
  {
    name: 'Kalank Title Track',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 5,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await track.bulkCreate(tracks);

    res.status(200).json({ message: 'Database seeding successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 1
async function addNewUser(newUser) {
  let newData = await user.create(newUser);
  return { newData };
}

app.post('/users/new', async (req, res) => {
  try {
    let newUser = req.body.newUser;
    let response = await addNewUser(newUser);

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2
async function updateUserById(newUserData, id) {
  let userDetails = await user.findOne({ where: { id } });

  if (!userDetails) {
    return {};
  }

  userDetails.set(newUserData);
  let updatedUser = await userDetails.save();

  return { message: 'User updated successfully', updatedUser };
}

app.post('/users/update/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newUserData = req.body;
    let response = await updateUserById(newUserData, id);

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PORT
app.listen(3000, () => {
  console.log('Server is running on Port 3000');
});
