// components/layout/Navbar.tsx

import { Link } from "react-router-dom";

function Navbar() {
return ( <nav className="sticky top-0 z-50 border-b border-[#D8DCE2] bg-[#F5F5F3]/80 backdrop-blur-xl">


  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

    {/* Logo */}
    <Link
      to="/"
      className="text-xl font-semibold tracking-tight text-[#111315]"
    >
      Mantis
    </Link>

    {/* Navigation */}
    <div className="hidden items-center gap-8 md:flex">

      <Link
        to="/products"
        className="text-sm font-medium text-[#5F6772] transition hover:text-[#111315]"
      >
        Products
      </Link>

      <Link
        to="/"
        className="text-sm font-medium text-[#5F6772] transition hover:text-[#111315]"
      >
        Diagnostics
      </Link>

      <Link
        to="/"
        className="text-sm font-medium text-[#5F6772] transition hover:text-[#111315]"
      >
        Resources
      </Link>

      <Link
        to="/"
        className="text-sm font-medium text-[#5F6772] transition hover:text-[#111315]"
      >
        Company
      </Link>

    </div>

    {/* CTA */}
    <Link
        to="/"
        className="text-sm font-medium text-[#5F6772] transition hover:text-[#111315]"
      >
    <button className="rounded-full border border-[#D8DCE2] bg-white px-5 py-2 text-sm font-medium text-[#111315] shadow-sm transition hover:bg-[#F0F2F4]">
      Start Diagnosis
    </button></Link>

  </div>

</nav>


);
}

export default Navbar;
