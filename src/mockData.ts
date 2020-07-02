// 基础类型定义
export type TBaseDataStruct = {
  id: number,
  name: string,
  title: string,
  age?: number,
  sex: string
};

// 基础数据
export const baseData = [{
  id: 1,
  name: 'hans',
  title: 'hans',
  age: 25,
  sex: 'man'
}, {
  id: 2,
  name: 'jiujiu',
  title: 'jiujiu',
  age: 18,
  sex: 'women'
}];