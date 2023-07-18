var express = require('express');
var router = express.Router();

const endpoints = require('../constants/endpoints');

/* GET home page. */

router.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

router.get(endpoints.LATESTDESIGNS, (req, res) => {
  res.json([
    {
      name: 'Kitchens',
      images: [
        'https://images.pexels.com/photos/7061393/pexels-photo-7061393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/3623785/pexels-photo-3623785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
    },
    {
      name: 'Bedrooms',
      images: [
        'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
    },
    {
      name: 'Living Rooms',
      images: [
        'https://images.pexels.com/photos/1543447/pexels-photo-1543447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/3946663/pexels-photo-3946663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
    },
  ]);
});

router.get('*', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, '../../ed-server/build', 'index.html'));
});

module.exports = router;
