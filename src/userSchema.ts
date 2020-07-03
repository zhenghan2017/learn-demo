import {
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';
import { TBaseDataStruct, baseData } from './mockData';
import { UserType } from './typeDefine';


// filter
export function getUserById(id: string): TBaseDataStruct | undefined {
  const result = baseData.find(item => item.id.toString() === id);
  return result;
}

export async function getUsers(): Promise<TBaseDataStruct[]> {
  return Promise.resolve(baseData);
}

// 查询定义
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      // 解析器
      resolve: (_source, { id }) => getUserById(id)
    },
    users: {
      type: GraphQLList(UserType),
      resolve: async (_source, { }) => await getUsers()
    }
  })
});

export const userSchema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  types: [UserType],
});

