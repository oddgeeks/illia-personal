import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import dimensions from '@styles/dimensions';
import Button from '@components/_ui/Button';
import About from '@components/About';
import Layout from '@components/Layout';
import ProjectCardMdx from '@components/ProjectCardMdx';
import SeoHelmet from '@components/SeoHelmet';
import SectionGrid from '@components/_ui/SectionGrid';
import config from '../../config/website';
import { Site, MdxConnection } from '../types/graphqlTypes';

const Hero = styled('div')`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  h1 {
    font-size: 3rem;
    margin-bottom: 1em;

    a {
      text-decoration: none;
      transition: all 100ms ease-in-out;

      &:hover {
        cursor: pointer;
        transition: all 100ms ease-in-out;
      }
    }

    @media (max-width: ${dimensions.maxwidthTablet}px) {
      font-size: 2rem;
    }
  }
`;

const Section = styled('div')`
  margin-bottom: 5em;
  display: flex;
  flex-direction: column;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin-bottom: 4em;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
  h3,
  h5 {
    a {
      text-decoration: none;
      transition: all 100ms ease-in-out;
      color: var(--color-text);

      &:hover {
        color: var(--color-primary, #73abff);
        cursor: pointer;
        transition: all 100ms ease-in-out;
      }
    }
  }
`;

const ActionLink = styled(Link)`
  margin-top: 1em;
  font-weight: 600;
  text-decoration: none;
  color: var(--color-text, #16161a);
  transition: all 150ms ease-in-out;
  margin-left: auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin: 1em auto;
  }

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }

  &:hover {
    color: var(--color-primary, #73abff);
    transition: all 150ms ease-in-out;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: transform 150ms ease-in-out;
    }
  }
`;

interface IndexProps {
  data: {
    site: Site;
    projectQuery: MdxConnection;
  };
}

function IndexTemplate({ data }: IndexProps) {
  // Required check for no data being returned
  const projects = data.projectQuery.edges;

  if (!projects) return null;

  return (
    <Layout>
      <SeoHelmet />
      <Hero>
        <h1>
          Hello, I'm Illia Korniev. <br />I specialize in development of{' '}
          <span style={{ color: 'var(--color-hero-primary)' }}>
            Web Applications
          </span>
        </h1>
        <a
          href="mailto:illiakorniev6@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Let's work together</Button>
        </a>
      </Hero>
      <Section>
        <h3 id="about">About Me</h3>
        <About />
      </Section>
      <Section>
        <h3 id="projects">
          <a href="/projects">Featured Projects</a>
        </h3>
        <h5>{config.projectDesc}</h5>
        <SectionGrid>
          {projects.map((project, i) => (
            <ProjectCardMdx key={i} data={project.node.frontmatter} />
          ))}
        </SectionGrid>

        <ActionLink to="/projects">
          All projects <span>&#8594;</span>
        </ActionLink>
      </Section>
    </Layout>
  );
}

export default IndexTemplate;

export const query = graphql`
  {
    projectQuery: allMdx(
      limit: 4
      filter: {
        frontmatter: { featured: { eq: true }, type: { eq: "Project" } }
      }
    ) {
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
