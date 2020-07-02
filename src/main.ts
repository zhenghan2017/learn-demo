import { graphql } from 'graphql';
import { userSchema } from './userSchema';

// source
const userQuery = `
  {
    user(id: "1") {
      name
    }
  }
`;

const usersQuery = `
  {
    users {
      id
      name
    }
  }
`;

(async () => {
  const result = await graphql({ schema: userSchema, source: userQuery });
  // 直接输出结果会包含[Object: null prototype]
  // 解决方案之一是JSON.parse(JSON.stringify(result.data))
  if (result.errors) {
    return console.log(result.errors);
  }
  if (result.data) {
    console.log(JSON.parse(JSON.stringify(result.data)));
  }
})();


(async () => {
  const result = await graphql({ schema: userSchema, source: usersQuery });
  // 直接输出结果会包含[Object: null prototype]
  // 解决方案之一是JSON.parse(JSON.stringify(result.data))
  if (result.errors) {
    return console.log(result.errors);
  }
  if (result.data) {
    console.log(JSON.parse(JSON.stringify(result.data)));
  }
})();