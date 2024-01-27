import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    Elements,
    ElementsConsumer,
} from "@stripe/react-stripe-js";
import React from "react";
import {
    Button,
    Card,
    CardBody,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Spinner,
} from "reactstrap";
import { TEST_CLIENT_KEY } from "../constants/index";
import { loadStripe } from "@stripe/stripe-js";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkout, checkoutAction } from "../store/actions/checkoutAction";
let stripePromise = loadStripe(TEST_CLIENT_KEY);

const StripeCheckout = (props) => {
    //console.log(props.docID, props.detail, "dataa");
    const history = useHistory();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.checkout);
    const [paymentLoader, setPaymentLoader] = useState(false);
    console.log(loading,'loading')
    const [stripeError, setStripeError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState("");
    const handleStripError = (message) => {
        setStripeError(true);
        setErrorMessage(message);
        setTimeout(() => {
            setStripeError(false);
            setErrorMessage("");
        }, 3000);
    };
    return (
        <div>
            <Card className="shadow border-0   p-2 mt-3 ">
                <CardBody className="px-lg-5 pt-lg-2 pb-lg-2">
                    <div className=" d-flex flex-column justify-content-center align-items-center">
                        {/* <Button
                            size="lg"
                            className="btn btn-block my-3"
                            color="dark"
                        >
                            Pay
                        </Button>
                        or */}
                        <h5 className="font-weight-bold">Pay with Card</h5>
                    </div>

                    <Elements stripe={stripePromise}>
                        <ElementsConsumer>
                            {({ elements, stripe }) => (
                                <Form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        setPaymentLoader(true)
                                        const cardElement =
                                             elements.getElement(
                                                CardNumberElement
                                            );
                                        const cardElement2 =
                                             elements.getElement(
                                                CardExpiryElement
                                            );
                                        const cardElement3 =
                                             elements.getElement(
                                                CardCvcElement
                                            );

                                        let { error, paymentMethod } =
                                            await stripe.createPaymentMethod({
                                                type: "card",
                                                card: cardElement,
                                                card: cardElement2,
                                                card: cardElement3,
                                            });
                                        if (error) {
                                            handleStripError(error.message);
                                            setPaymentLoader(false)
                                        } else {
                                            const result =
                                                await stripe.createToken(
                                                    cardElement
                                                );

                                            if (result.error) {
                                                handleStripError(error.message);
                                                setPaymentLoader(false)
                                            } else {
                                                let body = {
                                                    token: result.token.id,
                                                    email: props?.detail?.email,
                                                    name: name,
                                                    amount: props?.detail
                                                        ?.price,
                                                    user_id:props?.docID
                                                };
                                                dispatch(
                                                    checkoutAction(
                                                        body,
                                                        () => {
                                                            history.push(
                                                                `/cv/${props?.docID}`
                                                            );
                                                            // Elements.getElement(
                                                            //     CardNumberElement
                                                            // ).clear();
                                                            // Elements.getElement(
                                                            //     CardExpiryElement
                                                            // ).clear();
                                                            // Elements.getElement(
                                                            //     CardCvcElement
                                                            // ).clear();
                                                            setName("");
                                                            setPaymentLoader(false)
                                                            localStorage.clear()
                                                        }
                                                    )
                                                );
                                                
                                                //console.log(body, "body");
                                            }
                                        }
                                    }}
                                >
                                    <>
                                        <FormGroup>
                                            <Label className="form_label">
                                                Card number
                                            </Label>
                                            <div
                                                className="form-control mt-2 d-flex shadow-sm"
                                                style={{
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <i className="fa fa-credit-card"></i>
                                                <div
                                                    style={{
                                                        flexBasis: "90%",
                                                    }}
                                                >
                                                    <CardNumberElement
                                                        required
                                                        options={{
                                                            placeholder:
                                                                "4242 4242 4242 4242",
                                                            style: {
                                                                base: {
                                                                    // backgroundColor: "#232733",
                                                                    fontSize:
                                                                        "16px",
                                                                },
                                                                invalid: {
                                                                    color: "#9e2146",
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <FormGroup>
                                                    <Label className="form_label">
                                                        Expiry Date
                                                    </Label>
                                                    <div
                                                        className="form-control mt-2 d-flex shadow-sm"
                                                        style={{
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <i className="fa fa-calendar"></i>
                                                        <div
                                                            style={{
                                                                flexBasis:
                                                                    "90%",
                                                            }}
                                                        >
                                                            <CardExpiryElement
                                                                required
                                                                options={{
                                                                    placeholder:
                                                                        "MM/YY",
                                                                    style: {
                                                                        base: {
                                                                            fontSize:
                                                                                "16px",
                                                                        },
                                                                        invalid:
                                                                            {
                                                                                color: "#9e2146",
                                                                            },
                                                                    },
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                            <div className="col-md-6">
                                                <FormGroup>
                                                    <Label className="form_label">
                                                        CVC/CVV
                                                    </Label>
                                                    <div
                                                        className="form-control mt-2 d-flex shadow-sm"
                                                        style={{
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                flexBasis:
                                                                    "80%",
                                                            }}
                                                        >
                                                            <CardCvcElement
                                                                required
                                                                options={{
                                                                    placeholder:
                                                                        "...",
                                                                    style: {
                                                                        base: {
                                                                            fontSize:
                                                                                "16px",
                                                                        },
                                                                        invalid:
                                                                            {
                                                                                color: "#9e2146",
                                                                            },
                                                                    },
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                            <div className="col-md-12">
                                                <FormGroup>
                                                    <Label className="form_label">
                                                        Name of Card
                                                    </Label>
                                                    <Input
                                                        required
                                                        type="text"
                                                        className="shadow-sm"
                                                        value={name}
                                                        onChange={(e) => {
                                                            setName(
                                                                e.target.value
                                                            );
                                                        }}
                                                    ></Input>
                                                </FormGroup>
                                            </div>
                                            {/* <div className="col-md-12 pb-0 mb-0">
                                                <FormGroup>
                                                    <Label className="form_label">
                                                        Country or region
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="US"
                                                        className="shadow-sm"
                                                    ></Input>
                                                </FormGroup>
                                            </div>
                                            <div className="col-md-12 pt-0 mt-0">
                                                <FormGroup>
                                                    <Input
                                                        type="text"
                                                        placeholder="ZIP"
                                                        className="shadow-sm"
                                                    ></Input>
                                                </FormGroup>
                                            </div> */}
                                        </div>
                                    </>
                                    {stripeError && (
                                        <p className="mb-0 my-1 text-danger">
                                            {errorMessage}
                                        </p>
                                    )}
                                    <Button
                                        size="lg"
                                        className="btn btn-block"
                                        color="primary"
                                        type="submit"
                                        disabled={paymentLoader}
                                    >
                                        {paymentLoader ? (
                                            <Spinner size="sm" />
                                        ) : (
                                            "Pay"
                                        )}
                                    </Button>
                                </Form>
                            )}
                        </ElementsConsumer>
                    </Elements>
                </CardBody>
            </Card>
        </div>
    );
};

export default StripeCheckout;
