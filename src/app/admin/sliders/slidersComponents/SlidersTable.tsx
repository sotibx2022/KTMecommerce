"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import SliderTableSkeleton from './SliderTableSkeleton'
import { useSlidersData } from '@/app/hooks/queryHooks/useSlidersData'
import { IDisplaySlideItems } from '@/app/types/sliders'
import Link from 'next/link'
import { Edit, Trash } from 'lucide-react'
import { useWindowSize } from 'react-use'
const SlidersTable = () => {
    const {width} =useWindowSize()
    const { data: slidersData, isPending } = useSlidersData();
    function deleteHandler(_id: any): void {
        throw new Error('Function not implemented.')
    }
    return (
        <div className={width>800?"w-full overflow-x-hidden":"overflow-x-auto"}>
            {isPending ? (
                <SliderTableSkeleton />
            ) : (
                <div className="">
                    <Table className="w-[800px]">
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
                            {slidersData.map((sliderItem: IDisplaySlideItems, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <img
                                            src={sliderItem.sliderImage}
                                            alt={sliderItem.sliderTitle}
                                            className="w-full h-full object-cover"
                                        />
                                    </TableCell>
                                    <TableCell>{sliderItem.sliderSlogan}</TableCell>
                                    <TableCell>{sliderItem.sliderTitle}</TableCell>
                                    <TableCell>
                                        <div className="actionButtons flex w-full h-full justify-between items-center">
                                            <Link href={`/admin/sliders/editSlider/sliderIdentifier?sliderId=${sliderItem._id!.toString()}`}>
                                                <button className="p-2 rounded-md bg-green-500 hover:bg-green-600 transition-colors">
                                                    <Edit size={18} className="text-green-200 cursor-pointer" />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => deleteHandler(sliderItem._id!.toString())}
                                                className="p-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors"
                                            >
                                                <Trash size={18} className="text-red-200" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
export default SlidersTable