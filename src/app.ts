import { Application } from '@curveball/core';
import accessLog from '@curveball/accesslog';
import halBrowser from '@curveball/browser';
import problem from '@curveball/problem';
import bodyParser from '@curveball/bodyparser';

import * as dotenv from 'dotenv';

import proxy from './proxy-mw';

dotenv.config();

const app = new Application();

// The accesslog middleware shows all requests and responses on the cli.
app.use(accessLog());

app.use(halBrowser({
  title: 'Evently Curveball Proxy',
}));

// The problem middleware turns exceptions into application/problem+json error
// responses.
app.use(problem());

// The bodyparser middleware is responsible for parsing JSON and url-encoded
// request bodies, and populate ctx.request.body.
app.use(bodyParser());

app.use(proxy({
  bookmark: process.env.EVENTLY_BOOKMARK_URI!,
  token: process.env.EVENTLY_TOKEN!
}));

export default app;
