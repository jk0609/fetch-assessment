import { useState } from "react";
import { apiUrl } from "../../config";

type Props = {
  onLogin: () => void;
};

const Login = (props: Props) => {
  const { onLogin } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onLoginClick = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name, email }),
        credentials: "include",
      });

      onLogin();

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const onLogoutClick = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <p>Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Email</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={() => onLoginClick()}>Log In</button>
      <button onClick={() => onLogoutClick()}>Log Out</button>
    </>
  );
};

export default Login;
