import React from 'react';
import { useCart } from '../context/CartContext';
import { useForm } from '../hooks/useForm';
import { apiService } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import '../styles/CheckoutPage.css';

const CheckoutPage: React.FC = () => {
    const { cartItems, getTotal, getDiscountedTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const { values, errors, handleChange, validate } = useForm({
        customerName: '',
        customerLastName: '',
        customerEmail: '',
        shippingAddress: '',
        shippingApartment: '',
        shippingRegion: '',
        shippingCommune: '',
        shippingNotes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            console.log("Validation failed", errors);
            return;
        }

        try {
            await apiService.post('/orders/create', values);
            alert('¡Compra realizada con éxito!');
            clearCart();
            navigate('/');
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Hubo un error al procesar tu compra. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="container my-5 checkout-container">
            <form id="checkout-form" onSubmit={handleSubmit}>
                <div className="row g-5">
                    <div className="col-lg-7">
                        <div className="checkout-form-container">
                            <h4>Información de Contacto y Envío</h4>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="customerName" className="form-label" style={{ color: 'aliceblue' }}>Nombre<small className="text-danger">*</small></label>
                                    <input type="text" className={`form-control ${errors.customerName ? 'is-invalid' : ''}`} id="customerName" name="customerName" value={values.customerName} onChange={handleChange} required />
                                    {errors.customerName && <div className="invalid-feedback">{errors.customerName}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="customerLastName" className="form-label" style={{ color: 'aliceblue' }}>Apellidos<small className="text-danger">*</small></label>
                                    <input type="text" className={`form-control ${errors.customerLastName ? 'is-invalid' : ''}`} id="customerLastName" name="customerLastName" value={values.customerLastName} onChange={handleChange} required />
                                    {errors.customerLastName && <div className="invalid-feedback">{errors.customerLastName}</div>}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="customerEmail" className="form-label" style={{ color: 'aliceblue' }}>Correo<small className="text-danger">*</small></label>
                                <input type="email" className={`form-control ${errors.customerEmail ? 'is-invalid' : ''}`} id="customerEmail" name="customerEmail" value={values.customerEmail} onChange={handleChange} required />
                                {errors.customerEmail && <div className="invalid-feedback">{errors.customerEmail}</div>}
                            </div>

                            <h4 className="mt-4">Dirección de entrega</h4>
                            
                            <div className="mb-3">
                                <label htmlFor="shippingAddress" className="form-label" style={{ color: 'aliceblue' }}>Calle<small className="text-danger">*</small></label>
                                <input type="text" className={`form-control ${errors.shippingAddress ? 'is-invalid' : ''}`} id="shippingAddress" name="shippingAddress" value={values.shippingAddress} onChange={handleChange} required />
                                {errors.shippingAddress && <div className="invalid-feedback">{errors.shippingAddress}</div>}
                            </div>
                             <div className="mb-3">
                                <label htmlFor="shippingApartment" className="form-label" style={{ color: 'aliceblue' }}>Departamento (opcional)</label>
                                <input type="text" className="form-control" id="shippingApartment" name="shippingApartment" value={values.shippingApartment} onChange={handleChange} />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="shippingRegion" className="form-label" style={{ color: 'aliceblue' }}>Región<small className="text-danger">*</small></label>
                                    <input type="text" className={`form-control ${errors.shippingRegion ? 'is-invalid' : ''}`} id="shippingRegion" name="shippingRegion" value={values.shippingRegion} onChange={handleChange} required />
                                    {errors.shippingRegion && <div className="invalid-feedback">{errors.shippingRegion}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="shippingCommune" className="form-label" style={{ color: 'aliceblue' }}>Comuna<small className="text-danger">*</small></label>
                                    <input type="text" className={`form-control ${errors.shippingCommune ? 'is-invalid' : ''}`} id="shippingCommune" name="shippingCommune" value={values.shippingCommune} onChange={handleChange} required />
                                     {errors.shippingCommune && <div className="invalid-feedback">{errors.shippingCommune}</div>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="shippingNotes" className="form-label" style={{ color: 'aliceblue' }}>Indicaciones para la entrega (opcional)</label>
                                <textarea className="form-control" name="shippingNotes" id="shippingNotes" rows={3} value={values.shippingNotes} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="checkout-summary-container">
                            <h4>Resumen del carrito</h4>
                            {cartItems.length === 0 ? (
                                <p>No hay productos en tu carrito.</p>
                            ) : (
                                <>
                                    <ul className="list-group list-group-flush">
                                        {cartItems.map(item => (
                                            <li key={item.product.codigo} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="my-0">{item.product.nombre}</h6>
                                                    <small className="text-muted">Cantidad: {item.quantity}</small>
                                                </div>
                                                <span className="text-muted">${(item.product.precio * item.quantity).toLocaleString()}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <hr />

                                    <div className="d-flex justify-content-between summary-item">
                                        <span>Subtotal</span>
                                        <strong>${getTotal().toLocaleString()}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between summary-item">
                                        <span>Descuento</span>
                                        <strong>-${(getTotal() - getDiscountedTotal()).toLocaleString()}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2 total-section">
                                        <h4>Total</h4>
                                        <h4><strong>${getDiscountedTotal().toLocaleString()}</strong></h4>
                                    </div>
                                </>
                            )}

                            <button type="submit" form="checkout-form" className="btn pay-button btn-lg w-100 mt-3" disabled={cartItems.length === 0}>
                                Pagar ahora
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
