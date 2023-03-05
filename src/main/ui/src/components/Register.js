import { EMPTY_FUNCTION, closeWindow } from "../utils";
import Button from "./Button";

const handleSubmit = (e) => {
  e.preventDefault();

  closeWindow();
};

const Register = () => {
  return (
    <div className="">
      <form
        action="/createUser"
        method="POST"
        className="w-96 m-auto flex flex-col gap-5 mt-6"
        onSubmit={handleSubmit}
      >
        <h3>Registracija</h3>
        <input type="text" placeholder="Ime kompanije" name='name' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>
        <input type="text" placeholder="Korisničko ime" name='username' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>
        <input type="text" placeholder="Grad" name='city' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>
        <input type="email" placeholder="Mejl adresa" name='email' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>

		<textarea placeholder="O kompaniji" name='about' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>

        <input type="password" placeholder="Lozinka" className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>

        <Button
          text={"Registruj se"}
          className={"mr-2 my-4 bg-mint text-wht"}
          type="submit"
          onClick={EMPTY_FUNCTION}
        />
      </form>
    </div>
  );
};

export default Register;