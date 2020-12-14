// 先序遍历，根->左->右

function preOrder(node, result = []) {

  if (!node) return

  result.push(node.value);

  preOrder(node.left, result);

  preOrder(node.right, result);

  return result;

}

// 中序遍历，左->根->右

function inOrder(node, result = []) {

  if (!node) return

  inOrder(node.left, result);

  result.push(node.value);

  inOrder(node.right, result);

  return result;

}

// 后序遍历，左->右->根

function postOrder(node, result = []) {

  if (!node) return

  postOrder(node.left, result);

  postOrder(node.right, result);

  result.push(node.value);

  return result;

}

const tree = {
  id: '0',
  value: '0',
  left: {
    id: '1-1-l',
    value: '1-1-l',
  },
  right: {
    id: '1-1-r',
    value: '1-1-r'
  }
};

const pre = preOrder(tree);
console.log(pre);
