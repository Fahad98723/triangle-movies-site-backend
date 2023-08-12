import { Request, Response } from 'express';
import moviesService from './movies.service';

const addMovie = async (req: Request, res: Response) => {
  try {
    const { movie } = req.body;
    const result = await moviesService.addMovie(movie);
    res.status(200).json({
      success: true,
      message: 'Movie added successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add movie',
    });
  }
};

export default {
  addMovie,
};
