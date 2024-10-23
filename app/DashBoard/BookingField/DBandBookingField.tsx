import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, TextField, Divider, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Navigation, Router } from '@toolpad/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { BookingTable, FieldType } from './BookingTable';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { ServiceAndPay } from '../ServiceAndPay/ServiceAndPay';
import { UpdateInformation } from '../Data/UpdateInfo';
import { Typography } from '@mui/material';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Đặt sân',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Sử dụng dịch vụ và thanh toán',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'info',
        title: 'Cập nhật thông tin sân',
        icon: <DescriptionIcon />,
    },
];

export const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        color: 'black',
                    },
                },
            },
        },
    },
});

const demoTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            paper: '#232522',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

export const StyledH3 = styled('h3')({
    color: 'black',
    fontSize: '22px',
    margin: '1rem 1rem 0 1rem',
    fontWeight: 'bold',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
});


function DemoPageContent({ pathname }: { pathname: string }) {
    if (!pathname || pathname === '/') {
        return (
            <Box></Box>
        );
    }

}

interface DemoProps {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
}

// --------------------------------------------------------- Thong tin dang ki ---------------------------------------
interface BasicSelectProps {
    title: string;
    selection: Array<{ label: string; value: string }>;
    value: string;
    onChange: (value: string) => void;
}

export const BasicSelect: React.FC<BasicSelectProps> = ({ title, selection, value, onChange }) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120, padding: '0.5rem 1rem', width: '25ch' }}>
            <FormControl fullWidth>
                <InputLabel size="small" id="basic-select-label">{title}</InputLabel>
                <Select
                    labelId="basic-select-label"
                    id="basic-select"
                    size="small"
                    value={value}
                    label={title}
                    onChange={handleChange}
                >
                    {selection.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

type SelectProps = {
    label: string;
    value: number;
    selection: Array<{ label: string; value: string }>;
    onChange: (value: number) => void;
};

const FieldSelect: React.FC<SelectProps> = ({ label, value, selection, onChange }) => {
    const handleChange = (event: SelectChangeEvent<number>) => {
        onChange(event.target.value as number);
    };

    return (
        <Box sx={{ minWidth: 120, padding: '0.5rem 1rem', width: '25ch' }}>
            <FormControl fullWidth>
                <InputLabel size='small' id="basic-select-label">{label}</InputLabel>
                <Select
                    size='small'
                    labelId="basic-select-label"
                    id="basic-select"
                    value={value}
                    label={label}
                    onChange={handleChange}
                // sx={{
                //   backgroundColor: '#f0f0f0',
                //   borderRadius: '5px',
                //   border: '1px solid #ccc',
                //   fontSize: '16px',
                // }}
                >
                    {selection.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                    {/* {[0, 1, 2, 3, 4, 5].map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))} */}
                </Select>
            </FormControl>
        </Box>
    );
};

type BasicTextFieldsProps = {
    label: string;
    inputValue: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
function BasicTextFields({ label, inputValue, onInputChange }: BasicTextFieldsProps) {
    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { minWidth: 120, m: '0.5rem 1rem' } }}
            noValidate
            autoComplete="off"
        >
            <TextField
                InputLabelProps={{
                    shrink: true,
                }}
                id="outlined-basic" label={label} variant="outlined" size="small"
                value={inputValue}
                onChange={onInputChange} />
        </Box>
    );
}

interface BasicDateTimeInputProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicDateTimeInput: React.FC<BasicDateTimeInputProps> = ({ label, value, onChange }) => {
    return (
        <Box sx={{ padding: '0.5rem 1rem', maxWidth: '35ch' }}>
            <TextField
                size='small'
                label={label}
                type="datetime-local"
                value={value}
                onChange={onChange}
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ccc',
                        },
                        '&:hover fieldset': {
                            borderColor: 'blue', // Change border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'blue', // Change border color when focused
                        },
                    },
                }}
            />
        </Box>
    );
};


//  Dat san ----------------------------------------------------------------------------------------------------------------------------------------------------
export interface Schedule {
    id: string;
    fieldNo: number;
    start: string;
    end: string;
    duration: number;
    customer: string;
    customerPhone: string;
    paid: boolean;
}

export let adding = false;

