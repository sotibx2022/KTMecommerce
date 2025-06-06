"use client"
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query';
import { getSingleProduct } from '@/app/services/queryFunctions/products';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DateFormator } from '@/app/services/helperFunctions/functions';
import { ArrowBigRight, Link, List } from 'lucide-react';
import SecondaryButton from '@/app/_components/secondaryButton/SecondaryButton';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ProductAction from '../../components/ProductAction';
import { Calendar } from '@/components/ui/calendar';
import ProductDetailsSkeleton from '../../components/ProductDetailsSkeleton';
const Page = () => {
  const searchParams = useSearchParams();
  const [productId] = useState<string>(searchParams.get('productId') ?? "");
  const { data: productDatas, isPending, error } = useQuery({
    queryKey: ['specificProduct', productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId
  });
  if (isPending) return <ProductDetailsSkeleton/>;
  if (error) return <div>Error loading product</div>;
  if (!productDatas.success) return <h1 className="primaryHeading">The Product Details are not available.</h1>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="secondaryHeading font-bold">Product Image</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={productDatas!.data!.image} 
                alt={productDatas!.data!.productName}
                className="w-full h-auto rounded-lg object-cover"
              />
            </CardContent>
          </Card>
        </div>
        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="primaryHeading">{productDatas!.data!.productName}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    {productDatas!.data!.isNewArrivals && <Badge variant="default">New Arrival</Badge>}
                    {productDatas!.data!.isTopSell && <Badge variant="default">Top Seller</Badge>}
                    {productDatas!.data!.isTrendingNow && <Badge variant="default">Trending</Badge>}
                    {productDatas!.data!.isOfferItem && <Badge variant="default">On Offer</Badge>}
                  </div>
                </div>
                <div className="price-highlight">${productDatas!.data!.price}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="secondaryHeading font-bold">Description</h3>
                  <p className="primaryParagraph">{productDatas!.data!.productDescription}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="secondaryHeading font-bold">Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
  {productDatas!.data!.productFeatures.map((feature: string, index: number) => (
    <li key={index} className="flex items-start gap-2 primaryParagraph">
      <ArrowBigRight className="w-4 h-4" />
      <span>{feature}</span>
    </li>
  ))}
</ul>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="secondaryHeading font-bold">Category</h3>
                    <Badge variant="outline">{productDatas!.data!.categoryName}</Badge>
                  </div>
                  <div>
                    <h3 className="secondaryHeading font-bold">Subcategory</h3>
                    <Badge variant="outline">{productDatas!.data!.subCategoryName}</Badge>
                  </div>
                  <div>
                    <h3 className="secondaryHeading font-bold">Variant</h3>
                    <p className="primaryParagraph">{productDatas!.data!.variant}</p>
                  </div>
                  <div>
                    <h3 className="secondaryHeading font-bold">Stock</h3>
                      {productDatas!.data!.stockAvailability ? (
                        <Badge variant="success">In Stock</Badge>
                      ) : (
                        <Badge variant="failure">Out of Stock</Badge>
                      )}
                  </div>
                  <div>
                    <h3 className="secondaryHeading font-bold">Status</h3>
                    <Badge variant={productDatas!.data!.status === 'active' ? 'success' : 'failure'}>
                      {productDatas!.data!.status}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="secondaryHeading font-bold">Created At</h3>
                    {productDatas.data?.createdAt && (
                      <p className="primaryParagraph">{DateFormator(productDatas!.data!.createdAt)}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="secondaryHeading font-bold">Updated At</h3>
                    {productDatas.data?.updatedAt && (
                      <p className="primaryParagraph">{DateFormator(productDatas!.data!.updatedAt)}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
<ProductAction product={{
                _id: productDatas.data!._id,
                productName: productDatas.data!.productName
              }} actions={['delete','edit']}/>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default Page;
