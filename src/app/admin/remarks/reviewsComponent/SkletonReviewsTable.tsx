"use client"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
const SkeletonReviewsTable = () => {
    const rows = Array.from({ length: 5 })
    return (
        <TableBody>
            {rows.map((_, idx) => (
                <TableRow key={idx}>
                    <TableCell>
                        <div className="h-4 w-24 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="h-10 w-10 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
                            <div className="h-4 w-28 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="h-4 w-10 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
                    </TableCell>
                    <TableCell>
                        <div className="h-4 w-40 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
                    </TableCell>
                    <TableCell>
                        <div className="h-4 w-20 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
                    </TableCell>
                    <TableCell>
                        <div className="flex gap-2">
                            <div className="h-4 w-20 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
                            <div className="h-4 w-20 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}
export default SkeletonReviewsTable
