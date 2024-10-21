import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, TextField, Divider, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { BookingTable, FieldType } from './BookingTable';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { ServiceAndPay } from '../ServiceAndPay/ServiceAndPay';
import { UpdateInformation } from '../Data/UpdateInfo';


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


type BasicDatePickerProps = {
  label: string;
  selectedDate: Dayjs | null;
  onDateChange: (value: Dayjs | null) => void;
};

function BasicDatePicker({ label, selectedDate, onDateChange }: BasicDatePickerProps) {
  const handleDateChange = (newDate: Dayjs | null) => {
    onDateChange(newDate);
  };
  return (
    <Box sx={{ padding: '0.5rem 1rem', maxWidth: '35ch' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label={label} slotProps={{
            textField: {
              size: 'small',
            },
          }}
            value={selectedDate}
            onChange={handleDateChange} />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}

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

  const [inputValue, setInputValue] = useState<{ [key: string]: string }>({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    address: '',
    nationality: '',
    numberOfPeople: '',
  });

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date); 
  };

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

    if (!schedule.id || !schedule.start || !schedule.end || !fieldNo || !duration || !schedule.customer || !schedule.customerPhone) {
      setError("Cần điền đủ thông tin.");
      return;
    }
    
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{}}>
        <Grid container spacing={2} columns={14}>

          <Grid size={{ xs: 13.7, md: 4 }} >

            <Grid
              sx={{
                backgroundColor: 'white',
                borderRadius: 4,
                mt: 1,
                ml: 2,
                boxShadow: 15,
                pb: 1,
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                },
              }}>
              <StyledH3 sx={{ pt: '1rem' }}>Thông tin đăng ký</StyledH3>
              <Divider sx={{ mb: 2, height: '2px', backgroundColor: '#a8a9aa' }} />
              <BasicTextFields
                label="Số lượng người tham gia"
                inputValue={inputValue.numberOfPeople}
                onInputChange={(e) => setInputValue({})}
              />
              <BasicDateTimeInput
                label="Ngày giờ nhận sân"
                value={schedule.start}
                onChange={(e) => setSchedule({ ...schedule, start: e.target.value })}
              />
              <BasicDateTimeInput
                label="Ngày giờ trả sân"
                value={schedule.end}
                onChange={(e) => setSchedule({ ...schedule, end: e.target.value })}
              />
            </Grid>

            <Grid
              sx={{
                backgroundColor: 'white',
                borderRadius: 4,
                mt: 1,
                ml: 2,
                boxShadow: 15,
                pb: 1,
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Shadow on hover
                  transform: 'scale(1.02)', // Slightly scale up on hover
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Transition effect
                },
              }}>
              <StyledH3 sx={{ pt: '1rem' }}>Tìm kiếm khách hàng</StyledH3>
              <Divider sx={{ mb: 2, height: '2px', backgroundColor: '#a8a9aa' }} />
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
                <Box sx={{ minWidth: 120, m: '0.5rem 1rem' }}>
                  <TextField id="outlined-basic" label="Họ tên" variant="outlined" size='small' />
                </Box>
                <Button variant='contained'>
                  <SearchIcon />
                </Button>
              </Box>
            </Grid>

            <Grid
              sx={{
                backgroundColor: 'white',
                borderRadius: 4,
                mt: 1,
                mb: 2,
                ml: 2,
                boxShadow: 15,
                pb: 1,
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Shadow on hover
                  transform: 'scale(1.02)', // Slightly scale up on hover
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Transition effect
                },
              }}>
              <StyledH3 sx={{ pt: '1rem' }}>Thông tin loại sân</StyledH3>
              <Divider sx={{ mb: 2, height: '2.5px', backgroundColor: '#a8a9aa' }} />
              <FieldSelect label='Chọn sân' value={fieldNo} selection={FieldType} onChange={setFieldNo} />
              <Box sx={{ padding: '1rem' }}>
                <Button variant="contained" onClick={handleSubmit}>
                  Đặt
                </Button>
              </Box>
            </Grid>

          </Grid>

          <Grid
            size={{ xs: 13.4, md: 4 }}
            sx={{
              backgroundColor: 'white',
              borderRadius: 4,
              mt: 2,
              mb: 2,
              ml: 2,
              boxShadow: 15,
              // maxHeight: '800px',
              '&:hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Shadow on hover
                transform: 'scale(1.02)', // Slightly scale up on hover
                transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Transition effect
              },
            }}
          >
            <StyledH3>Thông tin khách hàng</StyledH3>
            <Divider sx={{ mb: 2, height: '2px', backgroundColor: '#a8a9aa' }} />
            <BasicTextFields
              label="Họ tên"
              inputValue={schedule.customer}
              onInputChange={(e) => setSchedule({ ...schedule, customer: e.target.value })}
            />
            {/* <BasicSelect title="Loại khách hàng" selection={typeCustomer} value={selectedType.customerType} onChange={(value) => handleSelectChange('customerType', value)} /> */}
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
            <BasicDatePicker label='Ngày sinh' selectedDate={selectedDate} onDateChange={handleDateChange} />
            <BasicTextFields
              label="Địa chỉ"
              inputValue={inputValue.address}
              onInputChange={(e) => setInputValue({})}
            />
            <Box sx={{ minWidth: 120, m: '0.5rem 1rem' }}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                type='number'
                id="outlined-basic" label="Duration" variant="outlined" size='small'
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </Box>
            <Box sx={{ m: '0.5rem 1rem' }}>
              <FormControlLabel
                control={<Checkbox checked={paid} onChange={(e) => setPaid(e.target.checked)} />} label="Đã thanh toán" />
            </Box>
          </Grid>

          <Grid
            size={{ xs: 13.4, md: 5.5 }}
            sx={{
              backgroundColor: 'white',
              borderRadius: 4,
              mt: 2,
              ml: 2,
              mb: 2,
              boxShadow: 15,
              '&:hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Shadow on hover
                transform: 'scale(1.02)', // Slightly scale up on hover
                transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Transition effect
              },
            }}>
            <StyledH3>Danh sách đặt sân trong ngày</StyledH3>
            <Divider sx={{ mb: 2, height: '2px', backgroundColor: '#a8a9aa' }} />
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
          {pathname === '/dashboard' ? <RegisterInfo /> : <DemoPageContent pathname={pathname} />}
          {pathname === '/orders' ? <ServiceAndPay /> : <DemoPageContent pathname={pathname} />}
          {pathname === '/info' ? <UpdateInformation /> : <DemoPageContent pathname={pathname} />}
        </DashboardLayout>
      </AppProvider>
    </Box>
  );
}
