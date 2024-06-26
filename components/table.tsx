"use client";

import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "./ui/checkbox";
import { MinusCircledIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TriangleDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { DropdownItem, table } from "@/app/lib";

const dropdownItems: DropdownItem[] = [
  { label: "Backpack", value: "backpack", className: "bg-red-200" },
  { label: "Suitcase", value: "suitcase", className: "bg-green-200" },
  { label: "Toiletries", value: "toiletries", className: "bg-blue-200" },
];

export default function Table({
  data,
  onCheckboxChange,
  removeRow,
  onBagChange,
}: table) {
  return (
    <div className="h-screen border-r border-gray-200 w-screen">
      <TableUI>
        <TableHeader>
          <TableRow>
            <TableHead>Bag</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Packed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry: any, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={
                        entry.bag === "backpack"
                          ? "bg-red-200"
                          : entry.bag === "suitcase"
                          ? "bg-green-200"
                          : "bg-blue-200"
                      }
                    >
                      {entry.bag}
                      <TriangleDownIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {dropdownItems.map((dropdownItem) => (
                      <DropdownMenuCheckboxItem
                        key={entry.bag}
                        checked={entry.bag === dropdownItem.value}
                        onCheckedChange={() =>
                          onBagChange(index, dropdownItem.value)
                        }
                        className={dropdownItem.className}
                      >
                        {dropdownItem.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>{entry.item}</TableCell>
              <TableCell>
                <Checkbox
                  checked={entry.packed}
                  onCheckedChange={() => onCheckboxChange(index)}
                />
              </TableCell>
              <TableCell className="pt-3.5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <MinusCircledIcon
                        className="h-4 w-4 cursor-pointer"
                        onClick={() => removeRow(index)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>click to delete row</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableUI>
    </div>
  );
}
