import { IProductDisplay } from '@/app/types/products'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
interface ITableData{
    product:IProductDisplay,
    index:number
}
const TableData:React.FC<ITableData> = ({product,index}) => {
  const rowNumber = Number.isInteger(index) ? index + 1 : 1
  return (
         <TableRow>
              <TableCell>
                {rowNumber}
              </TableCell>
              <TableCell className='flex justify-center items-center'>
                <img
                  src={product.image}
                  alt={product.brand}
                  width={100}
                  height={50}
                  className="rounded"
                />
              </TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>${Number(product.price).toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={product.stockAvailability ? "success" : "failure"}>
                  {product.stockAvailability ? "yes" : "No"}
                </Badge>
              </TableCell>
              <TableCell>{product.categoryName}</TableCell>
              <TableCell>{product.subCategoryName}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {product.isNewArrivals && <Badge variant='default' className="flex justify-center items-center">New</Badge>}
                {product.isOfferItem && <Badge variant='default' className="flex justify-center items-center">Offer</Badge>}
                {product.isTopSell && <Badge variant='default' className="flex justify-center items-center">Top</Badge>}
                {product.isTrendingNow && <Badge variant='default'className="flex justify-center items-center">Trending</Badge>}
                {!product.isNewArrivals && !product.isOfferItem && !product.isTopSell && !product.isTrendingNow && <Badge variant='outline' className="flex justify-center items-center">Regular</Badge>}
                </div>
              </TableCell>
              <TableCell >
                <Badge className="" variant ="outline">
                    <p>{product.overallRating}/5</p>
                </Badge>
              </TableCell>
              <TableCell className="">
  <div className="flex items-center flex-wrap justify-center gap-2">
    <button className="text-blue-500 hover:text-blue-700">
    <FaEye size={18} />
  </button>
  <button className="text-green-500 hover:text-green-700">
    <FaEdit size={18} />
  </button>
  <button className="text-red-500 hover:text-red-700">
    <FaTrash size={18} />
  </button>
  </div>
</TableCell>
            </TableRow>
  )
}
export default TableData