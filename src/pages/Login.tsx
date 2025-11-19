import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required("请输入用户名").email("请输入正确的邮箱格式"),
  password: yup.string().required("请输入密码").min(4, "密码必须大于三位"),
}).required();

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    setErrorMsg(null);
    const res = await login(data);
    if (res.success) {
      // 登录成功，跳转首页
      navigate("/home");
    } else {
      setErrorMsg(res.message || "登录失败");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          登录
        </Typography>

        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="用户名"
            fullWidth
            margin="normal"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="密码"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            登录
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
