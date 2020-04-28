import React from "react";
import SEO from "../components/seo";
import ContentPageHeader from "../components/header";
import DateElement from "../components/DateElement";
import "../components/index.css";

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
