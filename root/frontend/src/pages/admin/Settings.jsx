import { Link, Outlet } from "react-router-dom";

function Settings() {
  return (
    <>
      <div className={"flex justify-between items-start gap-12"}>
        <SettingsList />
        <div className={"w-full "}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Settings;

function SettingsList() {
  const settings = [
    { header: "STORE SETTING", text: "Configure your store information" },
    {
      header: "PAYMENT SETTING",
      text: "Configure the available payment methods",
    },
    {
      header: "SHIPPING SETTING",
      text: "Where you ship, shipping methods and delivery fee",
    },
    {
      header: "TAX SETTING",
      text: "Configure tax classes and tax rates",
    },
  ];

  return (
    <ul
      className={"bg-white text-slate-700 w-[30vw] rounded-xl overflow-hidden"}
    >
      {settings.map((setting, i) => (
        <li key={i}>
          <Link to={setting.header.replace(" ", "-").toLowerCase()}>
            <div
              className={
                "p-12 bg-amber-10 border-b-2 border-slate-100 hover:bg-zinc-100 transition duration-[.3s]"
              }
            >
              <p className={"text-2xl tracking-wide mb-4"}>{setting.header}</p>
              <span className={"text-xl tracking-wide"}>{setting.text}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
