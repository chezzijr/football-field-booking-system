import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Box';
import {BookingTableFull, BookingList} from '../BookingField/BookingTable';
import { StyledH3, theme } from '../BookingField/DBandBookingField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const Rows = [
    {
        fullName: "Nguyễn Văn A", 
        phone: "0375925188", 
        birthdate: "14/05/2002", 
        idNumber: "083305214678",
        timeStart:"20/10/2024 02:10 PM", 
        timeEnd:"20/10/2024 04:10 PM",
        address: "123 Hồng Hà, Nguyễn Hiển",
        gender: "Nam",
        nation: "Việt Nam",
        numberOfPeople: 12,
        typeCustomer: "Trường học",
        fieldType: "Sân 5 cỏ nhân tạo",
    },
    {
        fullName: "Nguyễn Văn A", 
        phone: "0375925188", 
        birthdate: "14/05/2002", 
        idNumber: "083305214678",
        timeStart:"20/10/2024 02:10 PM", 
        timeEnd:"20/10/2024 04:10 PM",
        address: "123 Hồng Hà, Nguyễn Hiển",
        gender: "Nam",
        nation: "Việt Nam",
        numberOfPeople: 12,
        typeCustomer: "Trường học",
        fieldType: "Sân 5 cỏ nhân tạo",
    },
    {
        fullName: "Nguyễn Văn A", 
        phone: "0375925188", 
        birthdate: "14/05/2002", 
        idNumber: "083301345678",
        timeStart:"20/10/2024 02:10 PM", 
        timeEnd:"20/10/2024 04:10 PM",
        address: "123 Hồng Hà, Nguyễn Hiển",
        gender: "Nam",
        nation: "Việt Nam",
        numberOfPeople: 12,
        typeCustomer: "Trường học",
        fieldType: "Sân 5 cỏ nhân tạo",
    },
    {
        fullName: "Nguyễn Văn C", 
        phone: "0375921238", 
        birthdate: "14/05/2002", 
        idNumber: "083305214678",
        timeStart:"20/10/2024 02:10 PM", 
        timeEnd:"20/10/2024 04:10 PM",
        address: "123 Hồng Hà, Nguyễn Hiển",
        gender: "Nam",
        nation: "Việt Nam",
        numberOfPeople: 12,
        typeCustomer: "Trường học",
        fieldType: "Sân 5 cỏ nhân tạo",
    },
    {
        fullName: "Nguyễn Văn B", 
        phone: "0375925188", 
        birthdate: "14/05/2002", 
        idNumber: "083305214678",
        timeStart:"20/10/2024 02:10 PM", 
        timeEnd:"20/10/2024 04:10 PM",
        address: "123 Hồng Hà, Nguyễn Hiển",
        gender: "Nam",
        nation: "Việt Nam",
        numberOfPeople: 12,
        typeCustomer: "Trường học",
        fieldType: "Sân 5 cỏ nhân tạo",
    },
    {
        fullName: "Nguyễn Văn B", 
        phone: "0375925188", 
        birthdate: "14/05/2002", 
        idNumber: "083305214678",
        timeStart:"20/10/2024 02:10 PM", 
        timeEnd:"20/10/2024 04:10 PM",
        address: "123 Hồng Hà, Nguyễn Hiển",
        gender: "Nam",
        nation: "Việt Nam",
        numberOfPeople: 12,
        typeCustomer: "Trường học",
        fieldType: "Sân 5 cỏ nhân tạo",
    },



];

export function UpdateInformation() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ m: 2, p: 2, backgroundColor: 'white', borderRadius: 4, boxShadow: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <StyledH3>Thông tin sân</StyledH3>
                </Box>
                <Divider sx={{mb:2, height: '2px', backgroundColor: '#a8a9aa' }} />
                <BookingTableFull rows={Rows} />
            </Box>
        </ThemeProvider>
    );
}
