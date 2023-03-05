import { EMPTY_FUNCTION, closeWindow } from "../utils";
import Button from "./Button";

const handleSubmit = (e) => {
  e.preventDefault();

  closeWindow();
};

const Login = () => {
  return (
    <div className="">
      <form
        action="/login"
        method="POST"
        className="w-96 m-auto flex flex-col gap-5 mt-20"
        onSubmit={handleSubmit}
      >
        <h3>Prijava</h3>
        <input type="text" placeholder="Korisničko ime" name="username" className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>
        <input type="password" placeholder="Lozinka" name="password" className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>

        <Button
          text={"Prijavi se"}
          className={"mr-2 bg-mint text-wht"}
          type="submit"
          onClick={EMPTY_FUNCTION}
        />
      </form>
    </div>
  );
};

export default Login;