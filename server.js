const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers/index.js');
const path = require('path');
const exhbs = require('express-handlebars');
const hbs = exhbs.create({});
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//serve up everything in public folder as static resources
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

//setup handlebars as app engine of choice
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync({force: true}).then( ()  => {
    app.listen(PORT, () => console.log('Now listening'));
});