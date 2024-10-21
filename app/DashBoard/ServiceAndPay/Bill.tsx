import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


interface Product {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

const BillForm: React.FC = () => {

  return (
    <Box sx={{ padding: '1rem', backgroundColor: '#f5f5f5'}}>

     
      <Table sx={{backgroundColor: 'white', borderRadius: '0.5rem' }}>
        <TableHead>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell align="right">Số lượng</TableCell>
            <TableCell align="right">Giá</TableCell>
            <TableCell align="right">Thành tiền</TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Box sx={{ marginTop: '1rem', textAlign: 'right' }}>
        <Typography variant="h6">Tổng cộng: VND</Typography>
      </Box>
    </Box>
  );
};

export default BillForm;
