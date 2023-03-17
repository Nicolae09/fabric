import React from 'react';
import {DataGridRowsTypes, MoviesTypes} from 'globalTypes';

export interface MoviesButtonTypes {
	setRows: React.Dispatch<React.SetStateAction<DataGridRowsTypes[]>>
}

export interface MoviesResponse {
	Response: string;
	Search: MoviesTypes[];
	totalResults: string;
}
