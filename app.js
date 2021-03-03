const 
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    {version} = require('./package');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*',handleAll)

function handleAll(req,res,next){
    const {body, query, hostname, path, method} = req;
    let status = 200;
    let payload;
    let payLoadFrom;
    if(Object.keys(body).length !== 0) {
        payload = body
        payLoadFrom = 'body';
    } else if(Object.keys(query).length !== 0) {
        payload = query
        payLoadFrom = 'query';
    } else {
        status = 400;
        payLoadFrom = 'No Request Payload';
    }
    console.log('* PATH:',path,'* METHOD:', method ,'* HOST:',hostname ,'* STATUS:', status, ' * PAYLOAD:', payload, ' * REQ PAYLOAD FROM:', payLoadFrom,' *' );
    res.status(status).type('json').send({
        API_VERSION: version,
        status,
        hostname,
        path,
        method,
        JSON.parse(payload),
        payLoadFrom
    });
}

process.env.NODE_ENV==='production'
    ? exports.DevApi = app
    :app.listen(port, ()=> console.log('App Started: ', port));
