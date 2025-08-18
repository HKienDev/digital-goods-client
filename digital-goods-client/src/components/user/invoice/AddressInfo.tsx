interface StoreAddress {
  name: string;
  phone: string;
  address: string[];
}

export default function AddressInfo({ storeAddress }: { storeAddress: StoreAddress }) {
  if (!storeAddress) return null;
  return (
    <div className="mb-4">
      <div className="font-semibold">{storeAddress.name}</div>
      <div className="text-sm text-gray-600">Số tham chiếu: {storeAddress.phone}</div>
      <div className="text-sm text-gray-600">
        {storeAddress.address.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
} 