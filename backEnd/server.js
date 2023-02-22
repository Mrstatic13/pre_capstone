const http = require('http');
const express = require('express');
const templateEngine = require('express-es6-template-engine');
const app = express();
app.use(express.json()); //have to use this when you use json in your post
app.engine('html', templateEngine); //method code that tells what rendering is being done
app.set('view', 'templates'); //tells what folder the code to look into
app.set('view engine', 'html');
const { Sequelize, DataTypes } = require('sequelize');


//middleware for time logging into the server
 //request, response, and next 
 app.use((req,res,next)=>{ //this is a code for middleware and should be the first thing you do (three parameters)
    console.log("Time now is ",Date.now()); //to log the time and date when someone visit page (only shows on the server)
    next(); //after executed moves on to the next thing
})


const sequelizeConnection = new Sequelize('postgres://er3ck:rejae13@localhost:5432/er3ck', {
    define:{
        schema: 'full_stack_project'
    }
});
                                        
const Music = sequelizeConnection.define('music', { //table name
    artistid: {
        type: DataTypes.STRING,
        field: 'artistid',
        primaryKey: true
    },
    artist: {
        type: DataTypes.STRING,
        field: 'artist'
    },
    title: {
        type: DataTypes.STRING,
        field: 'title'
    },
    genre: {
        type: DataTypes.STRING,
        field: 'genre'
    },
    // price: {
    //     type: DataTypes.DECIMAL,
    //     field: 'price'
    // }
})

const Videos = sequelizeConnection.define('videos', {
    artist: {
        type: DataTypes.STRING,
        field: 'artist'
    },
    title: {
        type: DataTypes.STRING,
        field: 'title'
    }
})

app.use(cors());

app.get('/music',(res, req) =>{
    Music.findAll().then(music =>{
        let musicList = JSON.stringify(music);
        res.setHeader('Content-type', 'application/json');
        res.send(musicList);
    })
})

app.get('/music/:title', (req, res) => {
    const title = req.params['title'];
    Music.findByPk(title).then(title =>{
        if(title){
        res.send(title);
    } else{
        res.status(404).send('Song not found')
    }
    })
})

//code for posting music
app.post('/music', (req, res) =>{
    const musicData = req.body;
    Music.create({
        artist:musicData.artist, title: musicData.title, genre: musicData.genre
    })
    res.status(201).send('Music created successfully')
})

//code for posting music videos
app.post('/videos', (req, res) =>{
    const videoData = req.body;
    Videos.create({
        artist: videoData.artist, title: videoData.title
    })
    res.status(201).send('Music created successfully')
})

//code used for updating music info
app.put('/music/:title',(req, res) =>{
    const title = req.params['title'];
    const musicData = req.body;
    Music.update({
        title: musicData.title, genre: musicData.genre
    }, {
        where:{artist:title}
    })
    res.status(200).send('Music updated successully')
})


//code used for updating video info
app.put('/videos/:title',(req, res) =>{
    const title = req.params['titles'];
    const videoData = req.body;
    Videos.update({
        artist: videoData.artist, title: videoData.title
    }, {
        where:{videos:artist}
    })
   res.status(200).send('Video updated successully') 
})

app.delete('/music/:title', (req, res) => {
    const title = req.params['title'];
    Music.destroy({
        where:{artist:title}
    })
    res.status(200).send('Track deleted Successfully')
})


sequelizeConnection.authenticate().then(()=>{
    console.log('Database connection successful')
}).catch((error)=>{
    console.log(error);
})

sequelizeConnection.sync().then(()=>{
    console.log('Tables created successfully')
})

// app.get('/', (req, res) => {
//     res.render('homepage', {
//         partials : {
//             header: 'partials/header'
//         }
//     })
// })


const server = http.createServer(app);
server.listen(3000, '127.0.0.1', () => {
    console.log('Server started');
})

