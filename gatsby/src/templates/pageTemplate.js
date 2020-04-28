import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import ContentPageHeader from "../components/header"
import "../components/index.css"

// TODO: rename this file to match
export default function ContentPageTemplate({ data }) {
  const { frontmatter, html } = data.markdownRemark
  return (
    <div className="ContentPage">
      <SEO title={frontmatter.title} />

      <div className="ContentPageHeaderAndMainWrapper">
        <main className="ContentPageMain">
          <h1>{frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
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
    }
  }
`
