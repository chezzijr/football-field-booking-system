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
import {PaymentHistory} from './Transaction';
import { StyledH3, theme, BasicSelect } from '../BookingField/DBandBookingField';
import PaymentIcon from '@mui/icons-material/Payment';
import { Payment } from '@/types/payment';

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
        { label: 'Thuê huấn luyện viên', value: '0', price: 100000 },
        { label: 'Thuê giày', value: '1', price: 50000 },
        { label: 'Thuê trọng tài', value: '2', price: 200000 },
        { label: 'Thuê áo đấu', value: '3', price: 50000 },
        { label: 'Không', value: '4', price: 0 },
    ];
    const othersService = [
        { label: 'Bình nước 20L', value: '0', price: 50000 },
        { label: 'Revive', value: '1', price: 10000 },
        { label: 'Pocari', value: '2', price: 15000 },
        { label: 'Aquarius', value: '3', price: 15000 },
        { label: 'Không', value: '4', price: 0 },
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
                            <StyledH3>Thành tiền: {(typeService.find(t => t.value === selectedType)?.price || 0) + (othersService.find(t => t.value === othersType)?.price || 0)}</StyledH3>
                        </Box>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mt: 2, ml: 2, mb: 2 }}
                            startIcon={<PaymentIcon />}
                            onClick={() => {
                                const serviceTotal = typeService.find(t => t.value === selectedType)?.price || 0;
                                const othersTotal = othersService.find(t => t.value === othersType)?.price || 0;
                                const randomId = (Math.random() + 1).toString(36).substring(7);
                                const bill: Payment = {
                                    id: randomId,
                                    amount: serviceTotal + othersTotal,
                                    description: `Dịch vụ: ${typeService.find(t => t.value === selectedType)?.label || 'Không'}; Nước: ${othersService.find(t => t.value === othersType)?.label || 'Không'}`,
                                    date: new Date(),
                                }
                                fetch('/api/payment', {
                                    method: 'POST',
                                    body: JSON.stringify(bill),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }).then((res) => {
                                    if (res.ok) {
                                        alert('Thanh toán thành công');
                                    } else {
                                        alert('Thanh toán thất bại ' + res.statusText);
                                    }
                                }).catch((error) => {
                                    alert('Thanh toán thất bại: ' + error);
                                })
                            }}
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
                        <StyledH3>Lịch sử giao dịch</StyledH3>
                        <Divider sx={{ height: '2px', backgroundColor: '#a8a9aa' }} />
                        <PaymentHistory/>
                    </Grid>

                </Grid>
            </ThemeProvider>

        </Box>
    );
}

