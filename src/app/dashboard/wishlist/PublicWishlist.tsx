"use client"
import { Button } from '@/components/ui/button';
import { config } from '@/config/configuration';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Aperture, Copy, Share } from 'lucide-react';
const PublicWishlist = () => {
  const { data: publicWishlistToken, isPending, refetch } = useQuery({
    queryKey: ['publicWishlistToken'],
    queryFn: async () => {
      const response = await axios.get('/api/wishList/wishlistToken');
      return response.data;
    },
    enabled: false, 
  });
  return (
    <div>
      <Button onClick={() => refetch()}>Public</Button>
      <div>{isPending?<span>Link is generating</span>:<span>{config.websiteUrl}/pages/publicwishlist/token?wishlistCollectionToken={publicWishlistToken.data}</span>}
      <Copy/>
      <Share/>
      <Aperture/>
      </div>
      <Button>Visit the link</Button>
    </div>
  );
};
export default PublicWishlist