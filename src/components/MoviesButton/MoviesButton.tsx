import React, {useState} from 'react';
import './MoviesButton.scss';
import {MoviesButtonTypes, MoviesResponse} from './MoviesButton.types';
import {MoviesTypes, DataGridRowsTypes} from 'globalTypes';
import {movieNames} from './MoviesButton.config';

import {
    ButtonGroup,
    Button
} from '@mui/material';

export default function MoviesButton({setRows}: MoviesButtonTypes) {
    const [isFetchingMovies, setIsFetchingMovies] = useState(false);

    const handleButtonClick = async ({currentTarget: {dataset: {moviename}}}:  React.MouseEvent<HTMLButtonElement>) => {
        setIsFetchingMovies(true);

        try {
            const {
                Response,
                Search: movies = [],
            }: MoviesResponse = await (await fetch(`http://localhost:3500/request-movie?movieName=${moviename}`))
                .json();

            if (Response !== 'True') throw new Error('Something happened...');

            const generatedRows: DataGridRowsTypes[] = movies.map(({Poster, Title, Type, imdbID, Year}: MoviesTypes) => (
                {image: Poster, title: Title, type: Type, id: imdbID, year: Year}
            ));

            if (generatedRows.length) setRows(generatedRows);
            setIsFetchingMovies(false);
        } catch (err) {
            setIsFetchingMovies(false);
            console.error(`Please check: ${err}`);
        }
    };
	
    return (
        <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            className={'movie-button'}
        >
            {movieNames.map((movieName: string) => (
                <Button
                    key={movieName}
                    data-moviename={movieName}
                    onClick={handleButtonClick}
                    disabled={isFetchingMovies}
                >
                    {movieName}
                </Button>
            ))}
        </ButtonGroup>
    );
}
