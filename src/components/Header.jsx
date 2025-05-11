import { useSelector } from "react-redux";
import NavUser from "./NavUser";
import { ToggleTheme } from "./ToggleTheme";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  return (
    <header className="py-2 flex items-center justify-between px-8 bg-card border-b">
      <div className="font-light">DocsTogether</div>
      <div className="flex items-center gap-4">
        <ToggleTheme />
        <NavUser user={user} />
      </div>
    </header>
  );
}
