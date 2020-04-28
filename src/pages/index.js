import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { IconLinks, IconLink } from "../components/iconlinks";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import GithubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import KeybaseIcon from "@material-ui/icons/VpnKey";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ListIcon from "@material-ui/icons/List";
import CodeIcon from "@material-ui/icons/Code";
import SEO from "../components/seo";
import Logo from "../components/logo";
import MastodonIcon from "../components/MastodonIcon";
import "../components/index.css";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <div className="IndexPage">
      <SEO title={data.site.siteMetadata.title} />

      <header>
        <Logo />
        <h1>{data.site.siteMetadata.description}</h1>
      </header>

      <IconLinks>
        <IconLink href="/about" icon={<AccountCircleIcon />}>
          About me
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
  );
};

export default IndexPage;
