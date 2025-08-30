import { IProductDisplay } from '@/app/types/products'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import React from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import ProductAction from './ProductAction'
import { HandMetal } from 'lucide-react'
import { generateClassName } from '@/app/services/helperFunctions/generateClassNames'
import { Rupee } from '@/app/_components/productCard/Rupee'
interface ITableData {
    product: IProductDisplay,
    index: number,
    theme: "light" | "dark"
}
const TableData: React.FC<ITableData> = ({ product, index, theme }) => {
  const rowNumber = Number.isInteger(index) ? index + 1 : 1
  return (
    <TableRow className={`${generateClassName(theme)} hover:bg-primaryLight`}>
      <TableCell className={`${generateClassName(theme)}`}>
        {rowNumber}
      </TableCell>
      <TableCell className={`flex justify-center items-center h-[200px] ${generateClassName(theme)}`}>
        <img
          src={product.image}
          alt={product.brand}
          width={100}
          height={50}
          className="rounded"
          loading='lazy'
        />
      </TableCell>
      <TableCell className={`${generateClassName(theme)}`}>
        {product.productName}
      </TableCell>
      <TableCell className={`${generateClassName(theme)}`}>
        <Rupee/>{Number(product.price).toFixed(2)}
      </TableCell>
      <TableCell className={`${generateClassName(theme)}`}>
        <Badge variant={product.stockAvailability ? "success" : "failure"}>
          {product.stockAvailability ? "yes" : "No"}
        </Badge>
      </TableCell>
      <TableCell className={`${generateClassName(theme)}`}>
        {product.categoryName}
      </TableCell>
      <TableCell className={`${generateClassName(theme)}`}>
        {product.subCategoryName}
      </TableCell>
      <TableCell className={`${generateClassName(theme)}`}>
        <div className="highhlightsItems flex flex-col gap-1">
          {product.isNewArrivals && <Badge variant='default' className="flex justify-center items-center">New</Badge>}
          {product.isOfferItem && <Badge variant='default' className="flex justify-center items-center">Offer</Badge>}
          {product.isTopSell && <Badge variant='default' className="flex justify-center items-center">Top</Badge>}
          {product.isTrendingNow && <Badge variant='default' className="flex justify-center items-center">Trending</Badge>}
          {!product.isNewArrivals && !product.isOfferItem && !product.isTopSell && !product.isTrendingNow && (
            <Badge variant='outline' className="flex justify-center items-center">Regular</Badge>
          )}
        </div>
      </TableCell>
      <TableCell className={`${generateClassName(theme)}`}>
        <Badge variant="outline">
          <p>{product.overallRating}/5</p>
        </Badge>
      </TableCell>
      <TableCell className={`relative group p-0 hover:bg-muted/50 transition-colors ${generateClassName(theme)}`}>
        <div className="absoluteProductAction z-50 absolute inset-0 hidden group-hover:flex justify-center items-center bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm">
          <ProductAction 
            product={{
              _id: product._id,
              productName: product.productName
            }} 
            actions={['view','edit','delete']}
          />
        </div>
        <div className="h-full w-full p-4 flex items-center justify-center opacity-100 group-hover:opacity-20 transition-opacity">
          <HandMetal />
        </div>
      </TableCell>
    </TableRow>
  )
}
export default TableData