import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import ContentPageHeader from "../components/header"
import "../components/index.css"
import * as path from "path"
import format from "date-fns/format"

function getDateFromPath(fileAbsolutePath) {
  const basename = path.basename(fileAbsolutePath)

  if (!/^2[0-9]{3}-[01][0-9]-[0-3][0-9]-/.test(basename)) {
    return null
  }

  const date = new Date(basename.substr(0, 10))
  if (Number.isNaN(date.valueOf())) {
    return null
  }

  return date
}

function ContentPageDate({ date }) {
  return (
    <p className="ContentPageDate">
      Posted on{" "}
      <time datetime={format(date, "yyyy-MM-dd")}>
        {format(date, "MMMM do, yyyy")}
      </time>
      .
    </p>
  )
}

// TODO: rename this file to match
export default function ContentPageTemplate({ data }) {
  const { fileAbsolutePath, frontmatter, html } = data.markdownRemark

  const date = getDateFromPath(fileAbsolutePath)

  return (
    <div className="ContentPage">
      <SEO title={frontmatter.title} />

      <div className="ContentPageHeaderAndMainWrapper">
        <main className="ContentPageMain">
          <h1>{frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
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
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
      fileAbsolutePath
    }
  }
`
