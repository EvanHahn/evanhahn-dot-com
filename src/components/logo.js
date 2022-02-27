import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";

export default function Logo({ linkTo }) {
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

  const image = (
    <img
      className="Logo__image"
      alt="Evan Hahn"
      // We use the fallback for simplicity.
      src={data.file.childImageSharp.gatsbyImageData.images.fallback.src}
    />
  );

  if (linkTo) {
    return (
      <Link className="Logo" to={linkTo}>
        {image}
      </Link>
    );
  }

  return image;
}
