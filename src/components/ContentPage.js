import React from "react";
import { Link } from "gatsby";
import SEO from "../components/seo";
import Logo from "./logo";
import { IconLinks, IconLink } from "./iconlinks";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ListIcon from "@material-ui/icons/List";
import CodeIcon from "@material-ui/icons/Code";
import DateElement from "../components/DateElement";
import "../components/index.css";

function ContentPageHeader() {
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

function ContentPageDate({ date }) {
  return (
    <p className="ContentPageDate">
      Posted on <DateElement date={date} />.
    </p>
  );
}

export default function ContentPage({ pageTitle, title, date, children }) {
  return (
    <div className="ContentPage">
      <SEO title={pageTitle || title} />

      <div className="ContentPageHeaderAndMainWrapper">
        <main className="ContentPageMain">
          <h1>{title}</h1>
          {children}
          {date && <ContentPageDate date={date} />}
        </main>

        <ContentPageHeader />
      </div>

      <footer className="ContentPageFooter">
        Unless noted otherwise, content is licensed under the{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/">
          Creative Commons Attribution License
        </a>{" "}
        and code under the <a href="https://unlicense.org/">Unlicense</a>. The
        logo was created by <a href="http://luluspice.com/">Lulu Tang</a>.
        Please come back soon!
      </footer>
    </div>
  );
}
