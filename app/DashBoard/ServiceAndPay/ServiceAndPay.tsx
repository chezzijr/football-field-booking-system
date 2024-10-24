import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Divider from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { PaymentHistory, TransactionChart } from './Transaction';
import { StyledH3, theme, BasicSelect } from '../BookingField/DBandBookingField';
import PaymentIcon from '@mui/icons-material/Payment';
import { Payment } from '@/types/payment';
import Grid from '@mui/material/Grid2';
import { toast } from 'react-toastify';

export var check = false;
interface QuantitySelectorProps {
    onQuantityChange: (quantity: number) => void;  // Callback để truyền giá trị số lượng lên parent
    label: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ onQuantityChange, label }) => {
    const [quantity, setQuantity] = useState<number>(1);


    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.max(0, Number(event.target.value));  // Giữ giá trị không âm
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    return (
        <Box display="flex" alignItems="center" sx={{ pl: '1rem', pr: '1rem' }}>
            <Typography sx={{ mr: 2 }}>{label}</Typography>
            <TextField
                value={quantity}
                onChange={handleQuantityChange}
                type="number"
                inputProps={{ min: 0 }}  // Không cho phép số âm
                sx={{ width: '60px', mx: 2, textAlign: 'center' }}
                size="small"
            />
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
    const beverageService = [
        { label: 'Bình nước 20L', value: '0', price: 50000 },
        { label: 'Revive', value: '1', price: 10000 },
        { label: 'Pocari', value: '2', price: 15000 },
        { label: 'Aquarius', value: '3', price: 15000 },
        { label: 'Không', value: '4', price: 0 },
    ];
    const [selectedType, setSelectedType] = useState<string>('4');
    const [beverageType, setBeverageType] = useState<string>('4');
    const [serviceQuantity, setServiceQuantity] = useState<number>(1);
    const [beverageQuantity, setBeverageQuantity] = useState<number>(1);

    const handleServiceQuantityChange = (newQuantity: number) => {
        setServiceQuantity(newQuantity);
    };
    const handleBeverageQuantityChange = (newQuantity: number) => {
        setBeverageQuantity(newQuantity);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>

            <ThemeProvider theme={theme}>
                <Grid container spacing={2} sx={{ px: 2 }}>
                    <Grid size={{ xs: 12, md: 6 }}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 4,
                            boxShadow: 3,
                            mb: 2, mt: 2,
                        }}>
                        <StyledH3>Danh sách dịch vụ</StyledH3>
                        <Divider sx={{ mb: 2, height: '2px', backgroundColor: '#a8a9aa', width: '40%', }} />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <BasicSelect title='Loại dịch vụ' selection={typeService} value={selectedType} onChange={setSelectedType} />
                            <BasicSelect title='Nước uống' selection={beverageService} value={beverageType} onChange={setBeverageType} />
                            {/* <QuantitySelector /> */}
                        </Box>
                        <Box sx={{
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            gap: 2, 
                        }}>
                            <QuantitySelector onQuantityChange={handleServiceQuantityChange} label='Số lượng dịch vụ: ' />
                            <QuantitySelector onQuantityChange={handleBeverageQuantityChange} label='Số lượng nước: ' />
                        </Box>
                        <StyledH3>Thành tiền: {(typeService.find(t => t.value === selectedType)?.price || 0) * serviceQuantity + (beverageService.find(t => t.value === beverageType)?.price || 0) * beverageQuantity}</StyledH3>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mt: 2, ml: 2, mb: 2 }}
                            startIcon={<PaymentIcon />}
                            onClick={() => {
                                const serviceTotal = (typeService.find(t => t.value === selectedType)?.price || 0) * serviceQuantity;
                                const othersTotal = (beverageService.find(t => t.value === beverageType)?.price || 0) * beverageQuantity;
                                const randomId = (Math.random() + 1).toString(36).substring(7);
                                const bill: Payment = {
                                    id: randomId,
                                    amount: serviceTotal + othersTotal,
                                    description: `Dịch vụ: ${typeService.find(t => t.value === selectedType)?.label || 'Không'}; Nước: ${beverageService.find(t => t.value === beverageType)?.label || 'Không'}`,
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
                                        toast.success('Thanh toán thành công');
                                        check = !check;
                                    } else {
                                        toast.error('Thanh toán thất bại: ' + res.statusText);
                                    }
                                }).catch((error) => {
                                    toast.error('Thanh toán thất bại: ' + error);
                                })
                            }}
                        >
                            Thanh Toán
                        </Button>
                        <Box sx={{ ml: 3 }}>
                            <TransactionChart />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 4,
                            boxShadow: 3,
                            mb: 2, mt: 2,
                        }}>
                        <StyledH3>Lịch sử giao dịch</StyledH3>
                        <Divider sx={{ height: '2px', backgroundColor: '#a8a9aa', width: '40%', }} />
                        <Box sx={{ maxHeight: '526px', overflowY: 'auto', padding: 2, }}>
                            <PaymentHistory />
                        </Box>
                    </Grid>

                </Grid>
            </ThemeProvider>

        </Box>
    );
}

