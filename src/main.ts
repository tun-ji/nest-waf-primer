import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

//Let's make it a NestExpressApplication
import {NestExpressApplication} from '@nestjs/platform-express';

//We need join to synthesize the directory path which will contain templates
import {join} from 'path';

//We need nunjucks as render engine

import * as nunjucks from 'nunjucks';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  
  const staticAssets = join(__dirname, '..', 'static');
  app.useStaticAssets(staticAssets);

  const express = app.getHttpAdapter().getInstance();

  const views = join(__dirname, '..', 'views');
  /*Finally, configure nunjucks, setting views and express
  declared above*/
  nunjucks.configure(views, { express });
  //start the application
  await app.listen(3000);
}

bootstrap();