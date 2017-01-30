import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import index from './routes';

declare const __dirname:string;

const app:express.Express = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'client')));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err:Error = new Error('Not Found');
  let errorData:Object = {
  	error: err,
  	status: 404
  };
  next(errorData);
});

// error handler
app.use((err, req, res, next) => {
  res.send(err.toString());
});

export default app;
