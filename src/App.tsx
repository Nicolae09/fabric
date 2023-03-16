// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useEffect, useState} from 'react';
import './App.scss';

import {
    Container,
    ButtonGroup,
    Button
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {
        field: 'image',
        headerName: 'Poster',
        width: 150,
        disableColumnMenu: true,
        sortable: false,
        renderCell: (params) => <img src={params.value} alt={'movie poster'} />
    },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'type', headerName: 'Type', width: 85 },
    { field: 'id', headerName: 'imdbID', width: 85, disableColumnMenu: true, sortable: false },
    { field: 'year', headerName: 'Year', width: 85 },
];

function App() {
    const [rows, setRows] = useState([]);

    const handleButtonClick = () => {
        fetch('http://localhost:3500/request-movie')
            .then(async (res) => {
                const movies = (await res.json()).Search;

                const generatedRows = movies.map(({Poster, Title, Type, imdbID, Year}) => {
                    return {image: Poster, title: Title, type: Type, id: imdbID, year: Year};
                });

                setRows(generatedRows);
            });
    };

    return (
        <div className="App">
            <Container>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ marginTop: 50 }}>
                    <Button onClick={handleButtonClick}>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </ButtonGroup>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Container>
        </div>
    );
}

export default App;
