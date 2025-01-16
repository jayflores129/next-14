"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListFilter } from "lucide-react";

export default function FilterButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-[30px]" variant={"outline"}>
          <ListFilter width={20} height={20} />
          <span>Advance Filter</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Advance Filter</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant={"outline"}>
            Cancel
          </Button>
          <Button type="button">Filter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
