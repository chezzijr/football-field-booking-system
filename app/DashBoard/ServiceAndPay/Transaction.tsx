import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
import { Payment } from '@/types/payment';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';

export function PaymentHistory({ payments }: { payments: Payment[] }) {
    const endRef = useRef<HTMLDivElement>(null);

    function scrollToBottom() {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        scrollToBottom();
    }, [payments]);

    return (
        <Box sx={{ padding: '1rem', backgroundColor: '#f5f5f5', mb: 4 }}>
            <div style={{ padding: '20px' }}>
                {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}

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
                    <div id="dummy-end-of-list" ref={endRef}></div>
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
export function TransactionChart() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/payment", { method: 'GET', cache: 'reload' })
            .then((response) => {
                return response.json();
            })
            .then((data: Payment[]) => {
                setPayments(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);
    const chartData = payments.map(payment => ({
        x: new Date(payment.date).getTime(),
        y: payment.amount,
    }));
    return (
        <LineChart
            xAxis={[{
                data: chartData.map(d => d.x),
                scaleType: 'time',
                label: 'Ngày',
                valueFormatter: (value: number) => new Date(value).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                }),
            }]}
            yAxis={[
                {
                    tickSize: 3,
                }
            ]}
            series={[
                {
                    data: chartData.map(d => d.y),
                    label: 'Doanh thu',
                },
            ]}
            width={500}
            height={300}
        />
    );
}
