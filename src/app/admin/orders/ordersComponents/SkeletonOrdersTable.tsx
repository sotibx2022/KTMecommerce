import {TableRow, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
const SkeletonOrdersTable = () => {
  // Number of skeleton rows to show
  const skeletonRows = 5;
  return (
    <>
      {Array.from({ length: skeletonRows }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="min-w-[50px]">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="min-w-[120px]">
            <Skeleton className="h-8 w-[80%]" />
          </TableCell>
          <TableCell className="min-w-[200px]">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="min-w-[150px]">
            <Skeleton className="h-6 w-[60%]" />
          </TableCell>
          <TableCell className="min-w-[100px]">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="min-w-[100px]">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="min-w-[150px]">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="min-w-[100px]">
            <Skeleton className="h-10 w-[60%]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
export default SkeletonOrdersTable;