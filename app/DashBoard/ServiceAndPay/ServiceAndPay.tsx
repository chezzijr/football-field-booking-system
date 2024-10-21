import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BillForm from './Bill';
import { StyledH3, theme, BasicSelect } from '../BookingField/DBandBookingField';
import PaymentIcon from '@mui/icons-material/Payment';

const QuantitySelector: React.FC = () => {
    const [quantity, setQuantity] = useState<number>(1);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <Box display="flex" alignItems="center" sx={{ pl: '1rem', pr: '1rem' }}>
            <Button variant="contained" color="primary" size='small' onClick={handleDecrease} sx={{ minWidth: '40px' }}>
                <RemoveIcon />
            </Button>
            <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>
                {quantity}
            </Typography>
            <Button variant="contained" color="primary" size='small' onClick={handleIncrease} sx={{ minWidth: '40px' }}>
                <AddIcon />
            </Button>
        </Box>
    );
};

export function ServiceAndPay() {
    const typeService = [
        { label: 'Thuê huấn luyện viên', value: '0' },
        { label: 'Thuê giày', value: '1' },
        { label: 'Thuê trọng tài', value: '2' },
        { label: 'Thuê áo đấu', value: '3' },
        { label: 'Không', value: '4' },
    ];
    const othersService = [
        { label: 'Bình nước 20L', value: '0' },
        { label: 'Revive', value: '1' },
        { label: 'Pocari', value: '2' },
        { label: 'Aquarius', value: '3' },
        { label: 'Không', value: '4' },
    ];
    const [selectedType, setSelectedType] = useState<string>('4');
    const [othersType, setOthersType] = useState<string>('4');
    return (
        <Box>

            <ThemeProvider theme={theme}>
                <Grid container spacing={1} columns={12.67}  >
                    <Grid size={{ xs: 12, md: 6 }}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 4,
                            boxShadow: 3,
                            ml: 2, mb: 1, mt: 2, mr: 2,
                            '&:hover': {
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Shadow on hover
                                transform: 'scale(1.02)', // Slightly scale up on hover
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Transition effect
                            },
                        }}>
                        <StyledH3>Danh sách dịch vụ</StyledH3>
                        <Divider sx={{ mb: 2, height: '2px', backgroundColor: '#a8a9aa' }} />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', pb: '1rem' }}>
                            <BasicSelect title='Loại dịch vụ' selection={typeService} value={selectedType} onChange={setSelectedType} />
                            <BasicSelect title='Nước uống' selection={othersService} value={othersType} onChange={setOthersType} />
                            <QuantitySelector />
                        </Box>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mt: 2, ml: 2, mb: 2 }}
                            startIcon={<PaymentIcon />}
                        >
                            Thanh Toán
                        </Button>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 4,
                            boxShadow: 3,
                            mr: 2, mb: 1, ml: 2, mt: 2,
                            '&:hover': {
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Shadow on hover
                                transform: 'scale(1.02)', // Slightly scale up on hover
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Transition effect
                            },
                        }}>
                        <StyledH3>Hóa đơn</StyledH3>
                        <BillForm />
                    </Grid>

                </Grid>
            </ThemeProvider>

        </Box>
    );
}

