"use client"
import { AbsoluteComponent } from '@/app/_components/absoluteComponent/AbsoluteComponent';
import { Button } from '@/components/ui/button';
import { config } from '@/config/configuration';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Copy, Share2, Gift, Calendar, Lock, AlertCircle } from 'lucide-react';
import { useState } from 'react';
const PublicWishlist = () => {
  const [copied, setCopied] = useState(false);
  const pageUrl = `${config.websiteUrl}/pages/publicwishlist/token?wishlistCollectionToken`;
  const { data: publicWishlistToken, isPending } = useQuery({
    queryKey: ['publicWishlistToken'],
    queryFn: async () => {
      const response = await axios.get('/api/wishList/wishlistToken');
      return response.data;
    },
  });
  const fullLink = isPending ? '' : `${pageUrl}=${publicWishlistToken?.data}`;
  const copyToClipboard = () => {
    if (!fullLink) return;
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const shareWishlist=() =>{
    throw new Error('Function not implemented.');
  }
  return (
    <>
    <AbsoluteComponent>
      <div>
        <h2 className="subHeading">
          <Gift className="w-10 h-10" />
          Share Your Wishlist
        </h2>
        <div className="mb-4">
          <label className="primaryParagraph">
            Shareable Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={isPending ? 'Generating your unique link...' : fullLink}
              className={`formItem ${isPending ? 'animate-pulse' : ''}`}
            />
            <div className="linkAction flex gap-2">
              <Button
              onClick={copyToClipboard}
              disabled={isPending}
              variant={'helper'}
            >
              {copied ? '✓' : <Copy className="w-4 h-4" />}
            </Button>
            <Button
              onClick={shareWishlist}
              disabled={isPending}
              variant={'success'}
            >
              <Share2 className="w-4 h-4"/>
            </Button>
            </div>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="">
            <AlertCircle className="w-4 h-4 inline-flex text-primaryDark mr-1" />
            <span className='primaryParagraph'>Share this link with friends/family so they can order items for you. this link is valid for one week.</span>
          </div>
        </div>
      </div>
    </AbsoluteComponent>
    </>
  );
};
export default PublicWishlist;