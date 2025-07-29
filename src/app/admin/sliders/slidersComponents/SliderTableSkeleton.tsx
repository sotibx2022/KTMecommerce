import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
const SliderTableSkeleton = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="min-w-[50px]">SN</TableHead>
                    <TableHead className="min-w-[200px]">Slider Image</TableHead>
                    <TableHead className="min-w-[200px]">Slider Slogan</TableHead>
                    <TableHead className="min-w-[200px]">Slider Title</TableHead>
                    <TableHead className="min-w-[100px]">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                        <TableCell className="animate-pulse">
                            <div className="h-6 w-full bg-backgroundLight rounded"></div>
                        </TableCell>
                        <TableCell className="animate-pulse">
                            <div className="h-20 w-full bg-backgroundLight rounded"></div>
                        </TableCell>
                        <TableCell className="animate-pulse">
                            <div className="h-6 w-full bg-backgroundLight rounded"></div>
                        </TableCell>
                        <TableCell className="animate-pulse">
                            <div className="h-6 w-full bg-backgroundLight rounded"></div>
                        </TableCell>
                        <TableCell className=" animate-pulse">
                            <div className="actinsWrapper flex justify-between items-center w-full h-full gap-4">
                                <div className="h-6 w-full bg-red-500 rounded"></div>
                            <div className="h-6 w-full bg-blue-500 rounded"></div>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
export default SliderTableSkeleton