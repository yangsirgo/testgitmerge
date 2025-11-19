// LoginForm.tsx
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginFormInputs {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required("请输入用户名"),
  password: yup.string().required("请输入密码"),
}).required();

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: LoginFormInputs) => {
    // 调用登录接口 → 成功后 navigate("/home")
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* MUI TextField + error 显示 */}
    </form>
  );
};
