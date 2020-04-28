const path = require("path")

// TODO: Old posts from Jekyll have different frontmatter.
// We should make things consistent.
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve("src/templates/pageTemplate.js")

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
            fileAbsolutePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: pageTemplate,
      context: {},
    })
  })
}
