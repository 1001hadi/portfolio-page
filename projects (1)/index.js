import { graphql, Link } from 'gatsby';
import React from 'react'
import Layout from '../../components/Layout';
import  * as styles from '../../styles/projects.module.css'
import { GatsbyImage } from 'gatsby-plugin-image'; 

const Projects = ({ data }) => {
  const projects = data.projects.nodes;
  const contact = data.contact.siteMetadata.contact;
  
  return (
    <Layout>
      <div className={styles.portfolio}>
        <h2>Portfolio</h2>
        <h3>Projects & Websites I've Created</h3>
        <div className={styles.projects}>
          {projects.map(project => (
            <Link to={"/projects/" + project.frontmatter.slug} key={project.id}>
              <div>
              <GatsbyImage image={ project.frontmatter.thumb.childImageSharp.gatsbyImageData } alt="project image"/>
              <h3>{project.frontmatter.title}</h3>
              <p>{project.frontmatter.stack}</p>
              </div>
            </Link>
          ))}
        </div>
        <p>Like what you see? Email me at:  { contact } for a quote!</p>
      </div>
    </Layout>
  );
}



export const query = graphql`
    query projectPage {
    projects: allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
        nodes {
        frontmatter {
            title
            stack
            slug
            thumb {
            childImageSharp {
                gatsbyImageData(
                    layout: FULL_WIDTH
                    placeholder: BLURRED
                    formats: [AUTO, WEBP]
                )
            }
            }
        }
        id
        }
    }
    contact: site {
        siteMetadata {
        contact
        }
    }
    }`
 
export default Projects
