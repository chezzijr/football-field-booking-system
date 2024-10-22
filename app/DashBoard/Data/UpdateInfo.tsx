import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Box';
import {BookingTableFull} from '../BookingField/BookingTable';
import { StyledH3, theme } from '../BookingField/DBandBookingField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export function UpdateInformation() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ m: 2, p: 2, backgroundColor: 'white', borderRadius: 4, boxShadow: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <StyledH3>Thông tin sân</StyledH3>
                </Box>
                <Divider sx={{mb:2, height: '2px', backgroundColor: '#a8a9aa' }} />
                <BookingTableFull/>
            </Box>
        </ThemeProvider>
    );
}
