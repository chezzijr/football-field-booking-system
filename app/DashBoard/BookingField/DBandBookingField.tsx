import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
// import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { BookingTable, BookingTableFull, Booking, BookingList, priceField } from './BookingTable';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dayjs, { Dayjs } from 'dayjs';
import { ServiceAndPay } from '../ServiceAndPay/ServiceAndPay';
import { UpdateInformation } from '../Data/UpdateInfo';
import { Rows } from '../Data/UpdateInfo';

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

type BasicTextFieldsProps = {
  label: string;
  inputValue: string;
  onInputChange: (value: string) => void;
};
function BasicTextFields({ label, inputValue, onInputChange }: BasicTextFieldsProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value); // Pass the value to the parent on each keystroke
  };
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { minWidth: 120, m: '0.5rem 1rem' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label={label} variant="outlined" size="small"
        value={inputValue}
        onChange={handleChange} />
    </Box>
  );
}


type BasicDateTimePickerProps = {
  label: string;
  selectedDateTimeCome: Dayjs | null; // Receive selectedDateTimeCome as a prop
  onDateTimeChange: (value: Dayjs | null) => void; // Function to call when date-time changes
};

function BasicDateTimePicker({ label, selectedDateTimeCome, onDateTimeChange }: BasicDateTimePickerProps) {
  const handleDateTimeChange = (newDateTime: Dayjs | null) => {
    onDateTimeChange(newDateTime);
  };
  return (
    <Box sx={{ padding: '0.5rem 1rem', maxWidth: '35ch' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker label={label}
            value={selectedDateTimeCome}
            onChange={handleDateTimeChange}
            slotProps={{
              textField: {
                size: 'small',
              },
            }} />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}


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

function RowRadioButtonsGroup() {
  return (
    <FormControl sx={{ padding: '0.5rem 1rem' }}>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Nam" />
        <FormControlLabel value="male" control={<Radio />} label="Nữ" />
      </RadioGroup>
    </FormControl>

  );
}

//  Dat san ----------------------------------------------------------------------------------------------------------------------------------------------------

function RegisterInfo() {
  const [selectedType, setSelectedType] = useState<{ [key: string]: string }>({
    fieldType: '',
    customerType: '',
  });
  const handleSelectChange = (field: string, value: string) => {
    setSelectedType((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const [inputValue, setInputValue] = useState<{ [key: string]: string }>({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    address: '',
    nationality: '',
    numberOfPeople: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date); // Update the selected date
  };

  const [selectedDateTimeCome, setSelectedDateTimeCome] = useState<Dayjs | null>(null);

  const handleDateTimeChange = (dateTime: Dayjs | null) => {
    setSelectedDateTimeCome(dateTime);
  };
  const [selectedDateTimeGo, setSelectedDateTimeGo] = useState<Dayjs | null>(null);

  const handleDateTimeChangeGo = (dateTime: Dayjs | null) => {
    setSelectedDateTimeGo(dateTime);
  };
  const timeStart = selectedDateTimeCome ? selectedDateTimeCome.format('YYYY-MM-DD HH:mm') : dayjs().format('YYYY-MM-DD HH:mm');
  const timeEnd = selectedDateTimeGo ? selectedDateTimeGo.format('YYYY-MM-DD HH:mm') : dayjs().format('YYYY-MM-DD HH:mm');

  const [rows, setRows] = useState<Booking[]>(Rows)

  const handleButtonClick = () => {

    const newBooking = {
      fullName: inputValue.fullName,
      timeStart: timeStart,
      fieldType: priceField.find(field => field.value === selectedType.fieldType)?.label || '', // Replace with actual field type if needed
    };
    const isDuplicate = rows.some(row =>
      row.fieldType === newBooking.fieldType && (
        (newBooking.timeStart < row.timeStart && timeEnd > row.timeStart) ||
        (newBooking.timeStart >= row.timeStart && newBooking.timeStart < timeEnd)
      )
    );
    if (isDuplicate) {
      alert('Đã có người đặt');
      return;
    }

    setRows(prevRows => [...prevRows, newBooking]);
  };

  const typeCustomer = [
    { label: 'Trường học', value: '0' },
    { label: 'Công ty', value: '1' },
    { label: 'Khác', value: '2' },
  ];
  
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
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Shadow on hover
                  transform: 'scale(1.02)', // Slightly scale up on hover
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Transition effect
                },
              }}>
              <StyledH3 sx={{ pt: '1rem' }}>Thông tin đăng ký</StyledH3>
              <Divider sx={{mb:2, height: '2px', backgroundColor: '#a8a9aa' }} />
              <BasicTextFields
                label="Số lượng người tham gia"
                inputValue={inputValue.numberOfPeople}
                onInputChange={(value) => handleInputChange('numberOfPeople', value)}
              />
              <BasicDateTimePicker label="Ngày giờ nhận" selectedDateTimeCome={selectedDateTimeCome} onDateTimeChange={handleDateTimeChange} />
              <BasicDateTimePicker label="Ngày giờ trả" selectedDateTimeCome={selectedDateTimeGo} onDateTimeChange={handleDateTimeChangeGo} />
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
              <Divider sx={{mb:2, height: '2px', backgroundColor: '#a8a9aa' }} />
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
              <Divider sx={{mb:2, height: '2.5px', backgroundColor: '#a8a9aa' }} />
              <BasicSelect title="Loại sân" selection={priceField} value={selectedType.fieldType} onChange={(value) => handleSelectChange('fieldType', value)} />
              <Box sx={{ padding: '1rem' }}>
                <Button variant="contained" onClick={handleButtonClick}>
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
              maxHeight: '620px',
              '&:hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Shadow on hover
                transform: 'scale(1.02)', // Slightly scale up on hover
                transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Transition effect
              },
            }}
          >
            <StyledH3>Thông tin khách hàng</StyledH3>
            <Divider sx={{mb:2, height: '2px', backgroundColor: '#a8a9aa' }} />
            <BasicTextFields
              label="Họ và tên"
              inputValue={inputValue.fullName}
              onInputChange={(value) => handleInputChange('fullName', value)}
            />
            <BasicTextFields
              label="Số CCCD"
              inputValue={inputValue.idNumber}
              onInputChange={(value) => handleInputChange('idNumber', value)}
            />
            <BasicSelect title="Loại khách hàng" selection={typeCustomer} value={selectedType.customerType} onChange={(value) => handleSelectChange('customerType', value)} />
            <BasicTextFields
              label="Số điện thoại"
              inputValue={inputValue.phoneNumber}
              onInputChange={(value) => handleInputChange('phoneNumber', value)}
            />
            <BasicDatePicker label='Ngày sinh' selectedDate={selectedDate} onDateChange={handleDateChange} />
            <BasicTextFields
              label="Địa chỉ"
              inputValue={inputValue.address}
              onInputChange={(value) => handleInputChange('address', value)}
            />
            <RowRadioButtonsGroup />
            <BasicTextFields
              label="Quốc tịch"
              inputValue={inputValue.nationality}
              onInputChange={(value) => handleInputChange('nationality', value)}
            />
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
            <Divider sx={{mb:2, height: '2px', backgroundColor: '#a8a9aa' }} />
            <Box sx={{ m: 2 }}>
              <BookingTable rows={rows} />
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
