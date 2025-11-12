import { ChevronsUpDown, Search } from "lucide-react";
import HeadingGenerator from "../../../utils/HeadingGenerator";
import { Input } from "../../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const LibraryHome = () => {
  const Tags = [
    "digital marketing",
    "content marketing",
    "personal development",
    "lead generation",
    "startups",
    "productivity",
    "mindset",
  ];
  return (
    <div className="p-8 overflow-y-auto h-screen ">
      <HeadingGenerator
        heading="Resource Library"
        subtitle="Browse our collection of entrepreneurial resources, tools, and templates"
      />
      <section className="border-2 space-y-7">
        <h1 className="max-w-3xl text-center mx-auto font-bold text-3xl md:text-5xl">
          Discover Digital Products That Grow Your Bussiness
        </h1>
        <section className=" mx-auto max-w-5xl grid grid-cols-6 gap-1">
          <div className="relative col-span-4 ">
            <div className="absolute left-2 top-3 text-gray-400 flex gap-2">
              <Search />
              <p>Search Product...</p>
            </div>
            <Input type="search" className="h-12 rounded-full " />
          </div>
          <div className="relative col-span-2 ">
            <div className="absolute left-2 top-3 text-gray-400 flex gap-2">
              <Search className="text-red-400" />
              <p>Search Category...</p>
            </div>
            <Input type="search" className="h-12 rounded-full " />
          </div>
        </section>

        <section className="">
          <div className="grid grid-cols-4 gap-1 max-w-sm text-muted-foreground">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  id="filter by tag"
                  className=" col-span-2 p-2 border rounded-full flex justify-between items-center hover:bg-muted-foreground/10  "
                >
                  {" "}
                  <p className="">Filter by tag</p>
                  <ChevronsUpDown />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-[240px] mb-2 overflow-y-auto"
                side="bottom"
                align="start"
                sideOffset={8}
              >
                {Tags.map((tag, id) => (
                  <DropdownMenuItem key={id}>{tag}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div
              id="filter by tag"
              className=" col-span-2 p-2 border rounded-full flex justify-between items-center hover:bg-muted-foreground/10"
            >
              {" "}
              <p className="">Filter by tag</p>
              <ChevronsUpDown />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default LibraryHome;
