export const stockOptions = [
  { value: "", name: "All" },
  { value: "1", name: "In" },
  { value: "0", name: "Out" },
];

export const statusOptions = [
  { value: "", name: "All" },
  { value: 1, name: "Enabled" },
  { value: 0, name: "Disabled" },
];

export const inStartMenuOptions = [
  { value: "", name: "All" },
  { value: 1, name: "Yes" },
  { value: 0, name: "No" },
];

export const provinceOptions = [
  { value: "amanda", name: "Andaman & Nicobar Island" },
  { value: "amanda", name: "Andaman & Nicobar Island" },
  { value: "amanda", name: "Andaman & Nicobar Island" },
];
export const countryOptions = [
  { value: "india", name: "India" },
  { value: "india", name: "India" },
  { value: "india", name: "India" },
];

export const stripePaymentInputs = [
  {
    name: "name",
    label: "Display Name",
    placeholder: "Display Name",
    type: "text",
  },
  {
    name: "publishableKey",
    label: "Publishable Key",
    placeholder: "Publishable Key",
    type: "text",
  },
  {
    name: "secretKey",
    label: "Secret Key",
    placeholder: "Secret Key",
    type: "text",
  },
  {
    name: "webhookSecretKey",
    label: "Web Hook Secret Key",
    placeholder: "Web Hook Secret Key",
    type: "text",
  },
];

export const paypalPaymentInputs = [
  {
    name: "name",
    label: "Display Name",
    placeholder: "Display Name",
    type: "text",
  },
  {
    name: "clientId",
    label: "Client ID",
    placeholder: "Client ID",
    type: "text",
  },
  {
    name: "clientSecret",
    label: "Client Secret",
    placeholder: "Client Secret",
    type: "text",
  },
  // {
  //   label: "Web Hook Secret Key",
  //   placeholder: "Web Hook Secret Key",
  //   type: "text",
  // },
];

export const cashOnDeliveryInputs = [
  {
    name: "name",
    label: "Display Name",
    placeholder: "Display Name",
    type: "text",
  },
];

export const isEmptyObject = (obj) => {
  return JSON.stringify(obj) === "{}";
};

export function removeNullValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) => value !== null && value !== "",
    ),
  );
}
