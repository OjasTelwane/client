import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
    return (
        <div>
             <Box sx={{ display: 'flex', justifyContent:'center', marginTop:'200px' }}>
            <CircularProgress />
            </Box>
        </div>
    )
}

export default Loading
