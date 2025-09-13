import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Chip
} from '@mui/material';
import adminService from '../../services/adminService';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchPaymentHistory = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            
            if (!token || !userData) {
                navigate('/login');
                return;
            }

            const parsedUser = JSON.parse(userData);
            if (parsedUser.role !== 'admin') {
                navigate('/dashboard');
                return;
            }
            
            setUser(parsedUser);
            
            const response = await adminService.getPaymentHistory();
            if (response.success) {
                setPayments(response.payments);
            }
        } catch (error) {
            console.error('Error fetching payment history:', error);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchPaymentHistory();
    }, [fetchPaymentHistory]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'success';
            case 'failed': return 'error';
            case 'pending': return 'warning';
            case 'refunded': return 'info';
            default: return 'default';
        }
    };

    if (loading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
                    Payment History
                </Typography>
                
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'grey.50' }}>
                                <TableCell sx={{ fontWeight: 600 }}>Invoice #</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Payment Method</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Payment Type</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment._id} hover>
                                    <TableCell>{payment.invoiceNumber}</TableCell>
                                    <TableCell>
                                        {payment.userId?.firstName && payment.userId?.lastName 
                                            ? `${payment.userId.firstName} ${payment.userId.lastName}`
                                            : 'Unknown User'
                                        }
                                    </TableCell>
                                    <TableCell>{payment.userId?.email || 'N/A'}</TableCell>
                                    <TableCell>${payment.amount?.toFixed(2) || '0.00'}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={payment.paymentMethod || 'N/A'} 
                                            size="small" 
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={payment.paymentType || 'N/A'} 
                                            size="small" 
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>{payment.description || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={payment.paymentStatus || 'N/A'} 
                                            color={getStatusColor(payment.paymentStatus)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                {payments.length === 0 && (
                    <Box textAlign="center" py={4}>
                        <Typography variant="h6" color="text.secondary">
                            No payment history found
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default PaymentHistory;
