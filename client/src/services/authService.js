import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please Provide All Fields");
    }
    console.log("login",e,email,password,role);
    // to dispatch authAction use dispatch
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};
//here we cannot used useSelector(hook) react component because
// authService is not react component-we need to use Store
export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  phoneNumber,
  organizationName,
  address,
  hospitalName,
  website
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        phoneNumber,
        organizationName,
        address,
        hospitalName,
        website,
      })
    );
    console.log("Register",e,name,role,email,password,organizationName,address);
  } catch (error) {
    console.log(error);
  }
};