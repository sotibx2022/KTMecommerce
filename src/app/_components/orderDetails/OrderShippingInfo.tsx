interface ShippingInfoProps {
  shippingPerson: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
  };
}
export const ShippingInfo = ({ shippingPerson, shippingAddress }: ShippingInfoProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
    <div className="md:border-r md:border-helper md:pr-6">
      <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-primaryDark">
        Shipping Details
      </h3>
      <div className="space-y-1 md:space-y-2 text-sm md:text-base">
        <p className="text-primaryLight">
          {shippingPerson.firstName} {shippingPerson.lastName}
        </p>
        <p className="text-primaryLight">{shippingPerson.email}</p>
        <p className="text-primaryLight">{shippingPerson.phone}</p>
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-primaryDark">
        Shipping Address
      </h3>
      <div className="space-y-1 md:space-y-2 text-sm md:text-base">
        <p className="text-primaryLight">{shippingAddress.street}</p>
        <p className="text-primaryLight">
          {shippingAddress.city}, {shippingAddress.state}
        </p>
      </div>
    </div>
  </div>
);