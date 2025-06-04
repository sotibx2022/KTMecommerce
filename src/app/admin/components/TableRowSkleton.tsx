import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
export const TableRowSkleton = ({ rowNumber }: { rowNumber: number }) => {
  return (
    <>
    {Array.from({length:rowNumber}).map((_,index)=>{
        return <TableRow key={index}>
      <TableCell>
        <Skeleton className="h-6 w-6 rounded-full" />
      </TableCell>
      <TableCell className="flex justify-center items-center">
        <Skeleton className="h-[150px] w-[100px] rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-12" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-24" />
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-16" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-12" />
      </TableCell>
      <TableCell>
        <div className="flex items-center flex-wrap justify-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </TableCell>
    </TableRow>
    })}</>
  );
};