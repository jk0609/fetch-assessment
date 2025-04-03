import { FormEvent, useContext } from "react";
import {
  Container,
  Label,
  LogInButton,
  LogInForm,
  Field,
  FormControl,
  Title,
} from "./LogIn.styles";
import { apiUrl } from "@Utils/config";
import AlertContext from "@StateManagement/Alert/AlertContext";

type Props = {
  onLogIn: () => void;
};

const LogIn = (props: Props) => {
  const { onLogIn } = props;

  const { dispatch } = useContext(AlertContext);

  const fetchLogIn = async (
    name: FormDataEntryValue | null,
    email: FormDataEntryValue | null
  ) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name, email }),
        credentials: "include",
      });

      if (response.status !== 200) {
        throw new Error("There was an error logging in");
      }

      onLogIn();
    } catch (err) {
      const error = err as Error;
      dispatch({
        type: "UPDATE_ERROR",
        payload: error.message,
      });
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    fetchLogIn(data.get("name"), data.get("email"));
  };

  return (
    <Container>
      <Title>Sign In</Title>
      <LogInForm onSubmit={onSubmit}>
        <FormControl>
          <Label htmlFor="name">Name</Label>
          <Field
            placeholder="Your Name"
            type="name"
            id="name"
            name="name"
            autoFocus
            required
          />
        </FormControl>
        <FormControl>
          <Label htmlFor="email">Email</Label>
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
          />
        </FormControl>
        <LogInButton type="submit">LogIn</LogInButton>
      </LogInForm>
    </Container>
  );
};

export default LogIn;
