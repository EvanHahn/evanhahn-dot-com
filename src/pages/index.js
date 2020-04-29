import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { IconLinks, IconLink } from "../components/iconlinks";
import SEO from "../components/seo";
import Logo from "../components/logo";
import AboutIcon from "../components/AboutIcon";
import BlogIcon from "../components/BlogIcon";
import BookIcon from "../components/BookIcon";
import CodeIcon from "../components/CodeIcon";
import EmailIcon from "../components/EmailIcon";
import GithubIcon from "../components/GithubIcon";
import KeybaseIcon from "../components/KeybaseIcon";
import MastodonIcon from "../components/MastodonIcon";
import TwitterIcon from "../components/TwitterIcon";
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
        <IconLink useGatsbyLink href="/about" icon={<AboutIcon />}>
          About me
        </IconLink>
        <IconLink useGatsbyLink href="/projects" icon={<CodeIcon />}>
          Projects
        </IconLink>
        <IconLink useGatsbyLink href="/guides" icon={<BookIcon />}>
          Guides
        </IconLink>
        <IconLink useGatsbyLink href="/blog" icon={<BlogIcon />}>
          Blog
        </IconLink>
      </IconLinks>

      <IconLinks>
        <IconLink href="mailto:me@evanhahn.com" icon={<EmailIcon />}>
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
