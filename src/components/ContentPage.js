import React from "react";
import { Link } from "gatsby";
import SEO from "../components/seo";
import Logo from "./logo";
import { IconLinks, IconLink } from "./iconlinks";
import DateElement from "../components/DateElement";
import AboutIcon from "../components/AboutIcon";
import BlogIcon from "../components/BlogIcon";
import BookIcon from "../components/BookIcon";
import CodeIcon from "../components/CodeIcon";
import EmailIcon from "../components/EmailIcon";
import "../components/index.css";

function ContentPageHeader() {
  return (
    <header className="ContentPageHeader">
      <Link to="/">
        <Logo />
      </Link>

      <IconLinks>
        <IconLink
          href="https://blacklivesmatter.com/"
          target="_blank"
          icon={null}
        >
          #BlackLivesMatter
        </IconLink>
        <IconLink useGatsbyLink href="/about" icon={<AboutIcon />}>
          About
        </IconLink>
        <IconLink useGatsbyLink href="/contact" icon={<EmailIcon />}>
          Contact
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
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Creative Commons Attribution License
        </a>{" "}
        and code under the{" "}
        <a
          href="https://unlicense.org/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Unlicense
        </a>
        . The logo was created by{" "}
        <a
          href="http://luluspice.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Lulu Tang
        </a>
        . Icons are{" "}
        <a
          href="http://www.entypo.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          Entypo pictograms by Daniel Bruce
        </a>
        . Please come back soon!
      </footer>
    </div>
  );
}
