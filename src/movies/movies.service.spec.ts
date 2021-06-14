import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 999 not found.`);
      }
    });
  });

  describe('create', () => {
    it('created movieData should be exist.', () => {
      const movies = service.create({
        title: 'Tenet',
        genres: ['action', 'thriller'],
        year: 2020,
      });

      expect(movies.filter(({ title }) => title === 'Tenet')).toBeDefined();
    });
    it('create validation test', () => {
      try {
        service.create({
          title: 'Tenet',
          genres: ['action', 'thriller'],
          year: '2021' as unknown as number,
        });
      } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toEqual(`year must be a number conforming to the specified constraints`);
      }
    });
  });

  describe('delete', () => {
    it('deleted movie does not be included in movies', () => {
      service.create({
        title: 'Tenet',
        genres: ['action', 'thriller'],
        year: '2021' as unknown as number,
      });
      const createdMovieId = service.getAll().length;
      expect(service.deleteOne(createdMovieId)).toBe(true);
      try {
        service.getOne(createdMovieId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
