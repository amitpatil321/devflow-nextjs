import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export const MobileNav = () => {
  return (
    <section className="bg-light-900 dark:bg-dark-200">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/assets/icons/hamburger.svg"
            width={36}
            height={36}
            alt="Menu"
            className="invert-colors sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-white">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">Hello world</div>
          <SheetFooter>
            <SheetClose asChild>Footer</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </section>
  );
};
