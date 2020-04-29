import React from "react";
import { Link } from "gatsby";
import Logo from "./logo";
import { IconLinks, IconLink } from "./iconlinks";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ListIcon from "@material-ui/icons/List";
import CodeIcon from "@material-ui/icons/Code";

export default function ContentPageHeader() {
  // TODO: rename this file to ContentPageHeader
  return (
    <header className="ContentPageHeader">
      <Link to="/">
        <Logo />
      </Link>

      <IconLinks>
        <IconLink useGatsbyLink href="/about" icon={<AccountCircleIcon />}>
          About
        </IconLink>
        <IconLink useGatsbyLink href="/contact" icon={<AlternateEmailIcon />}>
          Contact
        </IconLink>
        <IconLink useGatsbyLink href="/projects" icon={<CodeIcon />}>
          Projects
        </IconLink>
        <IconLink useGatsbyLink href="/guides" icon={<MenuBookIcon />}>
          Guides
        </IconLink>
        <IconLink useGatsbyLink href="/blog" icon={<ListIcon />}>
          Blog
        </IconLink>
      </IconLinks>
    </header>
  );
}
