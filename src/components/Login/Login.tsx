import { Link, useNavigate } from "react-router-dom";
import TextFieldCustoms from "../Profile/TextFieldCustoms";
import { FormikProps } from "formik";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

interface ILogin {
  email: string;
  password: string;
}

interface ILoginForm {
  formik: FormikProps<ILogin>;
}

interface IState {
  showPassword: boolean;
}

export default function Login({ formik }: ILoginForm) {
  // const navigate = useNavigate();
  const [value, setValue] = useState<IState>({
    showPassword: false,
  });

  const handleClickShowPassword = (): void => {
    setValue({
      ...value,
      showPassword: !value.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    formik;
  return (
    <div
      className="h-screen bg-cover bg-contain bg-center"
      style={{
        backgroundImage: `url('https://file.vfo.vn/hinh/2018/02/chim-chao-mao-hinh-anh-hinh-nen-chim-chao-mao-dep-nhat-22.png')`,
        // chỉnh kích thước ảnh nền nhỏ lại phù hợp với màn hình
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="rounded bg-white p-10 shadow-sm"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="text-2xl">Đăng nhập</div>
              <TextFieldCustoms
                id="email"
                name="email"
                label="Email"
                condition={Boolean(touched.email && errors.email)}
                errorMessage={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth={true}
                placeholder="Ex: Khoa123"
                variant="outlined"
                type="text"
                required
                value={values.email}
              />
              <TextFieldCustoms
                fullWidth={true}
                errorMessage={errors.password}
                label="Password"
                required
                condition={Boolean(touched.password && errors.password)}
              >
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={value.showPassword ? "text" : "password"}
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  onBlur={(e): void => {
                    handleBlur(e);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {value.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Password"
                />
              </TextFieldCustoms>
              <div className="mt-3">
                <button
                  // onClick={() => {
                  //   navigate("home");
                  // }}
                  type="submit"
                  className="lex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600"
                >
                  Đăng nhập
                </button>
              </div>
              <div className="item-center mt-8 flex justify-center">
                <span className="text-slate-400">Bạn chưa có tài khoản ?</span>
                <Link className="ml-1 text-red-400" to="/register">
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
