import * as path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/AppModule';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret || sessionSecret.length < 32) {
        throw new Error('SESSION_SECRET must be set to at least 32 characters');
    }

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const PORT = 3000;
    const HOST = '0.0.0.0';

    app.use(
        session({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false,
            cookie: { httpOnly: true, sameSite: 'lax' },
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    console.log(`app listening on ${HOST}:${PORT}`);
    await app.listen(PORT, HOST);
}

bootstrap();
