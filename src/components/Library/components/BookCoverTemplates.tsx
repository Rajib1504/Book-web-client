import { useEffect, useState } from "react";
import { ArrowRight, CheckIcon, Sparkles } from "lucide-react";

// import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import HeadingGenerator from "../../../utils/HeadingGenerator";
import { Button } from "../../ui/button";

export default function BookCoverTemplates() {
  const [data, setData] = useState<{ url: string; id: string }[]>([]);
  //   console.log(data);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const response = await fetch("/BookCover.json");
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  return (
    <>
      <section className="p-8">
        <HeadingGenerator
          heading="Book Cover Templates"
          subtitle="Professional book cover designs ready to customize in Canva"
        />
        <Dialog>
          <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3  ">
            {loading && "Loading..."}
            {data?.map((item) => (
              <DialogTrigger asChild>
                <div
                  key={item?.id}
                  className="group rounded-lg cursor-pointer relative overflow-hidden"
                >
                  <img
                    src={item.url}
                    alt=""
                    className="rounded-lg group-hover:scale-105 group-hover:brightness-75 transation-all duration-300 hover:overlay hover:bg-background"
                  />
                  <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <p className="text-primary-foreground text-lg font-semibold opacity-0 group-hover:opacity-100 lg:text-nowrap text-center transition-opacity duration-300 px-4 py-4 rounded ">
                      Upgrade to use
                    </p>
                  </div>
                </div>
              </DialogTrigger>
            ))}
          </section>
          <DialogContent className="sm:max-w-lg text-black">
            {/* Pro Tool Header */}
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-red-500" />
              <span className="font-semibold text-red-500">Pro Tool</span>
            </div>

            {/* Title and Description */}
            <DialogHeader className="p-0 text-left items-start">
              <DialogTitle className="text-3xl font-bold text-black">
                Unlock Book Cover Templates
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600 pt-2">
                Access your complete library of professional book cover
                templates and customize them in Canva.
              </DialogDescription>
            </DialogHeader>

            {/* New Feature List */}
            <ul className="space-y-3 py-4">
              <li className="flex items-center gap-3">
                <CheckIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                <span className="text-base text-gray-700">
                  120+ professional book cover designs
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                <span className="text-base text-gray-700">
                  Direct Canva template access for easy customization
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                <span className="text-base text-gray-700">
                  1,000+ PLR products inside the Master Library
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                <span className="text-base text-gray-700">
                  20+ new premium products added every week
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                <span className="text-base text-gray-700">
                  Digital Product University packed with expert strategies
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                <span className="text-base text-gray-700">
                  Digital Product Toolkit to supercharge your growth
                </span>
              </li>
            </ul>

            {/* New Buttons */}
            <div className="flex flex-col gap-2">
              <Button
                size="lg"
                className="w-full flex gap-3 bg-red-600 hover:bg-red-700 text-white text-base py-3"
              >
                Get Access
                <ArrowRight className="h-5 w-5" />
              </Button>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="w-full text-base text-gray-600 hover:text-black"
                >
                  Maybe later
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
}
