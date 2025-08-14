import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
interface AddItemButtonProps {
  item: string; // e.g., "category", "product"
  href: string; // optional custom href
}
const AddItemButton: React.FC<AddItemButtonProps> = ({ item, href }) => {
  return (
    <Link href={href}>
      <Button
        variant="success"
        size="default"
        className="gap-2"
        aria-label={`Add ${item}`}
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">Add {item}</span>
      </Button>
    </Link>
  );
};
export default AddItemButton;
