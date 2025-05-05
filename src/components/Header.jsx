import NavUser from "./NavUser";
import { ToggleTheme } from "./ToggleTheme";

export default function Header() {
  return (
    <header className="py-2 flex items-center justify-between px-8 bg-card border-b">
      <div className="font-light">DocsTogether</div>
      <div className="flex items-center gap-4">
        <ToggleTheme />
        <NavUser />
      </div>
    </header>
  );
}
