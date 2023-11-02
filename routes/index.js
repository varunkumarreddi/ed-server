var express = require('express');
var router = express.Router();

var axios = require('axios');

var admin = require("firebase-admin");
let firbaseApp = null
var serviceAccount = require("../firebaseCred.json");

if(!firbaseApp){
  firbaseApp = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
              });
}
  


var mongoose = require('mongoose');
const LatestDesigns = require('../models/latestDesigns');
const UserData = require('../models/userData');


const endpoints = require('../constants/endpoints');

const DB = 'mongodb+srv://ethereal-design:SravaniPonnam@etherealdesigns.8i9gchn.mongodb.net/EtherealDesigns?retryWrites=true&w=majority'

const twilio = require('twilio')
const dotenv = require('dotenv')

dotenv.config()


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(DB);
  console.log('db connected')
}

/* GET home page. */


router.get("/api",async (req, res) => {
  res.json({ message: "Hello from server!" });
});

router.get(endpoints.FETCH_LATEST_DESIGNS, async (req, res) => {
  // let latestDesign = new LatestDesigns();
  // latestDesign.name = "Living Rooms";
  // latestDesign.images=["https://images.pexels.com/photos/1543447/pexels-photo-1543447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/3946663/pexels-photo-3946663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]
  // const doc  = await latestDesign.save()
  // console.log(doc);
  const data = await LatestDesigns.find();
  let resObj = []
  data.forEach(item =>{
    resObj.push({
      name: item.name,
      images: item.images
    })
  })
  res.json(resObj);
});

//get user details from gapi
router.get(endpoints.GET_USER_INFO_GMAIL, async(req,res)=>{
  
  let accessToken = req.query.userAccessToken
  
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
                      headers: {
                          Authorization: `Bearer ${accessToken}`,
                          Accept: 'application/json',
                      }
                  })
                  .then((data) => {
                      res.json(data.data)
                  })
                  .catch((err) => console.log(err));
  
})

//get user details from firbase phonenumber auth
router.get(endpoints.GET_USER_INFO_PHONE, async(req,res)=>{
  
  let accessToken = req.query.userAccessToken
  const { getAuth} = require('firebase-admin/auth')
  getAuth()
    .verifyIdToken(accessToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log(decodedToken);
      res.json(decodedToken.phone_number)
    })
    .catch((error) => {
      console.log(error)
      res.json(error)
    });

})


//save user details 
router.post(endpoints.SAVE_USER_INFO, async(req, res) =>{
  let userExist = null;
  if(req.body.loggedWith === 'google'){
    userExist = await UserData.findOne({ email: req.body.email });
  }
  else if(req.body.loggedWith === 'phoneNumber'){
    userExist = await UserData.findOne({ phoneNumber: req.body.phoneNumber });
  }

  if (userExist && req.body.loggedWith === 'google'){
    const doc = await UserData.updateOne(
      {email: req.body.email}, 
      {logInFrequency :  userExist.logInFrequency + 1},
      {multi:true}, 
        function(err, numberAffected){  
          console.log(err)
        });
    res.status(200).json({
      message: "User Already exists",
      code: 200
    });
  }

  if (userExist && req.body.loggedWith === 'phoneNumber'){
    const doc = await UserData.updateOne(
      {phoneNumber: req.body.phoneNumber }, 
      {logInFrequency :  userExist.logInFrequency + 1},
      {multi:true}, 
        function(err, numberAffected){  
          console.log(err)
        });
    res.status(200).json({
      message: "User Already exists",
      code: 200
    });
  }


  else if (!userExist){
    let userData = new UserData(req.body);
    userData.logInFrequency = 0;
    const doc  = await userData.save()
    console.log(doc);
    res.status(200).json({
      message: "User Data saved successfully",
      code: 200
    })
  }
});




router.get('*', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../../ed-server/build', 'index.html'));
});

module.exports = router;