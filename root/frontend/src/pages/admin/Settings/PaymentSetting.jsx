import Field from "../../../ui/Field.jsx";
import Input from "../../../ui/inputs/Input.jsx";
import {
  cashOnDeliveryInputs,
  paypalPaymentInputs,
  stripePaymentInputs,
} from "../../../utils/helpers.js";
import RadioDoubleInputs from "../../../ui/inputs/RadioDoubleInputs.jsx";
import Form from "../../../ui/Form.jsx";
import Button from "../../../ui/buttons/Button.jsx";
import { useForm } from "react-hook-form";

function PaymentSetting() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <Form className={"space-y-6"} onSubmit={handleSubmit(onSubmit)}>
        <Field legend={"Stripe Payment"} displaySwitch={"displaySwitch"}>
          {stripePaymentInputs.map((paymentInput, i) => (
            <Input
              label={paymentInput.label}
              type={paymentInput.type}
              placeholder={paymentInput.placeholder}
              key={i}
              name={paymentInput.name}
              register={register}
            />
          ))}
        </Field>

        <Field legend={"Paypal Payment"} displaySwitch={"displaySwitch"}>
          {paypalPaymentInputs.map((paymentInput, i) => (
            <Input
              label={paymentInput.label}
              type={paymentInput.type}
              placeholder={paymentInput.placeholder}
              key={i}
              register={register}
              name={paymentInput.name}
            />
          ))}
          <RadioDoubleInputs
            label={"Environment"}
            name={"environment"}
            titles={["Sandbox", "Live"]}
            values={["sandbox", "live"]}
            register={register}
          />
        </Field>

        <Field
          legend={"Cash On Delivery Payment"}
          displaySwitch={"displaySwitch"}
        >
          {cashOnDeliveryInputs.map((paymentInput, i) => (
            <Input
              label={paymentInput.label}
              type={paymentInput.type}
              placeholder={paymentInput.placeholder}
              key={i}
              register={register}
              name={paymentInput.name}
            />
          ))}
        </Field>
        <Button className="filled w-full">Save</Button>
      </Form>
    </>
  );
}

export default PaymentSetting;
