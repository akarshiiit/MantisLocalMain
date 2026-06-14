// components/products/ProductCard.tsx

import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type ProductCardProps = {
id: number;
name: string;
category: string;
docs: number;
image: string;
};

function ProductCard({
id,
name,
category,
docs,
image,
}: ProductCardProps) {
return (
<Link
to={`/products/${id}`}
className="group overflow-hidden rounded-[28px] border border-[#E4E7EB] bg-white transition hover:-translate-y-1 hover:shadow-xl"
>


  {/* Image */}
  <div className="relative h-[260px] overflow-hidden">

    <img
      src={image}
      alt={name}
      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

    {/* Badge */}
    <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">

      AI Diagnostics

    </div>

  </div>

  {/* Content */}
  <div className="p-6">

    <div className="flex items-start justify-between gap-4">

      <div>

        <p className="text-sm text-[#7A8796]">
          {category}
        </p>

        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#111315]">
          {name}
        </h3>

      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E7EB] bg-[#F8F9FA] transition group-hover:bg-[#111315]">

        <ArrowUpRight className="h-4 w-4 text-[#111315] transition group-hover:text-white" />

      </div>

    </div>

    <div className="mt-6 flex items-center justify-between border-t border-[#ECEFF3] pt-5">

      <p className="text-sm text-[#5F6772]">
        {docs} Support Resources
      </p>

      <div className="h-2 w-2 rounded-full bg-[#7A8796]" />

    </div>

  </div>

</Link>


);
}

export default ProductCard;
