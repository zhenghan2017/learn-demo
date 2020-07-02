import {
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import { TBaseDataStruct, baseData } from './mockData';


// filter
export function getUserById(id: string): TBaseDataStruct | undefined {
  const result = baseData.find(item => item.id.toString() === id);
  return result;
}

export async function getUsers(): Promise<TBaseDataStruct[]> {
  return Promise.resolve(baseData);
}

// 类型定义
const userType = new GraphQLObjectType({
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

// 查询定义
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: userType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (_source, { id }) => getUserById(id)
    },
    users: {
      type: GraphQLList(userType),
      resolve: async (_source, { }) => await getUsers()
    }
  })
});

export const userSchema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  types: [userType],
});

