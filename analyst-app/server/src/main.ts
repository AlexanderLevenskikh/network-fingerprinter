import * as path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/AppModule';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const PORT = 3000;
    const HOST = '0.0.0.0';

    app.use(
        session({
            // TODO сделать нормальный secret (не в исходниках!)
            secret: 'nest cats',
            resave: false,
            saveUninitialized: false,
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    console.log(`app listening on ${HOST}:${PORT}`);
    await app.listen(PORT, HOST);
}

bootstrap();
