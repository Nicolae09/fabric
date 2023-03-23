import {render, fireEvent, screen, act} from '@testing-library/react';
import App from './App';
import {movieNames} from 'components/MoviesButton';

describe('App', () => {
    it('Should render image', async () => {
        const mockMovieResponse = [
            {
                Poster: 'https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
                Title: 'Great Movie',
                Type: 'movie',
                imdbID: Math.random(),
                Year: Date.now()
            }
        ];

        const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(
                () => Promise.resolve({ json: () => Promise.resolve(
                    {
                        Response: 'True',
                        Search: mockMovieResponse
                    }),
                }),
            ) as jest.Mock);

        render(<App />);

        await act(() => {
            fireEvent.click(screen.getByRole('button', {name: movieNames[0]}));
        });

        expect(mockFetch).toBeCalled();
        expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
        expect(screen.getByRole('img', {name: 'movie poster'})).toBeInTheDocument();
    });

    it('Should render skeleton', async () => {
        const mockMovieResponse = [
            {
                Poster: 'N/A',
                Title: 'Great Movie',
                Type: 'movie',
                imdbID: Math.random(),
                Year: Date.now()
            }
        ];

        const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(
                () => Promise.resolve({ json: () => Promise.resolve(
                    {
                        Response: 'True',
                        Search: mockMovieResponse
                    }),
                }),
            ) as jest.Mock);

        render(<App />);

        await act(() => {
            fireEvent.click(screen.getByRole('button', {name: movieNames[0]}));
        });

        expect(mockFetch).toBeCalled();
        expect(screen.queryByRole('img', {name: 'movie poster'})).not.toBeInTheDocument();
        expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });
});
