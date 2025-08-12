import { TableBody, TableCell, TableRow } from "@/components/ui/table"
export default function UserTableSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, idx) => (
        <TableRow key={idx}>
          <TableCell>
            <div
              className="w-10 h-10 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--primaryLight)" }}
            ></div>
          </TableCell>
          <TableCell>
            <div
              className="h-4 w-32 rounded animate-pulse"
              style={{ backgroundColor: "var(--primary)" }}
            ></div>
          </TableCell>
          <TableCell>
            <div
              className="h-4 w-40 rounded animate-pulse"
              style={{ backgroundColor: "var(--primary)" }}
            ></div>
          </TableCell>
          <TableCell>
            <div
              className="h-4 w-12 rounded animate-pulse"
              style={{ backgroundColor: "var(--primary)" }}
            ></div>
          </TableCell>
          <TableCell>
            <div
              className="h-4 w-20 rounded animate-pulse"
              style={{ backgroundColor: "var(--primary)" }}
            ></div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
