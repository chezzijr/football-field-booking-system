import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Dữ liệu sản phẩm mẫu
interface Product {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

const BillForm: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  // Thêm sản phẩm vào hóa đơn
  const addProduct = () => {
    if (!productName || price <= 0) return;
    const total = quantity * price;
    const newProduct = { name: productName, quantity, price, total };
    setProducts([...products, newProduct]);
    // Reset form sau khi thêm sản phẩm
    setProductName('');
    setQuantity(1);
    setPrice(0);
  };

  // Tính tổng tiền hóa đơn
  const calculateTotal = () => {
    return products.reduce((sum, product) => sum + product.total, 0);
  };

  return (
    <Box sx={{ padding: '1rem', backgroundColor: '#f5f5f5'}}>

      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tên sản phẩm"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="number"
            label="Số lượng"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            InputProps={{
              inputProps: { min: 1 },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="number"
            label="Giá"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            InputProps={{
              inputProps: { min: 0 },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addProduct} startIcon={<AddIcon />}>
            Thêm sản phẩm
          </Button>
        </Grid>
      </Grid> */}

      {/* Bảng hiển thị danh sách sản phẩm */}
      <Table sx={{backgroundColor: 'white', borderRadius: '0.5rem' }}>
        <TableHead>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell align="right">Số lượng</TableCell>
            <TableCell align="right">Giá</TableCell>
            <TableCell align="right">Thành tiền</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.name}</TableCell>
              <TableCell align="right">{product.quantity}</TableCell>
              <TableCell align="right">{product.price.toLocaleString()} VND</TableCell>
              <TableCell align="right">{product.total.toLocaleString()} VND</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>

      <Box sx={{ marginTop: '1rem', textAlign: 'right' }}>
        <Typography variant="h6">Tổng cộng: {calculateTotal().toLocaleString()} VND</Typography>
      </Box>
    </Box>
  );
};

export default BillForm;
