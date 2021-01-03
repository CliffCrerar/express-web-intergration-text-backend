const 
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');
    port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*',handleAll)

function handleAll(req,res,next){
    const body = req.body;
    const query = req.query;
    let status = 200;
    let resPayload;
    let reqPayloadIs;
    if(Object.keys(body).length !== 0) {
        resPayload = body
        reqPayloadIs = 'body';
    } else if(Object.keys(query).length !== 0) {
        resPayload = query
        reqPayloadIs = 'query';
    } else {
        status = 400;
        reqPayloadIs = 'No Request Payload';
    }
    console.log('* PATH:',req.path,'* METHOD:', req.method ,'* HOST:',req.hostname ,'* STATUS:', status, ' * PAYLOAD:', resPayload, ' * REQ PAYLOAD IS:', reqPayloadIs,' *' );
    res.status(status).type('json').send({
        status,
        path: req.path,
        host: req.hostName,
        payload: resPayload,
        payloadFrom: reqPayloadIs
    });
}

if(!process.env.NODE_ENV) {
    app.listen(port, ()=> console.log('App Started: ', port));
} else {
    exports.DevApi = app;
}
