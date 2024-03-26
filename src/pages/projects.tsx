import React from 'react';
import { graphql } from 'gatsby';
import Layout from '@components/Layout';
import ProjectCardMdx from '@components/ProjectCardMdx';
import SeoHelmet from '@components/SeoHelmet';
import SectionGrid from '@components/_ui/SectionGrid';
import SectionPageTitle from '@components/_ui/SectionPageTitle';
import config from '../../config/website';
import { PageListingProps } from '../types/customGraphqlTypes';

function ProjectsPage({ data }: PageListingProps) {
  const projects = data.allMdx.edges;
  if (!projects) return null;

  return (
    <>
      <SeoHelmet />
      <Layout>
        <SectionPageTitle>Projects</SectionPageTitle>
        <h5>{config.projectDesc}</h5>
        <SectionGrid>
          {projects.map((project, i) => (
            <ProjectCardMdx key={i} data={project.node.frontmatter} />
          ))}
        </SectionGrid>
      </Layout>
    </>
  );
}

export default ProjectsPage;

export const query = graphql`
  {
    allMdx(filter: { frontmatter: { type: { eq: "Project" } } }) {
      edges {
        node {
          frontmatter {
            extLink
            cover {
              id
              childImageSharp {
                gatsbyImageData(
                  width: 800
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
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
        image
      }
    }
  }
`;
