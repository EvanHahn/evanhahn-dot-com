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

      <main className="ContentPageMain">
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </main>

      <ContentPageHeader />
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
