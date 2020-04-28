import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import DateElement from "../components/DateElement"
import ContentPage from "../components/ContentPage"
import { getDateFromPath } from "../lib/util"

export default function BlogPage() {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              path
            }
            fileAbsolutePath
          }
        }
      }
    }
  `)

  const blogLinks = data.allMarkdownRemark.edges
    .map(({ node }) => ({
      ...node,
      date: getDateFromPath(node.fileAbsolutePath),
    }))
    .filter(node => Boolean(node.date))
    .sort((a, b) => b.date - a.date)
    .map(node => (
      <li key={node.frontmatter.path}>
        <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
        <br />
        <small>
          <DateElement date={node.date} />
        </small>
      </li>
    ))

  return (
    <ContentPage title="Blog">
      <ul>{blogLinks}</ul>
    </ContentPage>
  )
}