function RegisterInfo() {

    const [schedule, setSchedule] = useState<Omit<Schedule, 'fieldNo' | 'paid' | 'duration'>>({
        id: '',
        start: '',
        end: '',
        customer: '',
        customerPhone: '',
    });
    const [fieldNo, setFieldNo] = React.useState<number>(0);
    const [duration, setDuration] = useState<number | ''>('');
    const [paid, setPaid] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setError(null);

        try {
            const scheduleToPost = {
                ...schedule,
                fieldNo: Number(fieldNo),
                duration: Number(duration),
                start: new Date(schedule.start),
                end: new Date(schedule.end),
                paid: paid
            };

            const response = await fetch('/api/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scheduleToPost),
            });

            if (!response.ok) {
                const { message } = await response.json();
                setError(message || 'Thêm lịch thất bại.');
            } else {
                const data = await response.json();
                setSuccess('Thêm lịch thành công');
                setSchedule({ id: '', start: '', end: '', customer: '', customerPhone: '' });
                setFieldNo(0);
                setDuration('');
                setPaid(false);
                adding = !adding;
            }
        } catch (error: any) {
            setError(error.message);
        }
    };
    const [currentIndex, setCurrentIndex] = useState(0); 

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === fieldImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 2000); 

        return () => clearInterval(interval); 
    }, []);
    const fieldImages = [
        'https://assets2.rappler.com/6677C2B68AF94FD1BD758C065AC43A07/img/A3D090E5C87B4240BC03138FEC718B84/1.jpg', 
        'https://i.pinimg.com/736x/f5/9a/2c/f59a2cc5e8b8f13d348f757263a5f4c1.jpg',
        'https://sportsvenuecalculator.com/wp-content/uploads/2023/09/4-3.jpg',
        'https://www.xgrass.com/cmss_files/imagelibrary/sub-openplay-field.jpg'
    ];
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ px: 2 }}>

                    <Grid size={{ xs: 12, md: 3.5 }} >

                        <Grid
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: 4,
                                // mt: 1,
                                // ml: 2,
                                boxShadow: 15,
                                // pb: 1,
                                // '&:hover': {
                                //     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                                //     transform: 'scale(1.02)',
                                //     transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                // },
                            }}>
                            <StyledH3 sx={{ pt: '1rem' }}>Thông tin đăng ký</StyledH3>
                            <Divider sx={{ mb: 2, height: '2px', backgroundColor: '#a8a9aa', width: '70%' }} />
                            <BasicDateTimeInput
                                label="Ngày giờ nhận sân"
                                value={schedule.start}
                                onChange={(e) => setSchedule({ ...schedule, start: e.target.value })}
                            />
                            <BasicDateTimeInput
                                label="Ngày giờ trả sân"
                                value={schedule.end}
                                onChange={(e) => {
                                    setSchedule({ ...schedule, end: e.target.value });
                                    setDuration((new Date(schedule.end).getTime() - new Date(schedule.start).getTime()) / 60000);
                                }}
                            />
                        </Grid>

                        <Grid
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: 4,
                                boxShadow: 15,
                            }}>
                            <StyledH3 sx={{ pt: '1rem' }}>Thông tin loại sân</StyledH3>
                            <Divider sx={{ mb: 2, height: '2.5px', backgroundColor: '#a8a9aa', width: '70%' }} />
                            <FieldSelect label='Chọn sân' value={fieldNo} selection={FieldType} onChange={setFieldNo} />
                        </Grid>

                        <Grid
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: 4,
                                mb: 2,
                                // mt: 1,
                                // ml: 2,
                                boxShadow: 15,
                                // pb: 1,
                            }}>
                            <StyledH3 sx={{ pt: '1rem' }}>Hình ảnh sân</StyledH3>
                            <Divider sx={{ mb: 2, height: '2px', backgroundColor: '#a8a9aa', width: '70%' }} />

                            <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem' }}>
                                <img
                                    src={fieldImages[currentIndex]} 
                                    alt={`Field ${currentIndex + 1}`}
                                    style={{ width: '100%', maxWidth: '600px', height:'170px'}} 
                                />
                            </div>
                        </Grid>


                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 3.5 }}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 4,
                            mt: 2,
                            mb: 2,
                            boxShadow: 15,
                        }}
                    >
                        <StyledH3>Thông tin khách hàng</StyledH3>
                        <Divider sx={{ mb: 2, height: '2px', backgroundColor: '#a8a9aa', width: '70%' }} />
                        <BasicTextFields
                            label="Họ tên"
                            inputValue={schedule.customer}
                            onInputChange={(e) => setSchedule({ ...schedule, customer: e.target.value })}
                        />
                        <BasicTextFields
                            label="Số điện thoại"
                            inputValue={schedule.customerPhone}
                            onInputChange={(e) => setSchedule({ ...schedule, customerPhone: e.target.value })}
                        />
                        <BasicTextFields
                            label="Số CCCD"
                            inputValue={schedule.id}
                            onInputChange={(e) => setSchedule({ ...schedule, id: e.target.value })}
                        />
                        {/* <BasicDateTimeInput
                            label="Ngày sinh"
                            value={inputValue.id}
                            onChange={(e) => setInputValue({})}
                        />
                        <BasicTextFields
                            label="Địa chỉ"
                            inputValue={inputValue.address}
                            onInputChange={(e) => setInputValue({})}
                        /> */}
                        <Box sx={{ minWidth: 120, m: '0.5rem 1rem' }}>
                            <TextField
                                id="outlined-read-only-input"
                                label="Thời gian sử dụng sân"
                                size='small'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={`${(new Date(schedule.end).getTime() - new Date(schedule.start).getTime()) / 3600000} h`}
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                            />
                            {/* <TextField
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type='number'
                                id="outlined-basic" label="Duration" variant="outlined" size='small'
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                            /> */}
                        </Box>
                        <Box sx={{ m: '0.5rem 1rem' }}>
                            <FormControlLabel
                                control={<Checkbox checked={paid} onChange={(e) => setPaid(e.target.checked)} />} label="Đã thanh toán" />
                        </Box>
                        <Box sx={{ padding: '1rem' }}>
                            <Button variant="contained" onClick={handleSubmit}>
                                Đặt
                            </Button>
                        </Box>
                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 5 }}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 4,
                            mt: 2, mb: 2,
                            boxShadow: 15,
                        }}>
                        <StyledH3>Danh sách đặt sân trong ngày</StyledH3>
                        <Divider sx={{ mb: 2, height: '2px', backgroundColor: '#a8a9aa', width: '70%' }} />
                        <Box sx={{ m: 2 }}>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && <p style={{ color: 'green' }}>{success}</p>}
                            <BookingTable />
                        </Box>
                    </Grid>

                </Grid>

            </Box>
        </ThemeProvider>
    );
}

