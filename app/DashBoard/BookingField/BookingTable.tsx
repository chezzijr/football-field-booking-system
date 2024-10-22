import React, { useState, useEffect } from 'react'; // Import useState từ React
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TextField, Button } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { Schedule, adding } from './DBandBookingField';
import SearchIcon from '@mui/icons-material/Search';

export const FieldType = [
    { label: 'Sân', value: '0' },
    { label: 'Sân 5 cỏ nhân tạo', value: '1' },
    { label: 'Sân 5 cỏ tự nhiên', value: '2' },
    { label: 'Sân 7', value: '3' },
    { label: 'Sân 9', value: '4' },
    { label: 'Sân 11', value: '5' },
];



export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // backgroundColor: '#5c7a37', 
    backgroundColor: '#2e302d',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    border: '1px solid #374921',
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        // backgroundColor: '#eaf3ea', 
        backgroundColor: 'whitesmoke',
    },
    '& td, & th': {
        border: '1px solid #374921', // Ensure borders are applied to all cells
    },
}));

export function BookingTable() {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch schedules on component mount
    useEffect(() => {
        fetch("/api/schedule?currentWeek", { method: 'GET', cache: 'reload' })
            .then((response) => response.json() as any as Schedule[])
            .then((schedules) => {
                const filteredToday = schedules.filter(s => new Date(s.start).getDate() === new Date().getDate());
                setSchedules(filteredToday);
                setFilteredSchedules(filteredToday);
            })
            .catch((error) => console.error('Error!!!:', error));
    }, []);

    const handleSearch = () => {
        const filtered = schedules.filter(schedule =>
            schedule.customer.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSchedules(filtered);
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch(); 
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', mb: 2, gap: '1rem' }}>
                <TextField
                    placeholder="Tìm kiếm khách hàng"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                >
                    <SearchIcon/>
                </Button>
            </Box>

            <TableContainer
                component={Paper}
                sx={{ 
                    mt: 2, 
                    borderRadius: '0.5rem', 
                    overflowY: 'auto', 
                    maxHeight: 440, 
                }}
            >
                <Table size='small' aria-label="booking table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tên khách hàng</StyledTableCell>
                            <StyledTableCell>Ngày giờ nhận sân</StyledTableCell>
                            <StyledTableCell>Loại sân</StyledTableCell>
                            <StyledTableCell>Xóa</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSchedules.map((schedule, index) => (
                            <StyledTableRow key={index}>
                                <TableCell>{schedule.customer}</TableCell>
                                <TableCell>{new Date(schedule.start).toLocaleString("vi-VN")}</TableCell>
                                <TableCell>{FieldType.find(f => Number(f.value) === schedule.fieldNo)?.label || 'Unknown Field'}</TableCell>
                                <TableCell>
                                    <button onClick={() => {
                                        fetch(`/api/schedule?id=${schedule.id}`, {
                                            method: 'DELETE'
                                        }).then((response) => {
                                            if (response.ok) {
                                                setSchedules(schedules.filter(s => s.id !== schedule.id));
                                                setFilteredSchedules(filteredSchedules.filter(s => s.id !== schedule.id));
                                            } else {
                                                alert('Error!!!: ' + response.statusText);
                                            }
                                        }).catch((err) => alert('Error!!!: ' + err));
                                    }}><DeleteForeverIcon /></button>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export function BookingTableFull() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [rows, setRows] = useState<Schedule[]>([]);

    useEffect(() => {
        fetch("/api/schedule", { method: 'GET', cache: 'reload' })
            .then((response) => response.json())
            .then((schedules) => {
                setRows(schedules);
            })
            .catch((error) => console.error('Error!!!:', error));
    }, []);

    const filteredRows = rows.filter((row) => {
        return (
            row.customer.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <StyledTableCell>Ngày giờ nhận sân</StyledTableCell>
                        <StyledTableCell>Ngày giờ trả sân</StyledTableCell>
                        <StyledTableCell>Loại sân</StyledTableCell>
                        <StyledTableCell>Xóa</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRows.map((row, index) => (
                        <StyledTableRow key={index}>
                            <TableCell>{row.customer}</TableCell>
                            <TableCell>{row.customerPhone}</TableCell>
                            <TableCell>{new Date(row.start).toLocaleString("vi-VN")}</TableCell>
                            <TableCell>{new Date(row.end).toLocaleString("vi-VN")}</TableCell>
                            <TableCell>{FieldType.find(f => Number(f.value) === row.fieldNo)?.label || 'Unknown Field'}</TableCell>
                            <TableCell>
                                <button onClick={() => {
                                    fetch(`/api/schedule?id=${row.id}`, {
                                        method: 'DELETE'
                                    }).then((response) => {
                                        if (response.ok) {
                                            setRows(rows.filter(s => s.id !== row.id));
                                        } else {
                                            alert('Error!!!: ' + response.statusText);
                                        }
                                    }).catch((err) => alert('Error!!!: ' + err));
                                }}><DeleteForeverIcon /></button>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


