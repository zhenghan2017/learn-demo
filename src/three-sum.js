/**
 * @param {number[]} numList
 * @return {number[][]}
 */
const threeSum = function (numList) {
  if (numList.length < 3) {
    return [];
  }
  const map = new Map();
  const obj = {};
  const results = [];
  for (const item of numList) {
    let value = map.get(item);
    if (value) {
      map.set(item, ++value);
    } else {
      map.set(item, 1);
    }
  }
  for (let [key, value] of map) {
    const one = 0 - key;
    if (key === 0 && value > 2) {
      obj['0,0,0'] = 1;
      continue;
    }
    if (key !== one && map.has(one) && map.has(0)) {
      let arr = [0, key, one];
      arr.sort();
      obj[arr.join(',')] = 1;
    }
    if (key !== 0) {
      for (let [subKey, subValue] of map) {
        const two = one - subKey;
        if (two === subKey && subValue > 1) {
          let arr = [key, subKey, two];
          arr.sort();
          obj[arr.join(',')] = 1;
        } else if (two === key && value > 1) {
          let arr = [key, subKey, two];
          arr.sort();
          obj[arr.join(',')] = 1;
        } else if (subKey === key && value > 1 && map.has(two)) {
          let arr = [key, subKey, two];
          arr.sort();
          obj[arr.join(',')] = 1;
        }
        if (key === -4 && subKey === 1) {
          console.log(two !== key, two !== subKey, key !== subKey)
        }
        if (two !== key && two !== subKey && key !== subKey) {
          if (map.has(two)) {
            let arr = [key, subKey, two];
            arr.sort();
            obj[arr.join(',')] = 1;
          }
        }
      }
    }
  }
  for (const key in obj) {
    results.push(key.split(','));
  }
  return results;
};

const numList = [0, 0, 0];

const results = threeSum(numList);
console.log(results);