export interface Remark {
    _id?: string; // MongoDB auto-generated ID (optional for interface use)
    productId: string; // ID of the associated product
    rating: number; // Rating for the product
    reviewedBy: string; // Name of the reviewer
    reviewerImage: string; // URL to the reviewer's image
    reviewDescription: string; // Textual review
    createdAt: Date; // Timestamp for when the review was created
    updatedAt: Date; // Timestamp for when the review was last updated
  }
