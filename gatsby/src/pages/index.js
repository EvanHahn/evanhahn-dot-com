import React from "react"
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import GithubIcon from "@material-ui/icons/GitHub"
import TwitterIcon from "@material-ui/icons/Twitter"
import KeybaseIcon from "@material-ui/icons/VpnKey"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import ListIcon from "@material-ui/icons/List"
import CodeIcon from "@material-ui/icons/Code"
import SEO from "../components/seo"
import Logo from "../components/logo"
import MastodonIcon from "../components/MastodonIcon"
import "../components/index.css"

const IconLinks = ({ children }) => <ul className="IconLinks">{children}</ul>

const IconLink = ({ href, target, icon, children }) => {
  return (
    <li className="IconLink">
      <a href={href} target={target} rel="noreferrer noopener">
        {icon}
        <span>{children}</span>
      </a>
    </li>
  )
}

const IndexPage = () => (
  <div className="IndexPage">
    <SEO title="Evan Hahn" />

    <header>
      <Logo />
      {/* TODO: use the site description */}
      <h1>I'm Evan Hahn, a programmer.</h1>
    </header>

    <IconLinks>
      <IconLink href="/about" icon={<AccountCircleIcon />}>
        About me
      </IconLink>
      <IconLink href="/guides" icon={<MenuBookIcon />}>
        Books and guides
      </IconLink>
      <IconLink href="/projects" icon={<CodeIcon />}>
        Projects
      </IconLink>
      <IconLink href="/blog" icon={<ListIcon />}>
        Blog
      </IconLink>
    </IconLinks>

    <IconLinks>
      <IconLink href="mailto:me@evanhahn.com" icon={<AlternateEmailIcon />}>
        Email
      </IconLink>
      <IconLink
        href="https://bigshoulders.city/@EvanHahn"
        target="_blank"
        icon={<MastodonIcon />}
      >
        Mastodon
      </IconLink>
      <IconLink
        href="https://twitter.com/EvanHahn"
        target="_blank"
        icon={<TwitterIcon />}
      >
        Twitter
      </IconLink>
      <IconLink
        href="https://github.com/EvanHahn"
        target="_blank"
        icon={<GithubIcon />}
      >
        GitHub
      </IconLink>
      <IconLink
        href="https://keybase.io/EvanHahn"
        target="_blank"
        icon={<KeybaseIcon />}
      >
        Keybase
      </IconLink>
    </IconLinks>
  </div>
)

export default IndexPage
