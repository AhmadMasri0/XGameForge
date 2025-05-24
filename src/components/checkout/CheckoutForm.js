import {
    Box, Button, Divider, FormControl, FormControlLabel, FormLabel,
    Grid, Paper, Radio, RadioGroup, TextField, Typography
} from "@mui/material";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const CheckoutForm = ({ }) => {

    const { clearCart } = useCart();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState({});
    const [selectedMethod, setSelectedMethod] = useState('');
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!fullName || !email) {
            setError('Please fill out all required fields.');
            return;
        }

        if (selectedMethod === 'payOnArrival') {
            console.log('555')
            clearCart();
            navigate('/thank-you');
            return;
        }

        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);

        try {
            const { error: stripeError } = await stripe.confirmPayment(
                {
                    elements,
                    confirmParams: { return_url: window.location.origin + '/thank-you' }
                },
                { redirect: 'if_required' }
            );

            if (stripeError) {
                setError(stripeError.message || 'Payment failed.');
                setIsLoading(false);
            } else {
                console.log('test')
                clearCart();
                navigate('/thank-you');
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };
    return <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Shipping Information</Typography>
        {/* {isLoading && <Button>Loadding...</Button>} */}
        <form onSubmit={handleSubmit} noValidate>
            <TextField
                fullWidth required label="Full Name"
                margin="normal" value={fullName}
                onChange={e => { setFullName(e.target.value); setErrors(prev => ({ ...prev, fullName: '' })); }}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName}
            />
            <TextField
                fullWidth required label="Email"
                type="email" margin="normal" value={email}
                onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
                error={Boolean(errors.email)}
                helperText={errors.email}
            />
            <TextField
                fullWidth required label="Phone Number"
                type="tel" margin="normal" value={phone}
                onChange={e => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: '' })); }}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
            />
            <TextField
                fullWidth required label="Street Address"
                margin="normal" value={address}
                onChange={e => { setAddress(e.target.value); setErrors(prev => ({ ...prev, address: '' })); }}
                error={Boolean(errors.address)}
                helperText={errors.address}
            />
            <TextField
                fullWidth required label="City"
                margin="normal" value={city}
                onChange={e => { setCity(e.target.value); setErrors(prev => ({ ...prev, city: '' })); }}
                error={Boolean(errors.city)}
                helperText={errors.city}
            />
            <TextField
                fullWidth required label="ZIP / Postal Code"
                margin="normal" value={zip}
                onChange={e => { setZip(e.target.value); setErrors(prev => ({ ...prev, zip: '' })); }}
                error={Boolean(errors.zip)}
                helperText={errors.zip}
            />
            <TextField
                fullWidth label="Delivery Notes (optional)"
                margin="normal" value={notes}
                onChange={e => setNotes(e.target.value)}
                multiline minRows={2}
            />
            <Divider sx={{ my: 2 }} />

            <FormControl component="fieldset" margin="normal" >
                <FormLabel component="legend" sx={{color: 'black'}}>Payment Method</FormLabel>
                {!selectedMethod && (
                    <Typography variant="caption" color="error">
                        Please select a payment method
                    </Typography>
                )}
                <RadioGroup
                    value={selectedMethod}
                    onChange={e => setSelectedMethod(e.target.value)}
                >
                    <FormControlLabel value="stripe" control={<Radio />} label="Credit/Debit Card" />
                    <FormControlLabel value="paypal" control={<Radio />} label="PayPal (coming soon)" disabled />
                    <FormControlLabel value="cod" control={<Radio />} label="Pay When Arrives" />
                </RadioGroup>


            </FormControl>

        </form>
        <>
            {selectedMethod === "stripe" && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Card Details</Typography>
                    <Box sx={{
                        border: "1px solid #ccc",
                        borderRadius: 2, p: 2, mt: 1
                    }}>
                        <PaymentElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        "::placeholder": {
                                            color: "#aab7c4",
                                        },
                                    },
                                    invalid: {
                                        color: "#9e2146",
                                    },
                                },
                                // layout: {
                                //     type: 'accordion',
                                //     defaultCollapsed: false,
                                //     radios: true,
                                //     spacedAccordionItems: false
                                // }
                            }}
                        />

                    </Box>

                </Box>
            )}
            <Button
                type="submit" variant="contained" color="primary"
                sx={{ mt: 3 }}
                disabled={
                    !fullName || !email || !phone || !address || !city || !zip || !selectedMethod
                }
            >
                Place Order
            </Button>
        </>
    </Paper>

}


export default CheckoutForm;