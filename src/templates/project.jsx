import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import styled from "@emotion/styled"
import colors from "styles/colors"
import { Link, graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import Button from "components/_ui/Button"
import Layout from "components/Layout"
import dimensions from "styles/dimensions"

const readingTime = require("reading-time")

const ProjectHeroContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  margin-bottom: 3.5em;

  img {
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
  }
`

const ProjectTitle = styled("div")`
  max-width: ${dimensions.maxwidthTablet}px;
  margin: 0 auto;
  text-align: center;
`

const ProjectStats = styled("div")`
  max-width: ${dimensions.maxwidthTablet}px;
  margin: 0 auto;
  border-bottom: 0.1em solid ${colors.grey600};
  font-weight: 300;
  color: ${colors.grey600};
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ProjectReadingTime = styled("span")``
const ProjectLastUpdatedDate = styled("span")``

const ProjectBody = styled("div")`
  max-width: ${dimensions.maxwidthTablet}px;
  margin: 0 auto;

  a {
    font-weight: 600;
    color: var(--color-primary, #73abff);
    box-shadow: inset 0 -2px 0 0 var(--color-primary, #73abff);
    border-bottom: 1px solid var(--color-primary, #73abff);
    text-decoration: none;
    transition: all 150ms ease-in-out;
  }

  a:hover {
    color: var(--color-background, #ffffff);
    box-shadow: inset 0 -1.25em 0 0 var(--color-primary, #73abff);
    border-bottom-color: var(--color-primary, #73abff);
    outline: 0;
    text-decoration: none;
  }

  .block-img {
    margin-top: 3.5em;
    margin-bottom: 0.5em;

    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }

    a:hover {
      background: rgba(0, 0, 0, 0) !important;
    }
  }
`

const Projectslink = styled(Link)`
  margin-top: 3em;
  display: block;
  text-align: center;
`

const Project = ({ project, meta }) => {
  return (
    <>
      <Helmet
        title={`${project.data.project_title.text}`}
        titleTemplate={`%s | ${meta.author}`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `${project.data.project_title.text}`,
          },
          {
            property: `og:description`,
            content: `${project.data.project_preview_description.text}`,
          },
          {
            property: `og:image`,
            content: `${project.data.project_preview_thumbnail.url}`,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary_large_image`,
          },
          {
            name: `twitter:creator`,
            content: meta.twitterUsername,
          },
          {
            name: `twitter:title`,
            content: `${project.data.project_title.text}`,
          },
          {
            name: `twitter:description`,
            content: `${project.data.project_preview_description.text}`,
          },
          {
            property: `twitter:image`,
            content: `${project.data.project_preview_thumbnail.url}`,
          },
        ].concat(meta)}
      />
      <Layout>
        <ProjectTitle>
          {RichText.render(project.data.project_title.raw)}
        </ProjectTitle>
        {project.data.project_hero_image && (
          <ProjectHeroContainer>
            <img src={project.data.project_hero_image.url} alt="hero image" />
          </ProjectHeroContainer>
        )}
        <ProjectStats>
          <ProjectReadingTime>
            {readingTime(
              project.data.project_description.text
            ).minutes.toFixed()}{" "}
            min read{" "}
            {readingTime(project.data.project_description.text).minutes > 5
              ? "☕️"
              : "⚡️"}
          </ProjectReadingTime>
          <ProjectLastUpdatedDate>
            Last Updated: {project.data.project_post_date}
          </ProjectLastUpdatedDate>
        </ProjectStats>

        <ProjectBody>
          {RichText.render(project.data.project_description.raw)}
        </ProjectBody>
        <Projectslink to={"/projects"}>
          <Button className="Button--secondary">See other projects</Button>
        </Projectslink>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const projectContent = data.allPrismicProject.edges[0].node
  const meta = data.site.siteMetadata
  return <Project project={projectContent} meta={meta} />
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
}

export const query = graphql`
  query ProjectQuery($uid: String) {
    allPrismicProject(filter: { uid: { eq: $uid } }) {
      edges {
        node {
          uid
          data {
            project_title {
              html
              text
              raw
            }
            project_preview_description {
              html
              text
              raw
            }
            project_preview_thumbnail {
              alt
              copyright
              url
              thumbnails
            }
            project_category {
              html
              text
              raw
            }
            project_post_date(fromNow: false, formatString: "DD MMM YYYY")
            project_hero_image {
              alt
              copyright
              url
              thumbnails
            }
            project_description {
              html
              text
              raw
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
        twitterUsername
      }
    }
  }
`