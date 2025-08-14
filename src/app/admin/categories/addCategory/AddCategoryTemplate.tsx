"use client"
import React from 'react'
import ImageUpload from '../../components/productForm/ImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
const AddCategoryTemplate = () => {
  const getUploadedImage = (file: File) => {
    // handle uploaded file
  }
  return (
    <div className="addCategoryTemplate mt-4 card">
      <Card className='card'>
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category Image Upload */}
          <div className="categoryImageUpload">
            <ImageUpload action={'add'} uploadImage={getUploadedImage} text="Category" />
          </div>
          {/* Category Form */}
          <section className="addCategoryForm flex flex-col gap-4">
            <div className="categoryNameInputArea">
              <label className="formLabel">Category Name</label>
              <input type="text" placeholder="e.g., Mobile" className="formItem" />
            </div>
            <div className="categoryNameInputArea">
              <label className="formLabel">Meta Title</label>
              <input
                type="text"
                placeholder="e.g., Buy Mobile Phones Online – Best Deals"
                className="formItem"
              />
            </div>
            <div className="categoryNameInputArea">
              <label className="formLabel">Meta Description</label>
              <textarea
                placeholder="e.g., Shop the latest mobile phones online with best prices, offers, and free shipping."
                className="formItem"
              />
            </div>
            <div className="categoryNameInputArea">
              <label className="formLabel">Meta Keywords</label>
              <textarea
                placeholder="e.g., mobile phones, smartphones, Android, iPhone, budget phones"
                className="formItem"
              />
            </div>
          </section>
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="secondary">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
export default AddCategoryTemplate
