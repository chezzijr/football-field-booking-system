import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
import { Payment } from '@/types/payment';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


export function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/payment", { method: 'GET', cache: 'reload' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Không thể hiển thị thông tin giao dịch');
        }
        return response.json();
      })
      .then((data: Payment[]) => {
        setPayments(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  return (
    <Box sx={{ padding: '1rem', backgroundColor: '#f5f5f5', mb:4 }}>
      <div style={{ padding: '20px' }}>                                                           
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div>
          {payments.map((payment) => (
            <div key={payment.id} style={styles.billContainer}>
              <div style={styles.billHeader}>
                <h4 style={{ margin: 0 }}>ID#{payment.id}</h4>
                <p style={styles.billDate}>{new Date(payment.date).toLocaleDateString('vi')}</p>
              </div>

              <div style={styles.billBody}>
                <p><strong>Mô tả:</strong> {payment.description}</p>
                <p><strong>Tổng tiền:</strong> {payment.amount} VNĐ</p>
              </div>

              <div style={styles.billFooter}>
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Cảm ơn quý khách đã sử dụng dịch vụ!</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  billContainer: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      backgroundColor: '#f9f9f9',
  },
  billHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid #eee',
      paddingBottom: '10px',
      marginBottom: '10px',
  },
  billDate: {
      fontSize: '0.9rem',
      color: '#888',
  },
  billBody: {
      fontSize: '1rem',
      lineHeight: '1.6',
  },
  billFooter: {
      borderTop: '1px solid #eee',
      paddingTop: '10px',
      marginTop: '10px',
      textAlign: 'center', 
  },
};
