// 模拟用户数据
const users = [
  { username: "testuser@gmail.com", password: "123456", name: "Test User" },
];

export interface LoginParams {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginParams) => {
  // 模拟网络延迟
  await new Promise(res => setTimeout(res, 500));

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    return { success: true, user: { name: user.name, username: user.username } };
  } else {
    return { success: false, message: "用户名或密码错误" };
  }
};
