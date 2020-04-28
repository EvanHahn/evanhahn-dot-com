import React from "react"
import { IconLink } from "../components/iconlinks"
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import TwitterIcon from "@material-ui/icons/Twitter"
import KeybaseIcon from "@material-ui/icons/VpnKey"
import SEO from "../components/seo"
import MastodonIcon from "../components/MastodonIcon"
import ContentPageHeader from "../components/header"
import "../components/index.css"

export default function ContactPage() {
  return (
    <div className="ContentPage">
      <SEO title="Contact Evan Hahn" />

      <div className="ContentPageHeaderAndMainWrapper">
        <main className="ContentPageMain">
          <h1>Contact</h1>
          <p>Contact me! If you want!</p>
          <ul style={{ padding: 0 }}>
            <IconLink
              href="mailto:me@evanhahn.com"
              icon={<AlternateEmailIcon />}
            >
              Email
            </IconLink>
            <IconLink
              href="https://bigshoulders.city/@EvanHahn"
              target="_blank"
              icon={<MastodonIcon />}
            >
              Mastodon
            </IconLink>
            <IconLink
              href="https://twitter.com/EvanHahn"
              target="_blank"
              icon={<TwitterIcon />}
            >
              Twitter
            </IconLink>
            <IconLink
              href="https://keybase.io/EvanHahn"
              target="_blank"
              icon={<KeybaseIcon />}
            >
              Keybase
            </IconLink>
          </ul>
        </main>

        <ContentPageHeader />
      </div>
    </div>
  )
}
