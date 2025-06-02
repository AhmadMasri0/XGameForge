import {
    Alert, Box, Button, Divider, FormControl, FormControlLabel,
    FormLabel, Paper, Radio, RadioGroup, TextField, Typography
} from "@mui/material";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import api from "../../api/axios";

const CheckoutForm = () => {
    const { cartItems } = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        notes: ''
    });

    const [selectedMethod, setSelectedMethod] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 5.0 : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + tax + shipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const validateFields = () => {
        const required = ['fullName', 'email', 'phone', 'address', 'city', 'zip'];
        for (let field of required) {
            if (!form[field]) return `Please enter your ${field}.`;
        }
        if (!selectedMethod) return 'Please select a payment method.';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const validationError = validateFields();
        if (validationError) return setError(validationError);

        setIsLoading(true);

        try {
            if (selectedMethod === 'cod') {
                await api.post("/api/orders", {
                    cartItems,
                    status: 'unpaid',
                    paymentMethod: "Cash",
                    totalAmount: total,
                    orderDetail: { ...form },
                });
                navigate("/thank-you");
                return;
            }

            const result = await stripe.confirmPayment({
                elements,
                redirect: 'if_required'
            });

            if (result.error) {
                setError(result.error.message);
                return;
            }

            if (result.paymentIntent.status === "succeeded") {
                await api.post("/api/orders", {
                    cartItems,
                    status: 'paid',
                    paymentIntentId: result.paymentIntent.id,
                    paymentMethod: "stripe",
                    totalAmount: total,
                    orderDetail: { ...form },
                });
                navigate("/thank-you");
            }
        } catch (err) {
            console.error(err);
            setError("Payment failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Shipping Information</Typography>
            {isLoading && <Typography variant="body2">Processing payment...</Typography>}
            <form onSubmit={handleSubmit} noValidate>
                {['fullName', 'email', 'phone', 'address', 'city', 'zip'].map(field => (
                    <TextField
                        key={field}
                        name={field}
                        label={field.replace(/^\w/, c => c.toUpperCase()).replace(/([A-Z])/g, ' $1')}
                        fullWidth
                        margin="normal"
                        required
                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                        value={form[field]}
                        onChange={handleInputChange}
                    />
                ))}

                <TextField
                    name="notes"
                    label="Delivery Notes (optional)"
                    fullWidth
                    margin="normal"
                    multiline
                    minRows={2}
                    value={form.notes}
                    onChange={handleInputChange}
                />

                <Divider sx={{ my: 2 }} />

                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Payment Method</FormLabel>
                    <RadioGroup
                        value={selectedMethod}
                        onChange={e => setSelectedMethod(e.target.value)}
                    >
                        <FormControlLabel value="stripe" control={<Radio />} label="Credit/Debit Card" />
                        <FormControlLabel value="paypal" control={<Radio />} label="PayPal (coming soon)" disabled />
                        <FormControlLabel value="cod" control={<Radio />} label="Pay When Arrives" />
                    </RadioGroup>
                </FormControl>

                {selectedMethod === "stripe" && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">Card Details</Typography>
                        <Box sx={{
                            border: "1px solid #ccc",
                            borderRadius: 2,
                            p: 2,
                            mt: 1
                        }}>
                            <PaymentElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: "#424770",
                                            "::placeholder": { color: "#aab7c4" },
                                        },
                                        invalid: { color: "#9e2146" },
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                    disabled={isLoading}
                >
                    Place Order
                </Button>
            </form>
        </Paper>
    );
};

export default CheckoutForm;
