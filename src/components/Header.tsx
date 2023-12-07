import { UserNav } from "./UserNav";
import { Search } from "./SearchBar";
import { Navbar } from "./Navbar";

export default function Header() {
  return (
    <div className="border-b">
      <div className="flex h-20 items-center px-4">
        <Navbar className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
