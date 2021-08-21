const mongoose = require('mongoose')
const { descriptors, places } = require('./seedhelpers.js')
const Campground = require('../models/campground')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("database connected"))
.catch(err=>console.log(err))
const cities = require('./cities')

const sample = array => array[Math.floor(Math.random()*array.length)]
const seed = async () => {
    await Campground.deleteMany({})
    for(let i=0; i<=199; i++){
    
        const randno = Math.floor(Math.random()*1000)
        const price = Math.floor(Math.random()*30) + 1
        const camp = new Campground({location: `${cities[randno].city}, ${cities[randno].state}`,
                    title: `${sample(descriptors)} ${sample(places)}`,
                    images: [
                        {
                          
                          path: 'https://res.cloudinary.com/dytngjjtg/image/upload/v1628008951/yelpCamp/utxblivxzvzuttq4pl9y.jpg',
                          filename: 'yelpCamp/utxblivxzvzuttq4pl9y'
                        },
                        {
                          
                          path: 'https://res.cloudinary.com/dytngjjtg/image/upload/v1628243233/yelpCamp/ogigiprl21n96ts65ygq.jpg',
                          filename: 'yelpCamp/ogigiprl21n96ts65ygq.jpg'
                        }
                      ],
                    geometry: {
                      type: 'Point',
                      coordinates: [ cities[randno].longitude, cities[randno].latitude ]
                    },
                    price,
                    author: '61059d222d5686303c8b5c9e',
                    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis eius id quo modi voluptatibus sdkfjdkfjkldfsfslfjlsfjlsjfdlskfjdkjflso fljfdsfj dkfj"
    })
        await camp.save()
    }
}
seed()
.then(()=>mongoose.connection.close())