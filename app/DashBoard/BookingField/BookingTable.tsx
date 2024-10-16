import React, { useState } from 'react'; // Import useState từ React
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import {InputAdornment} from '@mui/material'

// interface BasicSelectProps {
//   title: string;
//   selection: { label: string; value: string }[];
//   onChange: (value: string) => void;
// }

// const BasicSelect: React.FC<BasicSelectProps> = ({ title, selection, onChange }) => {
//   const handleChange = (event: SelectChangeEvent<string>) => {
//     onChange(event.target.value);
//   };

//   return (
//     <Box sx={{ minWidth: 120, padding: '0.5rem 1rem', maxWidth: '25ch' }}>
//       <FormControl fullWidth>
//         <InputLabel size="small" id="basic-select-label">{title}</InputLabel>
//         <Select labelId="basic-select-label" id="basic-select" size="small" label={title} onChange={handleChange}>
//           {selection.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

export const priceField = [
  { label: 'Sân 5 cỏ nhân tạo', value: '0' },
  { label: 'Sân 5 cỏ tự nhiên', value: '1' },
  { label: 'Sân 7 cỏ nhân tạo', value: '2' },
  { label: 'Sân 11', value: '3' },
];


export const priceMap: Record<string, string> = {
  '0': '500.000',
  '1': '600.000',
  '2': '700.000',
  '3': '1.000.000.000',
};

// export function BookingComponent() {
//   const [selectedValue, setSelectedValue] = useState<string>('');

//   const handleSelectChange = (value: string) => {
//     setSelectedValue(value);
//   };

//   return (
//     <Box>
//       <BasicSelect title="Loại sân" selection={priceField} onChange={handleSelectChange} />
//       {selectedValue && (
//         <Typography sx={{ mt: 0.5, padding: '0.5rem 1rem' }}>
//           Giá sân: {priceMap[selectedValue]} VND
//         </Typography>
//       )}
//     </Box>
//   );
// }

export interface Booking {
  fullName: string;
  timeStart: string;
  fieldType: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // backgroundColor: '#5c7a37', 
  backgroundColor: '#2e302d', 
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 16,
  color: 'white', 
  border: '1px solid #374921', 
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: '#eaf3ea', 
    backgroundColor: 'whitesmoke', 
  },
  '& td, & th': {
    border: '1px solid #374921', // Ensure borders are applied to all cells
  },
}));

export function BookingTable({ rows }: { rows: Booking[] }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: '0.5rem', overflow: 'hidden' }}>
      <Table size='small' aria-label="booking table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tên khách hàng</StyledTableCell>
            <StyledTableCell>Ngày giờ nhận sân</StyledTableCell>
            <StyledTableCell>Loại sân</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <TableCell>{row.fullName}</TableCell>
              <TableCell>{row.timeStart}</TableCell>
              <TableCell>{row.fieldType}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export interface BookingList {
  fullName: string;
  timeStart: string;
  timeEnd: string;
  numberOfPeople: number;
  fieldType: string;
  idNumber: string;
  typeCustomer: string;
  phone: string;
  birthdate: string;
  address: string;
  gender: string;
  nation: string;
}

export function BookingTableFull({ rows }: { rows: BookingList[] }) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredRows = rows.filter((row) => {
    return (
      row.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.phone.includes(searchTerm) ||
      row.birthdate.includes(searchTerm) ||
      row.idNumber.includes(searchTerm) ||
      row.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.nation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.typeCustomer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.fieldType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: '0.5rem', overflow: 'hidden' }}>
      <TextField
        variant="outlined"
        size='small'
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ margin: '1rem', width: 'calc(100% - 2rem)' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Table size='small' aria-label="booking table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tên khách hàng</StyledTableCell>
            <StyledTableCell>SĐT</StyledTableCell>
            <StyledTableCell>Ngày sinh</StyledTableCell>
            <StyledTableCell>CCCD</StyledTableCell>
            <StyledTableCell>Ngày giờ nhận sân</StyledTableCell>
            <StyledTableCell>Ngày giờ trả sân</StyledTableCell>
            <StyledTableCell>Địa chỉ</StyledTableCell>
            <StyledTableCell>Giới tính</StyledTableCell>
            <StyledTableCell>Quốc tịch</StyledTableCell>
            <StyledTableCell>Số lượng người tham gia</StyledTableCell>
            <StyledTableCell>Loại khách hàng</StyledTableCell>
            <StyledTableCell>Loại sân</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row, index) => (
            <StyledTableRow key={index}>
              <TableCell>{row.fullName}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.birthdate}</TableCell>
              <TableCell>{row.idNumber}</TableCell>
              <TableCell>{row.timeStart}</TableCell>
              <TableCell>{row.timeEnd}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.nation}</TableCell>
              <TableCell>{row.numberOfPeople}</TableCell>
              <TableCell>{row.typeCustomer}</TableCell>
              <TableCell>{row.fieldType}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


