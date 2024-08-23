import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  confirmToken,
  ForgotPasswordForm,
  RequestConfirmationCodeForm,
  UserLoginForm,
  UserRegistrationForm,
  NewPasswordForm,
  userSchema,
  CheckPasswordForm,
} from "../types";

export async function createAccount(formData: UserRegistrationForm) {
  try {
    const url = "auth/create-account";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  }
}

export async function confirmAccount(token: confirmToken) {
  try {
    const url = "auth/confirm-account";
    const { data } = await api.post<string>(url, token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  }
}

export async function requestConfirmCode(email: RequestConfirmationCodeForm) {
  try {
    const url = "auth/request-code";
    const { data } = await api.post<string>(url, email);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  }
}

export async function authentucateUser(formData: UserLoginForm) {
  try {
    const url = "auth/login";
    const { data } = await api.post<string>(url, formData);
    localStorage.setItem("AUTH_TOKEN", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  }
}

export async function forgotPassword(email: ForgotPasswordForm) {
  try {
    const url = "auth/forgot-password";
    const { data } = await api.post<string>(url, email);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

//Validar el token para cambiar la contraseña
export async function validateToken(token: confirmToken) {
  try {
    const url = "auth/validate-token";
    const { data } = await api.post<string>(url, token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

//Cambiar la contraseña
export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: confirmToken["token"];
}) {
  try {
    const url = `auth/update-password/${token}`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUser() {
  try {
    const { data } = await api.get("/auth/user");
    const response = userSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function checkPassword(formData: CheckPasswordForm) {
  try {
    const url = "/auth/check-password";
    const { data } = await api.post<string>(url, formData);
    const response = userSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
