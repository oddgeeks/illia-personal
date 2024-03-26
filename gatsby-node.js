const path = require("path")
const _ = require("lodash")

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
// const wrapper = (promise) =>
//   promise.then((result) => {
//     if (result.errors) {
//       throw result.errors
//     }
//     return result
//   })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    query {
      projectsQuery: allMdx(
        filter: {
          frontmatter: { type: { eq: "Project" } }
        }
      ) {
        edges {
          node {
            id
            parent {
              ... on File {
                name
                sourceInstanceName
              }
            }
            frontmatter {
              slug,
              title
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors)
    }

    const projectTemplate = require.resolve("./src/templates/project.tsx")

    data.projectsQuery.edges.forEach(({ node }, i) => {
      const { edges } = data.projectsQuery
      const prevPage = i === 0 ? null : edges[i - 1].node
      const nextPage = i === edges.length - 1 ? null : edges[i + 1].node
      createPage({
        path: `/${node.frontmatter.slug}`,
        component: projectTemplate,
        context: {
          id: node.id,
          prevPage,
          nextPage,
        },
      })
    })
  })
}
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@images": path.resolve(__dirname, "src/images"),
        "@styles": path.resolve(__dirname, "src/styles"),
      }
    },
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
    },
  })
}
