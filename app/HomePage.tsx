"use client"
import { Field } from "@/types/field";
import DashboardLayoutSlots from "./DashBoard/BookingField/DBandBookingField"
import { ToastContainer } from 'react-toastify';
import * as React from 'react';
import Box from '@mui/material/Box';

export type HomePageProps = {
    fields: Field[];
}

export default function HomePage(props: HomePageProps) {
    return (
        <Box>
            <ToastContainer />
            <DashboardLayoutSlots/>
        </Box>
    );
}
