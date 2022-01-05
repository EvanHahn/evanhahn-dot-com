import React from "react";
import { Link } from "gatsby";

export const IconLinks = ({ children }) => (
  <ul className="IconLinks">{children}</ul>
);

export function IconLink({
  useGatsbyLink = false,
  href,
  target,
  icon,
  children,
  rels = [],
}) {
  let Component;
  let props;
  if (useGatsbyLink) {
    Component = Link;
    props = { to: href };
  } else {
    Component = "a";
    props = {
      href,
      target,
      rel: ["noreferrer", "noopener", ...rels].join(" "),
    };
  }

  return (
    <li className="IconLink">
      <Component {...props}>
        {icon}
        <span>{children}</span>
      </Component>
    </li>
  );
}
