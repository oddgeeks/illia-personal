import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import styled from "@emotion/styled"
import colors from "styles/colors"
import { Link, graphql } from "gatsby"
//import { RichText } from "prismic-reactjs"
import Button from "components/_ui/Button"
import Layout from "components/Layout"
import dimensions from "styles/dimensions"
import { MDXRenderer } from "gatsby-plugin-mdx"
import DefaultMdxComponentsProvider from "components/mdx/DefaultProvider"
import SeoHelmet from "components/SeoHelmet"

//const readingTime = require("reading-time")

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
  console.log(project)
  return (
    <>
      <SeoHelmet />
      <Helmet
        title={`${project.frontmatter.title}`}
        titleTemplate={`%s | ${meta.author}`}
        meta={[
          {
            name: `description`,
            content: `${project.frontmatter.description}`,
          },
          {
            property: `og:title`,
            content: `${project.frontmatter.title}`,
          },
          {
            property: `og:description`,
            content: `${project.frontmatter.description}`,
          },
          {
            property: `og:image`,
            content:
              meta.siteUrl +
              `${project.frontmatter.cover.childImageSharp.gatsbyImageData.images.fallback.src}`,
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
            content: `${project.frontmatter.title}`,
          },
          {
            name: `twitter:description`,
            content: `${project.frontmatter.description}`,
          },
          {
            property: `twitter:image`,
            content:
              meta.siteUrl +
              `${project.frontmatter.cover.childImageSharp.gatsbyImageData.images.fallback.src}`,
          },
        ].concat(meta)}
      />
      <Layout>
        <ProjectTitle>
          <h1>{project.frontmatter.title}</h1>
        </ProjectTitle>
        <ProjectStats>
          <ProjectReadingTime>
            {project.timeToRead} min read{" "}
            {project.timeToRead > 5 ? "☕️" : "⚡️"}
          </ProjectReadingTime>
          <ProjectLastUpdatedDate>
            Last Updated: {project.frontmatter.updated}
          </ProjectLastUpdatedDate>
        </ProjectStats>
        <ProjectBody>
          <DefaultMdxComponentsProvider>
            <MDXRenderer>{project.body}</MDXRenderer>
          </DefaultMdxComponentsProvider>
        </ProjectBody>
        <Projectslink to={"/garden"}>
          <Button className="Button--secondary">See other notes</Button>
        </Projectslink>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  // const projectContent = data.allPrismicProject.edges[0].node
  const projectContent = data.mdx
  const meta = data.site.siteMetadata
  return <Project project={projectContent} meta={meta} />
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
}

export const query = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
        description
        author
        image
        twitterUsername
        siteUrl
      }
    }
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        slug
        tags
        type
        updated(formatString: "DD MMM YYYY")
        description
        startDate
        cover {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
      timeToRead
    }
  }
`