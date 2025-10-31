import { useEffect, useId, useState } from "react";
import { CheckIcon, RefreshCcwIcon } from "lucide-react";

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
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import HeadingGenerator from "../../../utils/HeadingGenerator";
import { Button } from "../../ui/button";

export default function BookCoverTemplates() {
  const id = useId();
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
          <section className="grid gird-cols-2 sm:grid-cols-6 gap-3  ">
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
                    <p className="text-primary-foreground text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-4 rounded ">
                      Upgrade to use
                    </p>
                  </div>
                </div>
              </DialogTrigger>
            ))}
          </section>
          <DialogContent>
            <div className="mb-2 flex flex-col gap-2">
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <RefreshCcwIcon className="opacity-80" size={16} />
              </div>
              <DialogHeader>
                <DialogTitle className="text-left">
                  Change your plan
                </DialogTitle>
                <DialogDescription className="text-left">
                  Pick one of the following plans.
                </DialogDescription>
              </DialogHeader>
            </div>

            <form className="space-y-5">
              <RadioGroup className="gap-2" defaultValue="2">
                {/* Radio card #1 */}
                <div className="relative flex w-full items-center gap-2 rounded-md border border-input px-4 py-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent">
                  <RadioGroupItem
                    value="1"
                    id={`${id}-1`}
                    aria-describedby={`${id}-1-description`}
                    className="order-1 after:absolute after:inset-0"
                  />
                  <div className="grid grow gap-1">
                    <Label htmlFor={`${id}-1`}>Essential</Label>
                    <p
                      id={`${id}-1-description`}
                      className="text-xs text-muted-foreground"
                    >
                      $4 per member/month
                    </p>
                  </div>
                </div>
                {/* Radio card #2 */}
                <div className="relative flex w-full items-center gap-2 rounded-md border border-input px-4 py-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent">
                  <RadioGroupItem
                    value="2"
                    id={`${id}-2`}
                    aria-describedby={`${id}-2-description`}
                    className="order-1 after:absolute after:inset-0"
                  />
                  <div className="grid grow gap-1">
                    <Label htmlFor={`${id}-2`}>Standard</Label>
                    <p
                      id={`${id}-2-description`}
                      className="text-xs text-muted-foreground"
                    >
                      $19 per member/month
                    </p>
                  </div>
                </div>
                {/* Radio card #3 */}
                <div className="relative flex w-full items-center gap-2 rounded-md border border-input px-4 py-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent">
                  <RadioGroupItem
                    value="3"
                    id={`${id}-3`}
                    aria-describedby={`${id}-3-description`}
                    className="order-1 after:absolute after:inset-0"
                  />
                  <div className="grid grow gap-1">
                    <Label htmlFor={`${id}-3`}>Enterprise</Label>
                    <p
                      id={`${id}-3-description`}
                      className="text-xs text-muted-foreground"
                    >
                      $32 per member/month
                    </p>
                  </div>
                </div>
              </RadioGroup>

              <div className="space-y-3">
                <p>
                  <strong className="text-sm font-medium">
                    Features include:
                  </strong>
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckIcon
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Create unlimited projects.
                  </li>
                  <li className="flex gap-2">
                    <CheckIcon
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Remove watermarks.
                  </li>
                  <li className="flex gap-2">
                    <CheckIcon
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Add unlimited users and free viewers.
                  </li>
                  <li className="flex gap-2">
                    <CheckIcon
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Upload unlimited files.
                  </li>
                  <li className="flex gap-2">
                    <CheckIcon
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    7-day money back guarantee.
                  </li>
                  <li className="flex gap-2">
                    <CheckIcon
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Advanced permissions.
                  </li>
                </ul>
              </div>

              <div className="grid gap-2">
                <Button type="button" className="w-full">
                  Change plan
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="ghost" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
}
