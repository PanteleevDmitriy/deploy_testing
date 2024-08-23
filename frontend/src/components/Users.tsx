import { IUser } from "../models";

interface UsersProps {
  users: IUser
}

export function Users(props: UsersProps) {
  return (
    <div>
      <p>{props.users.id}</p>
      <p>{props.users.email}</p>
      <br></br>
    </div>
  );
};