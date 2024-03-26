import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const PropertiesPage = () => {
  return (
    <div className="pt-20 text-zinc-50 px-4 pb-4">
      <Link href="/properties/new">
        <Button className="bg-neutral-50 text-zinc-900 hover:bg-neutral-300">
          Add property
        </Button>
      </Link>
    </div>
  );
};

export default PropertiesPage;
