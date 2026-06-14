// components/layout/Footer.tsx

function Footer() {
return ( <footer className="border-t border-[#E4E7EB] bg-[#F5F5F3]">


  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-sm text-[#7A8796] md:flex-row">

    <div>

      <h3 className="text-lg font-semibold text-[#111315]">
        Mantis
      </h3>

      <p className="mt-2">
        AI-powered product diagnostics platform.
      </p>

    </div>

    <div className="flex items-center gap-8">

      <button className="transition hover:text-[#111315]">
        Products
      </button>

      <button className="transition hover:text-[#111315]">
        Diagnostics
      </button>

      <button className="transition hover:text-[#111315]">
        Resources
      </button>

      <button className="transition hover:text-[#111315]">
        Company
      </button>

    </div>

  </div>

</footer>


);
}

export default Footer;
