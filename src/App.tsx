import {useState} from 'react';
import './App.scss';
import {DataGridRowsTypes} from 'globalTypes';

import {
    Container,
    Box,
    Skeleton
} from '@mui/material';

import {MoviesButton} from 'components/MoviesButton';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

const columnsMap: GridColDef[] = [
    {
        field: 'image',
        headerName: 'Poster',
        disableColumnMenu: true,
        sortable: false,
        renderCell: (params) =>
            (params.value && params.value !== 'N/A')
                ? <Box
                    src={params.value}
                    component="img"
                    sx={{
                        height: '100%',
                        width: '100%',
                    }}
                    alt={'movie poster'}
                />
                : <Skeleton
                    height={'100%'}
                    width={'100%'}
                />
    },
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'type', headerName: 'Type', width: 85 },
    { field: 'id', headerName: 'imdbID', width: 85, sortable: false },
    { field: 'year', headerName: 'Year', width: 85 },
];

function App() {
    const [rows, setRows] = useState<DataGridRowsTypes[]>([]);

    return (
        <Container className="App">
            <MoviesButton setRows={setRows} />

            <DataGrid
                rows={rows}
                columns={columnsMap}
                style={{ height: 500, width: '100%' }}
            />
        </Container>
    );
}

export default App;
