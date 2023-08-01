//用户列表数据
const list = [
  {
    username: "讨好有",
    age: 18,
    phone: "13222222222",
    hobby: "打篮球",
    password: "hao110",
    sex:'男'
  },
];

// 获取用户列表
export const queryList = (query) => {
  const {pageSize=10,current=1}=query;
  console.log('queryyy',query)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(list.slice((current-1)*pageSize,pageSize))
      resolve({
        data:list.slice((current-1)*pageSize,current*pageSize),
        total:list.length
      });
    }, 1000);
  });
};

// 注册
export const register = (query) => {
  const { username } = query;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let isAlreadyHas = list.some((item) => {
        return item.username === username;
      });
      if (isAlreadyHas) {
        reject("用户已存在");
      } else {
        list.unshift(query);
        resolve("成功");
      }
    }, 1000);
  });
};
// 查询用户详情
export const queryDetail = (query) => {
  const { username } = query;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let userInfo = list.find((item) => {
        return item.username === username;
      });
      if (userInfo) {
        resolve(userInfo);
      } else {
        reject("用户不存在");
      }
    }, 2000);
  });
};
// 修改用户信息
export const updateUser = (query) => {
  const { username } = query;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let index = list.findIndex((item) => {
        return item.username === username;
      });
      if (index > -1) {
        list.splice(index, 1, {...list[index],...query});
        resolve("修改成功");
      } else {
        reject("找不到用户信息");
      }
    }, 2000);
  });
};

// 删除用户
export const deleteUser = (query) => {
  const { username } = query;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let index = list.findIndex((item) => {
        return item.username === username;
      });
      if (index > -1) {
        list.splice(index, 1);
        resolve("删除成功");
      } else {
        reject("找不到用户信息");
      }
    }, 2000);
  });
};
