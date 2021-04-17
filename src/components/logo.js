import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default function Logo() {
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "logo_white.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 512
            height: 512
            placeholder: NONE
            transformOptions: { fit: COVER }
            layout: FIXED
          )
        }
      }
    }
  `);

  return (
    <img
      className="Logo"
      alt="Evan Hahn"
      // We use the fallback for simplicity.
      src={data.file.childImageSharp.gatsbyImageData.images.fallback.src}
    />
  );
}
