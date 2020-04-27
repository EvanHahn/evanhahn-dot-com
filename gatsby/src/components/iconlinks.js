import React from "react"

export const IconLinks = ({ children }) => (
  <ul className="IconLinks">{children}</ul>
)

export const IconLink = ({ href, target, icon, children }) => (
  <li className="IconLink">
    <a href={href} target={target} rel="noreferrer noopener">
      {icon}
      <span>{children}</span>
    </a>
  </li>
)
