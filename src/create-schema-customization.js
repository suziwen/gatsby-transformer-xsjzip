module.exports = function createSchemaCustomization ({ actions }){
  const { createTypes } = actions
  const typeDefs = `
    type StoryWriterMarkdown implements Node{
      id: ID
      title: String! 
      html: String!
      cover: File! @fileByRelativePath
      customCss: String!
      toc: String!
      slug: String!
      docType: String
      tags: [String!]!
      excerpt: String!
      createDate: Date! @dateformat
      createYear: Date! @dateformat
      createYearMonth: Date! @dateformat
      createYearMonthDay: Date! @dateformat
      rawMarkdownBody: String!
      updateDate: Date! @dateformat
    }
  `
  createTypes(typeDefs)
}

