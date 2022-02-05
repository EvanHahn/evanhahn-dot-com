import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import SEO from "../components/seo";
import Logo from "../components/logo";
import "../components/index.css";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <div className="IndexPage">
      <SEO title={data.site.siteMetadata.title} />

      <header>
        <Logo />
        <h1>{data.site.siteMetadata.description}</h1>
      </header>

      <div className="IndexPageLinkGroup">
        <Link to="/about">About me</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/guides">Guides</Link>
        <Link to="/blog">Blog</Link>
      </div>
    </div>
  );
};

export default IndexPage;
