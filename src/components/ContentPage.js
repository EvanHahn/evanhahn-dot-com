import React from "react";
import { Link } from "gatsby";
import SEO from "../components/seo";
import Logo from "./logo";
import DateElement from "../components/DateElement";
import "../components/index.css";

function ContentPageHeader() {
  return (
    <header className="ContentPageHeader">
      <a className="SkipToContentLink" href="#main">
        Skip to content
      </a>
      <div className="Container">
        <Logo linkTo="/" />
        <div className="ContentPageHeaderLinks">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/guides">Guides</Link>
          <Link to="/blog">Blog</Link>
        </div>
      </div>
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

export default function ContentPage({
  pageTitle,
  title,
  description,
  date,
  children,
}) {
  return (
    <div className="ContentPage">
      <SEO title={pageTitle || title} description={description} />

      <ContentPageHeader />

      <main id="main" className="ContentPageMain">
        <div className="Container">
          <h1>{title}</h1>
          {children}
          {date && <ContentPageDate date={date} />}
        </div>
      </main>

      <footer className="ContentPageFooter">
        <div className="Container">
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/guides">Guides</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
          <ul>
            <li>
              <a href="mailto:me@evanhahn.com">Email</a>
            </li>
            <li>
              <a href="https://bigshoulders.city/@EvanHahn">Mastodon</a>
            </li>
            <li>
              <a href="https://twitter.com/EvanHahn">Twitter</a>
            </li>
            <li>
              <a href="https://github.com/EvanHahn">GitHub</a>
            </li>
          </ul>
          <p>
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
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
