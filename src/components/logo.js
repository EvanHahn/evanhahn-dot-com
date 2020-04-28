import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Logo() {
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "logo_white.png" }) {
        childImageSharp {
          fixed(width: 512, height: 512, fit: COVER) {
            src
          }
        }
      }
    }
  `)

  return (
    <img className="Logo" alt="" src={data.file.childImageSharp.fixed.src} />
  )
}
