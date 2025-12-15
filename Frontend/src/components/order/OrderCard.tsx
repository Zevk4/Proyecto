import React, { useState } from 'react';
import { Order } from '../../types'; // Assuming types are accessible
import '../../styles/OrderHistory.css'; // Link to existing styles

interface OrderCardProps {
    order: Order;
    formatDate: (dateString: string) => string;
    formatPrice: (price: number) => string;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, formatDate, formatPrice }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="order-card">
            <button className="order-summary-button" onClick={() => setIsExpanded(!isExpanded)} aria-expanded={isExpanded}>
                <div className="d-flex justify-content-between w-100">
                    <span><strong>Pedido #{order.id}</strong> - {formatDate(order.createdAt)}</span>
                    <span className="text-end"><strong>Total: {formatPrice(order.total)}</strong></span>
                </div>
                <span className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>&#9660;</span> {/* Chevron icon */}
            </button>
            <div className={`order-details-content ${isExpanded ? 'is-expanded' : ''}`}>
                <div className="order-details-grid">
                    <div>
                        <h5>Detalles del Envío</h5>
                        <p><strong>Cliente:</strong> {order.customerName} {order.customerLastName}</p>
                        <p><strong>Dirección:</strong> {order.shippingAddress}, {order.shippingCommune}, {order.shippingRegion}</p>
                        {order.shippingApartment && <p><strong>Departamento:</strong> {order.shippingApartment}</p>}
                        {order.shippingNotes && <p><strong>Notas:</strong> {order.shippingNotes}</p>}
                    </div>
                    <div>
                        <h5>Resumen de Compra</h5>
                        <p><strong>Subtotal:</strong> {formatPrice(order.subtotal)}</p>
                        <p><strong>Descuento:</strong> -{formatPrice(order.discount)}</p>
                        <p><strong>Total:</strong> {formatPrice(order.total)}</p>
                    </div>
                </div>
                <hr />
                <h5>Artículos</h5>
                <div className="order-items-cards">
                    {order.items.map(item => (
                        <div className="order-item-card" key={item.productCodigo}>
                            <img src={item.productImagen} alt={item.productName} />
                            <div className="item-details">
                                <h5>{item.productName}</h5>
                                <p>Cantidad: {item.quantity}</p>
                                <p>Precio: {formatPrice(item.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
