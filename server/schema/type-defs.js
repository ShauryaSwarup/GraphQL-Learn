const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
        favouriteMovies: [Movie]
    }
    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!  
    }
    type Query {
        users: [User!]!
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String!): Movie!
    }
    type Mutation {
        createUser(input: CreateUserInput!): User!
        updateUsername(input: UpdateUsernameInput!): User!
        deleteUser(input: DeleteUserInput!): User!
    }
    input UpdateUsernameInput {
        id: ID!
        username: String!
    }
    input DeleteUserInput {
        id: ID!
    }
    input CreateUserInput {
        name: String!
        username: String!
        age: Int = 18
        nationality: Nationality = INDIA
    }
    enum Nationality {
        BRAZIL
        CANADA
        CHILE
        GERMANY
        INDIA
    }
`

module.exports = {typeDefs};