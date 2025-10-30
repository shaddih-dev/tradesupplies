import React from 'react';
import './SuccessModal.css';

/**
 * Beautiful Success Modal - Shown after adding to cart
 * Professional design with animation
 */

const SuccessModal = ({ isOpen, onClose, orderSummary, onViewCart }) => {
    if (!isOpen) return null;
    
    return (
        <div className="success-modal-overlay" onClick={onClose}>
            <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Success Animation */}
                <div className="success-animation">
                    <div className="success-checkmark">
                        <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                        </div>
                    </div>
                </div>
                
                {/* Success Message */}
                <h2 className="success-title">Added to Cart Successfully!</h2>
                <p className="success-subtitle">
                    Your custom sign panel configuration has been saved
                </p>
                
                {/* Order Summary */}
                {orderSummary && (
                    <div className="order-summary-card">
                        <h3>Order Summary</h3>
                        <div className="summary-grid">
                            <div className="summary-item">
                                <span className="label">Panel Size:</span>
                                <span className="value">{orderSummary.size}</span>
                            </div>
                            <div className="summary-item">
                                <span className="label">Material:</span>
                                <span className="value">{orderSummary.material}</span>
                            </div>
                            <div className="summary-item">
                                <span className="label">Total Price:</span>
                                <span className="value price">£{orderSummary.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Action Buttons */}
                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onClose}>
                        Continue Shopping
                    </button>
                    <button className="btn-primary" onClick={onViewCart}>
                        View Cart →
                    </button>
                </div>
                
                {/* Close Button */}
                <button className="modal-close-btn" onClick={onClose}>
                    ×
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
