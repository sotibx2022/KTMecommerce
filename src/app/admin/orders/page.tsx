'use client'
import React, { useContext, useState, useRef, useEffect, useMemo } from 'react'
import TotalOrders from './ordersComponents/TotalOrders'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { fetchAllOrders } from '@/app/services/queryFunctions/allOrders'
import { IOrderDetails, OrderDetailsProps } from '@/app/types/orders'
import { DateFormator } from '@/app/services/helperFunctions/functions'
import { Save, ShoppingCart } from 'lucide-react'
import SelectStatus from './ordersTableComponents/SelectStatus'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { DisplayContext } from '@/app/context/DisplayComponents'
import { Provider } from 'react-redux'
import store from '@/app/redux/store'
import SkeletonOrdersTable from './ordersComponents/SkeletonOrdersTable'
import NoData from '@/app/_components/noData/NoData'
import { ThemeProviderContext } from '@/app/context/ThemeProvider'
import DynamicOrderData from './ordersComponents/DynamicOrderData'
import { useScreenWidth } from '@/app/services/helperFunctions/findScreenWidth'
import { useSidebar } from '@/components/ui/sidebar'
import FilterbyOrderStatus from './ordersTableComponents/FilterbyOrderStatus'
import Navigation from '../components/Navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import OrderDetails from '@/app/_components/orderDetails/OrderDetails'
const Page = () => {
  const [statusValue, setStatusValue] = useState('')
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";
  const screenWidth = useScreenWidth();
  const themeContext = useContext(ThemeProviderContext);
  if (!themeContext) {
    throw new Error("Theme Context is not Defined here")
  }
  const { theme } = themeContext
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const [orderDetails, setOrderDetails] = useState<null | OrderDetailsProps>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const router = useRouter()
  const queryString = useMemo(() => {
    return `/api/allOrders?orderStatus=${statusValue}&pageNumber=${pageNumber}`
  }, [statusValue, pageNumber])
  const { data: orderResult, isPending } = useQuery({
    queryKey: ['allOrders', queryString],
    queryFn: () => fetchAllOrders(queryString)
  })
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  function handleDisplayOrderDetails(order: OrderDetailsProps) {
    setOrderDetails(order)
  }
  const successResult = orderResult?.success;
  const orders = successResult && orderResult.data;
  const pagination = successResult && orderResult.pagination
  return (
    <div className={`ml-4 tableContainer`} ref={tableWrapperRef}
      style={{
        maxWidth: isCollapsed ? "85vw" : "70vw",
      }}>
      <Provider store={store}>
        <div
          className={
            tableWrapperRef.current?.clientWidth &&
              tableRef.current?.clientWidth &&
              tableWrapperRef.current.clientWidth > tableRef.current.clientWidth
              ? "overflow-x-hidden w-full "
              : `overflow-x-auto w-full`
          }
        >
          <TotalOrders />
          <div>
            <Table
              ref={tableRef}
              className={`${theme === "dark" ? "table darkTable" : "lightTable"} my-4 w-[90%]`}
            >
              <TableHeader>
                <TableRow>
                  <TableHead><DynamicOrderData text='SN' /></TableHead>
                  <TableHead><DynamicOrderData text='Order#' /></TableHead>
                  <TableHead><DynamicOrderData text='Recipient Email' /></TableHead>
                  <TableHead>
                    <FilterbyOrderStatus selectedStatusValue={function (value: string): void {
                      setStatusValue(value)
                    }} />
                  </TableHead>
                  <TableHead><DynamicOrderData text='Total Items' /></TableHead>
                  <TableHead><DynamicOrderData text='Total Cost' /></TableHead>
                  <TableHead><DynamicOrderData text='Created At' /></TableHead>
                  <TableHead><DynamicOrderData text='View Order' /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending ? (
                  <SkeletonOrdersTable />
                ) : (
                  orders &&
                  orders.map((order: IOrderDetails, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="min-w-[50px]">
                        <DynamicOrderData text={(index + 1).toString()} />
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                          <DynamicOrderData text={order._id!.slice(-8).toUpperCase()} />
                        </h2>
                      </TableCell>
                      <TableCell className="min-w-[50px]">
                        <DynamicOrderData text={order.shippingPerson.email} />
                      </TableCell>
                      <TableCell className="min-w-[150px]">
                        <SelectStatus status={order.status} orderId={order._id!} />
                      </TableCell>
                      <TableCell className="min-w-[100px]">
                        <DynamicOrderData text={order.orderSummary.totalItems.toString()} />
                      </TableCell>
                      <TableCell className="min-w-[100px]">
                        <DynamicOrderData text={order.orderSummary.grossTotal.toString()} />
                      </TableCell>
                      <TableCell className="min-w-[150px]">
                        <DynamicOrderData text={DateFormator(order.createdAt!)} />
                      </TableCell>
                      <TableCell className="min-w-[100px]">
                        <Button onClick={() => handleDisplayOrderDetails(order)}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {pagination && <Navigation pagination={pagination} selectedPageNumber={(pageNumber: number) => {
              setPageNumber(pageNumber)
            }} />}
          </div>
        </div>
        {orderDetails && <div className='absolute top-0 left-0 w-full h-auto z-40 flex justify-center items-center'
          style={{ background: "var(--gradientwithOpacity)" }}>
          <div className="OrderDetailsWrapper max-w-[500px] relative mt-4 overflow-y-auto">
            <FontAwesomeIcon
              icon={faTimes}
              className="text-background bg-helper w-[30px] h-[30px] z-50 absolute top-3 right-3 cursor-pointer rounded-full p-1"
              onClick={() => setOrderDetails(null)}
            />
            <OrderDetails order={orderDetails} expandAble={false} />
          </div>
        </div>}
      </Provider>
    </div>
  )
}
export default Page