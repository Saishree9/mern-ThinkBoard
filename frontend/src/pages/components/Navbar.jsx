import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
import logo from "../../assets/logo2.png"

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center md:gap-5">
            <img src={logo} alt="" className="w-10"/>
            <h1 className="md:text-3xl text-xl font-bold text-primary font-mono tracking-tight">
              ThinkBoard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to={"/createNote"} className="btn btn-primary">
              <PlusIcon size={20} /> <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
