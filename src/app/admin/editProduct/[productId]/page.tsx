"use client"
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getSingleProduct } from '@/app/services/queryFunctions/products'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
const EditProduct = () => {
  const searchParams = useSearchParams()
  const [productId] = useState<string>(searchParams.get('productId') ?? "")
  const { data: productDatas, isPending, error } = useQuery({
    queryKey: ['specificProduct', productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId
  })
  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error loading product</div>
  if (!productDatas?.success) return <h1 className="primaryHeading">Product not found</h1>
  const product = productDatas.data!
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="primaryHeading mb-6">Edit Product</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Upload Section */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="secondaryHeading font-bold">Product Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <img 
                      src={product.image} 
                      alt={product.productName}
                      className="mb-4 w-full h-auto rounded-lg object-cover max-h-48"
                    />
                    <p className="text-sm text-gray-500">Click to change image</p>
                  </div>
                  <Input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Product Details Form */}
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle className="secondaryHeading">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input 
                      id="productName" 
                      defaultValue={product.productName} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="productDescription">Description</Label>
                    <Textarea 
                      id="productDescription" 
                      defaultValue={product.productDescription} 
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      defaultValue={product.price} 
                    />
                  </div>
                </div>
                <Separator />
                {/* Features */}
                <div>
                  <Label>Features</Label>
                  <div className="space-y-2 mt-2">
                    {product.productFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input 
                          defaultValue={feature}
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="mt-2">
                      Add Feature
                    </Button>
                  </div>
                </div>
                <Separator />
                {/* Categories and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue={product.categoryName}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        {/* Add more categories as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subCategory">Subcategory</Label>
                    <Select defaultValue={product.subCategoryName}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phones">Phones</SelectItem>
                        <SelectItem value="laptops">Laptops</SelectItem>
                        {/* Add more subcategories as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="variant">Variant</Label>
                    <Input 
                      id="variant" 
                      defaultValue={product.variant} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    {/* <Input 
                      id="stock" 
                      type="number" 
                      defaultValue={product.stockAvailability} 
                    /> */}
                  </div>
                </div>
                <Separator />
                {/* Badges */}
                <div className="space-y-4">
                  <Label>Product Tags</Label>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="isNew" defaultChecked={product.isNewArrivals} />
                      <Label htmlFor="isNew">New Arrival</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="isTop" defaultChecked={product.isTopSell} />
                      <Label htmlFor="isTop">Top Seller</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="isTrending" defaultChecked={product.isTrendingNow} />
                      <Label htmlFor="isTrending">Trending</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="isOffer" defaultChecked={product.isOfferItem} />
                      <Label htmlFor="isOffer">On Offer</Label>
                    </div>
                  </div>
                </div>
                <Separator />
                {/* Status */}
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={product.status}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default EditProduct