import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { EventsModule } from "./events/events.module";
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { EventsGateway } from "./events/events.gateway"
@Module({
  imports: [MoviesModule, EventsModule],
  controllers: [AppController],
  providers: [AppGateway, EventsGateway],
})
export class AppModule { }
