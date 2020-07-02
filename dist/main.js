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
const graphql_1 = require("graphql");
const userSchema_1 = require("./userSchema");
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield graphql_1.graphql({ schema: userSchema_1.userSchema, source: userQuery });
    if (result.errors) {
        return console.log(result.errors);
    }
    if (result.data) {
        console.log(JSON.parse(JSON.stringify(result.data)));
    }
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield graphql_1.graphql({ schema: userSchema_1.userSchema, source: usersQuery });
    if (result.errors) {
        return console.log(result.errors);
    }
    if (result.data) {
        console.log(JSON.parse(JSON.stringify(result.data)));
    }
}))();
