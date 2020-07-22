import { app } from './server/server';
import { makeWebRouter } from './service/web_router';
import { vampeerService } from './service/vampeer_service';
import './database/db';

app.use(vampeerService.router);
app.use(makeWebRouter());
