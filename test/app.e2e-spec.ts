import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('welcome to my movie api');
    });
  });

  describe('/movies', () => {
    it('GET / ', () => {
      return request(app.getHttpServer())
        .get('/movies/')
        .expect(200)
        .expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Tenet',
          year: 2020,
          genres: ['action', 'thriller'],
        })
        .expect(201);
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete(`/movies/1`)
        .expect(404);
    });
  });
});
