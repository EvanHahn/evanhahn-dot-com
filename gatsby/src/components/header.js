import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Logo from "./logo"
import { IconLinks, IconLink } from "./iconlinks"
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import ListIcon from "@material-ui/icons/List"
import CodeIcon from "@material-ui/icons/Code"

export default function ContentPageHeader() {
  // TODO: rename this file to ContentPageHeader
  return (
    <header className="ContentPageHeader">
      <a href="/">
        <Logo />
      </a>

      <IconLinks>
        <IconLink href="/about" icon={<AccountCircleIcon />}>
          About
        </IconLink>
        <IconLink href="/contact" icon={<AlternateEmailIcon />}>
          Contact
        </IconLink>
        <IconLink href="/projects" icon={<CodeIcon />}>
          Projects
        </IconLink>
        <IconLink href="/guides" icon={<MenuBookIcon />}>
          Guides
        </IconLink>
        <IconLink href="/blog" icon={<ListIcon />}>
          Blog
        </IconLink>
      </IconLinks>
    </header>
  )
}
