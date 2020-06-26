import {app} from './server/server';
import { makeWebRouter } from './service/router';
import { vampeerService } from './service/vampeer_service';
import './database/db';

app.use(makeWebRouter());
app.use(vampeerService.router);