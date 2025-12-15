import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { Order } from '../types';
import { useAuth } from '../hooks/useAuth';
import '../styles/OrderHistory.css';

import OrderCard from '../components/order/OrderCard'; 

const OrderHistoryPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                setError('Debes iniciar sesión para ver tu historial de pedidos.');
                setLoading(false);
                return;
            }

            try {
                const userOrders = await orderService.getUserOrders();
                setOrders(userOrders);
            } catch (err) {
                setError('Error al cargar el historial de pedidos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
        }).format(price);

    if (loading) {
        return <p>Cargando historial de pedidos...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="container my-5 order-history-container">
            <h1 className="mb-4">Mi Historial de Pedidos</h1>
            {orders.length === 0 ? (
                <div className="empty-history">
                    <p>Aún no has realizado ningún pedido.</p>
                    <Link to="/products" className="btn btn-primary">Ver productos</Link>
                </div>
            ) : (
                <div className="order-list">
                    {orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            formatDate={formatDate}
                            formatPrice={formatPrice}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistoryPage;
