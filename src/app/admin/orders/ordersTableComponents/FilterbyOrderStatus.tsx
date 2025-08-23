"use client"
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectValue,
    SelectContent,
    SelectTrigger,
    SelectItem,
} from '@/components/ui/select'
interface IFilterByOrderStatusProps {
    selectedStatusValue: (value: string) => void;
}
const FilterbyOrderStatus: React.FC<IFilterByOrderStatusProps> = ({ selectedStatusValue }) => {
    const [statusValue, setStatusValue] = useState("")
    const orderStatuses = ['ordered', 'pending', 'confirmed', 'delivered', 'cancelled', "Paid", "Unpaid"] as const
    useEffect(() => {
        if (statusValue) {
            selectedStatusValue(statusValue)
        }
    }, [statusValue])
    return (
        <Select
            value={statusValue}
            onValueChange={(val) => setStatusValue(val)}
        >
            <SelectTrigger className="w-[150px] text-primaryDark">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                {orderStatuses.map((s) => (
                    <SelectItem key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
export default FilterbyOrderStatus
