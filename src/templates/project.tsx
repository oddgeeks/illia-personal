import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '@components/Layout';
import dimensions from '@styles/dimensions';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import DefaultMdxComponentsProvider from '@components/mdx/DefaultProvider';
import SeoHelmet from '@components/SeoHelmet';
import { PageTemplateProps } from '../types/customGraphqlTypes';

const ProjectBody = styled('div')`
  max-width: ${dimensions.maxwidthTablet}px;
  margin: 0 auto;

  a:not(.anchor) {
    font-weight: 600;
    color: var(--color-primary, #73abff);
    box-shadow: inset 0 -2px 0 0 var(--color-primary, #73abff);
    border-bottom: 1px solid var(--color-primary, #73abff);
    text-decoration: none;
    transition: all 150ms ease-in-out;
  }

  a:hover:not(.anchor) {
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
`;

function ProjectTemplate({ data }: PageTemplateProps) {
  const project = data.mdx;
  return (
    <>
      <SeoHelmet />
      <Layout>
        <ProjectBody>
          <DefaultMdxComponentsProvider>
            <MDXRenderer>{project.body}</MDXRenderer>
          </DefaultMdxComponentsProvider>
        </ProjectBody>
      </Layout>
    </>
  );
}

export default ProjectTemplate;

export const query = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
        description
        author
        image
      }
    }
    mdx(id: { eq: $id }) {
      frontmatter {
        extLink
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
`;
