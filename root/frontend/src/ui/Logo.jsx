// noinspection HtmlUnknownTarget

import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

function Logo({ className }) {
  return (
    <div className={twMerge("text-4xl ", className)}>
      <Link to={"/"}>LOGO</Link>
    </div>
  );
}

export default Logo;

Logo.propTypes = {
  className: PropTypes.string,
};
