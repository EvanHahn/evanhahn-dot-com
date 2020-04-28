import React from "react";
import { graphql } from "gatsby";
import ContentPage from "../components/ContentPage";
import { getDateFromPath } from "../lib/util";

// TODO: rename this file to match
export default function ContentPageTemplate({ data }) {
  const { fileAbsolutePath, frontmatter, html } = data.markdownRemark;

  return (
    <ContentPage
      title={frontmatter.title}
      date={getDateFromPath(fileAbsolutePath)}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </ContentPage>
  );
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
`;
