import React from "react"
import SEO from "../components/seo"
import ContentPageHeader from "../components/header"
import "../components/index.css"

export default function ContactPage() {
  return (
    <div className="ContentPage">
      <SEO title="Contact Evan Hahn" />

      <div className="ContentPageHeaderAndMainWrapper">
        <main className="ContentPageMain">
          <h1>Contact</h1>

          <p>
            You can <strong>email me</strong> at{" "}
            <a href="mailto:me@evanhahn.com">me@evanhahn.com</a>.
          </p>

          <p>
            You can message me on <strong>Keybase</strong> at{" "}
            <a
              href="https://keybase.io/EvanHahn"
              target="_blank"
              rel="noreferrer noopener"
            >
              keybase.io/EvanHahn
            </a>
            .
          </p>

          <p>
            You can follow me on the <strong>Fediverse</strong> at{" "}
            <a
              href="https://bigshoulders.city/@EvanHahn"
              target="_blank"
              rel="noreferrer noopener"
            >
              @EvanHahn@bigshoulders.city
            </a>{" "}
            and on <strong>Twitter</strong> at{" "}
            <a
              href="https://twitter.com/EvanHahn"
              target="_blank"
              rel="noreferrer noopener"
            >
              @EvanHahn
            </a>
            .
          </p>

          <p>
            I'm on <strong>GitHub</strong> at{" "}
            <a
              href="https://github.com/EvanHahn"
              target="_blank"
              rel="noreferrer noopener"
            >
              github.com/EvanHahn
            </a>{" "}
            and I'm also on <strong>StackOverflow</strong>{" "}
            <a
              href="https://stackoverflow.com/users/804100/evan-hahn"
              target="_blank"
              rel="noreferrer noopener"
            >
              here
            </a>
            .
          </p>
        </main>

        <ContentPageHeader />
      </div>
    </div>
  )
}
