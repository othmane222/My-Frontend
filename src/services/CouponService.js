import axios from 'axios';

const API_BASE_URL = 'http://localhost:8083/api/coupons';

export const getCoupons = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const createCoupon = async (coupon) => {
    const response = await axios.post(API_BASE_URL, coupon);
    return response.data;
};

export const updateCoupon = async (id, coupon) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, coupon);
    return response.data;
};

export const deleteCoupon = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

export const applyCoupon = async (code, amount) => {
    const response = await axios.post(`${API_BASE_URL}/apply`, null, {
        params: { code, amount },
    });
    return response.data;
};
