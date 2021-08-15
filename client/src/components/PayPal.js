import React, {useEffect, useRef} from 'react';

const PayPal = (props) => {

    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "desc",
                            amount: {
                                currency_code: "EUR",
                                value: props.price
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    },[])

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
};

export default PayPal;