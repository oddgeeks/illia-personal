import React from 'react';
import styled from '@emotion/styled';
import dimensions from '@styles/dimensions';
import { StaticImage } from 'gatsby-plugin-image';

const AboutContainer = styled('div')`
  display: flex;
  flex-direction: row;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    flex-direction: column;
  }
`;

const AboutPhoto = styled('div')`
  padding: 2rem;
`;

const AboutBio = styled('div')`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    margin: 0;
  }

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

  ul {
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;
  }
  li {
    position: relative;
    margin-bottom: 10px;
    padding-left: 20px;
    font-size: 0.85em;
    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: var(--color-primary, #73abff);
      font-size: 1.5em;
      line-height: 18px;
    }
  }

  @media (max-width: ${dimensions.maxwidthDesktop}px) {
    padding: 0rem;
    ul {
      display: grid;
      grid-template-columns: auto auto;
      padding: 0;
      margin: 20px 0 0 0;
      overflow: hidden;
      list-style: none;
    }
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    ul {
      display: grid;
      grid-template-columns: 1fr;
      padding: 0;
      margin: 20px 0 0 0;
      overflow: hidden;
      list-style: none;
    }
  }
`;

const skills = [
  'C/C++',
  'Java/SpringBoot',
  'Ruby/Ruby On Rails',
  'JavaScript/TypeScript',
  'PHP/Laravel',
  'Node.js/Express/NestJS',
  'React.js/Next.js',
  'Vue.js/Nuxt.js',
  'Svelte/SvelteKit',
  'SQL/MySQL/PostgreSQL',
  'NoSQL/MongoDB',
  'AWS/GCP/AZURE',
  'Web3.js/Ethers.js'
];

const About = () => (
  <AboutContainer>
    <AboutPhoto>
      <StaticImage
        className="img"
        src="../images/profile-photo-circle-512.png"
        width={500}
        quality={95}
        placeholder="blurred"
        formats={['auto', 'webp', 'avif']}
        alt="Profile Photo"
      />
    </AboutPhoto>
    <AboutBio>
      <p>
        Hi! My name is Illia. I'm a software engineer with a focus on delivering
        business value through innovation and technology. I am delighted to have
        opportunities in my career to helping my clients in the government,
        healthcare, e-commerce and legal sectors to improve their digital
        experiences.
      </p>

      <p>
        I am currently pursuing my studies in Artificial Intelligence and
        business. I seek to develop innovative solutions that can help solve
        complex problems at the intersections of business, AI and software
        engineering.
      </p>

      <p>Here are a few technologies that I've been working with recently:</p>
      <ul>{skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
    </AboutBio>
  </AboutContainer>
);

export default About;
