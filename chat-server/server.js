const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({json: true}));

const messages = [
    {
        "id": 1,
        "userId": "b3c8c262-ad95-45da-a18b-4b3c16999343",
        "content": "Какая сейчас погода за окном?"
    },
    {
        "id": 2,
        "userId": "5f2d9da0-f624-4309-a598-8ba35d6c4bb6",
        "content": "К сожалению, я не знаю ответа на этот вопрос"
    },
];

let nextId = 3;

const router = new Router();

router.get('/messages', async (ctx, next) => {
    const from = Number(ctx.request.query.from)
    
    if (ctx.request.query.from === 0) {
        ctx.response.body = messages;
        return;
    }

    const fromIndex = messages.findIndex(o => o.id === from);
    if (fromIndex === -1) {
        ctx.response.body = messages;
        return;
    }
    ctx.response.body = messages.slice(fromIndex + 1);
});

router.post('/messages', async(ctx, next) => {
    const sendData = JSON.parse(ctx.request.body);
    messages.push({...sendData, id: nextId++});
    ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started'));