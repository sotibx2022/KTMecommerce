import { IProductDisplay } from '@/app/types/products'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { IAddProductFormData } from './products'
import { validateConfirmPassword, validateNumber, validateSentence, validateWord } from '@/app/services/helperFunctions/validatorFunctions'
interface ProductDetailsFormProps {
    action: "edit" | "add",
    productDatas?: IProductDisplay
}
const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({ action, productDatas }) => {
    const { register, formState: { errors }, setValue } = useFormContext<IAddProductFormData>()
    useEffect(() => {
        if (productDatas) {
            (Object.keys(productDatas) as Array<keyof IAddProductFormData>).forEach((key) => {
                if (key in productDatas && productDatas[key] !== undefined) {
                    setValue(key, productDatas[key] as any);
                }
            });
        }
    }, [productDatas, setValue]);
    return (
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
                                    {...register('productName', {
                                        validate: (value) => validateSentence("ProductName", value, 10, 100)
                                    })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="productDescription">Description</Label>
                                <Textarea
                                    id="productDescription"
                                    placeholder="Enter product description"
                                    rows={4}
                                    {...register('productDescription', {
                                        validate: (value) => validateWord("Product Description", value, 100, 500)
                                    })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="price">Price ($)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...register('price', {
                                        validate: (value) => validateNumber("Price", value, 100, 10000)
                                    })}
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
                                    {...register("variant",{
                                        validate:(value)=>validateWord("Varient",value,10,20)
                                    })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                                <Input
                                    id="stockQuantity"
                                    type="number"
                                    {...register("remainingStock",{
                                        validate:(value)=>validateNumber("Remaining Stock",value,1,20)
                                    })}
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
    )
}
export default ProductDetailsForm