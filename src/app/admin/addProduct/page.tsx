"use client"
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
const AddProduct = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="primaryHeading mb-6">Add New Product</h1>
      <form>
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
                      <span className="text-gray-500">Upload product image</span>
                      <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                    </div>
                    <Input 
                      id="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
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
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productDescription">Description</Label>
                      <Textarea 
                        id="productDescription" 
                        placeholder="Enter product description"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        step="0.01"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <Separator />
                  {/* Features */}
                  <div>
                    <Label>Features</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <Input 
                          placeholder="Feature 1"
                          className="flex-1"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                        >
                          Remove
                        </Button>
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                      >
                        Add Feature
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  {/* Categories and Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="categoryName">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="home">Home & Garden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subCategoryName">Subcategory</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phones">Phones</SelectItem>
                          <SelectItem value="laptops">Laptops</SelectItem>
                          <SelectItem value="t-shirts">T-Shirts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="variant">Variant</Label>
                      <Input 
                        id="variant" 
                        placeholder="Color, Size, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="stockQuantity">Stock Quantity</Label>
                      <Input 
                        id="stockQuantity" 
                        type="number" 
                      />
                    </div>
                  </div>
                  <Separator />
                  {/* Badges */}
                  <div className="space-y-4">
                    <Label>Product Tags</Label>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="isNewArrivals" />
                        <Label htmlFor="isNewArrivals">New Arrival</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="isTopSell" />
                        <Label htmlFor="isTopSell">Top Seller</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="isTrendingNow" />
                        <Label htmlFor="isTrendingNow">Trending</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="isOfferItem" />
                        <Label htmlFor="isOfferItem">On Offer</Label>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  {/* Status */}
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="draft">
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
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">
                  Add Product
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
export default AddProduct