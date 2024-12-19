import React, { useState, useEffect } from 'react';
import { getCoupons, createCoupon, updateCoupon, deleteCoupon, applyCoupon } from '../services/CouponService';

const CouponApp = () => {
    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({ code: '', discount: 0 });
    const [applyData, setApplyData] = useState({ code: '', amount: 0 });
    const [applyResult, setApplyResult] = useState('');

    // Fetch all coupons on component mount
    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const data = await getCoupons();
            setCoupons(data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const handleCreateCoupon = async () => {
        try {
            const createdCoupon = await createCoupon(newCoupon);
            setCoupons([...coupons, createdCoupon]);
            setNewCoupon({ code: '', discount: 0 }); // Reset input fields
        } catch (error) {
            console.error('Error creating coupon:', error);
        }
    };

    const handleDeleteCoupon = async (id) => {
        try {
            await deleteCoupon(id);
            setCoupons(coupons.filter(coupon => coupon.id !== id));
        } catch (error) {
            console.error('Error deleting coupon:', error);
        }
    };

    const handleApplyCoupon = async () => {
        try {
            const result = await applyCoupon(applyData.code, applyData.amount);
            setApplyResult(result);
        } catch (error) {
            console.error('Error applying coupon:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Coupon Management</h1>

            {/* Add New Coupon */}
            <div>
                <h2>Create New Coupon</h2>
                <input
                    type="text"
                    placeholder="Coupon Code"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Discount"
                    value={newCoupon.discount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                />
                <button onClick={handleCreateCoupon}>Add Coupon</button>
            </div>

            {/* List of Coupons */}
            <div>
                <h2>Available Coupons</h2>
                <ul>
                    {coupons.map((coupon) => (
                        <li key={coupon.id}>
                            {coupon.code} - {coupon.discount}%
                            <button onClick={() => handleDeleteCoupon(coupon.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Apply Coupon */}
            <div>
                <h2>Apply Coupon</h2>
                <input
                    type="text"
                    placeholder="Coupon Code"
                    value={applyData.code}
                    onChange={(e) => setApplyData({ ...applyData, code: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Order Amount"
                    value={applyData.amount}
                    onChange={(e) => setApplyData({ ...applyData, amount: e.target.value })}
                />
                <button onClick={handleApplyCoupon}>Apply</button>
                {applyResult && <p>{applyResult}</p>}
            </div>
        </div>
    );
};

export default CouponApp;
