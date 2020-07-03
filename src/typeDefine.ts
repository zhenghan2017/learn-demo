import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    title: {
      type: GraphQLNonNull(GraphQLString)
    },
    age: {
      type: GraphQLString
    },
    sex: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});