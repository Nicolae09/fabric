import {fireEvent, render, screen, act, waitFor} from '@testing-library/react';
import MoviesButton from './MoviesButton';
import {movieNames} from './MoviesButton.config';

describe('MovieButton', () => {
    it.each(movieNames)('Should render all button from config file', (buttonText) => {
        render(<MoviesButton setRows={jest.fn()} />);
        expect(screen.getByRole('button', {name: buttonText})).toBeInTheDocument();
    });

    it.each(movieNames)('Should call API on button click', async (buttonText) => {
        const mockSetRows = jest.fn();
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

        render(<MoviesButton setRows={mockSetRows} />);

        await act(() => {
            fireEvent.click(screen.getByRole('button', {name: buttonText}));
        });

        expect(mockFetch).toBeCalled();
        expect(mockSetRows).toBeCalled();
    });

    it.each(movieNames)('Should throw error on bad response', async (buttonText) => {
        const mockSetRows = jest.fn();

        const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(
                () => Promise.resolve({ json: () => Promise.resolve({Response: 'False'}),
                }),
            ) as jest.Mock);

        const mockError = jest.spyOn(console, 'error').mockImplementation();

        render(<MoviesButton setRows={mockSetRows} />);

        await act(() => {
            fireEvent.click(screen.getByRole('button', {name: buttonText}));
        });

        expect(mockFetch).toBeCalled();
        expect(mockError).toBeCalledWith('Please check: Response returned False');
        expect(mockSetRows).not.toBeCalled();
    });

    it.each(movieNames)('Should not call setRows on succesful response with no movies', async (buttonText) => {
        const mockSetRows = jest.fn();

        const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(
                () => Promise.resolve({ json: () => Promise.resolve(
                    {
                        Response: 'True',
                        Search: []
                    }),
                }),
            ) as jest.Mock);

        render(<MoviesButton setRows={mockSetRows} />);

        await act(() => {
            fireEvent.click(screen.getByRole('button', {name: buttonText}));
        });

        expect(mockFetch).toBeCalled();
        expect(mockSetRows).not.toBeCalled();
    });

    it.each(movieNames)('Should disable buttons on movies fetch', async (buttonText) => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(
                () => Promise.resolve({
                    json: () => new Promise(
                        resolve => setTimeout(
                            () => resolve({Response: 'True', Search: []}),
                            100
                        ))
                }),
            ) as jest.Mock);

        render(<MoviesButton setRows={jest.fn()} />);

        await act(() => fireEvent.click(screen.getByRole('button', {name: buttonText})));

        expect(screen.getByRole('button', {name: buttonText})).toBeDisabled();
        await waitFor(() => expect(screen.getByRole('button', {name: buttonText})).toBeEnabled());
    });
});