const TitleComponent: React.FC = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="90vh"
            textAlign="center"
            position="relative"
        >
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '4rem',
                    borderRadius: '10px',
                    overflow: 'hidden',
                }}
            >
                <Typography variant="h2" sx={{ fontSize: '100px', fontWeight: 'bold', color: 'white' }}>
                    QUẢN LÝ ĐẶT SÂN
                </Typography>
                <Typography variant="h2" sx={{ fontSize: '100px', fontWeight: 'bold', color: 'white' }}>
                    BÓNG ĐÁ
                </Typography>
                <Box
                    component="img"
                    src="https://png.pngtree.com/png-clipart/20220403/original/pngtree-soccer-ball-white-and-black-png-image_7494420.png"
                    alt="Soccer Ball"
                    sx={{
                        position: 'absolute',
                        width: '60px',
                        animation: 'rollAround 10s linear infinite',
                    }}
                />
            </Box>

            <style jsx>{`
                @keyframes rollAround {
                    0% {
                        top: 0;
                        left: 0;
                        transform: rotate(0deg);
                    }
                    25% {
                        top: 0;
                        left: calc(100% - 60px); /* Di chuyển sang phải */
                        transform: rotate(90deg);
                    }
                    50% {
                        top: calc(100% - 60px); /* Di chuyển xuống dưới */
                        left: calc(100% - 60px);
                        transform: rotate(180deg);
                    }
                    75% {
                        top: calc(100% - 60px);
                        left: 0;
                        transform: rotate(270deg);
                    }
                    100% {
                        top: 0;
                        left: 0;
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </Box>
    );
};


export default function DashboardLayoutSlots(props: DemoProps) {
    const { window } = props;

    const [pathname, setPathname] = React.useState('/dashboard');

    const router = React.useMemo<Router>(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;
    // #cfdad0
    return (
        <Box
            sx={{ 
                backgroundImage: 'url("https://congdankhuyenhoc.qltns.mediacdn.vn/449484899827462144/2022/12/30/chum-anh-can-canh-svd-jalan-besar-noi-dien-ra-tran-viet-nam-dau-singapore-1672308235-8-1672387394412-16723873946831528897086.jpg")', // Replace with your image URL
                backgroundSize: 'cover', // Makes the background cover the entire area
                backgroundPosition: 'center', // Centers the image
                minHeight: '100vh'
            }}
        >
            <AppProvider
                navigation={NAVIGATION}
                branding={{
                    logo: null,
                    title: '',
                }}
                router={router}
                theme={demoTheme}
                window={demoWindow}
            >
                <DashboardLayout slots={{}}>
                    <DemoPageContent pathname={pathname} />
                    {pathname === '/' ? <TitleComponent /> : <DemoPageContent pathname={pathname} />}
                    {pathname === '/dashboard' ? <RegisterInfo /> : <DemoPageContent pathname={pathname} />}
                    {pathname === '/orders' ? <ServiceAndPay /> : <DemoPageContent pathname={pathname} />}
                    {pathname === '/info' ? <UpdateInformation /> : <DemoPageContent pathname={pathname} />}
                </DashboardLayout>
            </AppProvider>
        </Box>
    );
}
