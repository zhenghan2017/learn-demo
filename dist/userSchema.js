"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.getUsers = exports.getUserById = void 0;
const graphql_1 = require("graphql");
const mockData_1 = require("./mockData");
function getUserById(id) {
    const result = mockData_1.baseData.find(item => item.id.toString() === id);
    return result;
}
exports.getUserById = getUserById;
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(mockData_1.baseData);
    });
}
exports.getUsers = getUsers;
const userType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        name: {
            type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        title: {
            type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        age: {
            type: graphql_1.GraphQLString
        },
        sex: {
            type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        }
    })
});
const queryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        user: {
            type: userType,
            args: {
                id: {
                    type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
                }
            },
            resolve: (_source, { id }) => getUserById(id)
        },
        users: {
            type: graphql_1.GraphQLList(userType),
            resolve: (_source, {}) => __awaiter(void 0, void 0, void 0, function* () { return yield getUsers(); })
        }
    })
});
exports.userSchema = new graphql_1.GraphQLSchema({
    query: queryType,
    types: [userType],
});
