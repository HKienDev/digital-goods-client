import { useState, useEffect, useCallback } from 'react';

interface ProductTypeSelectorProps {
  productTypes: string[];
  onProductTypeSelect?: (type: string) => void;
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({ productTypes, onProductTypeSelect }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeSelect = useCallback((type: string): void => {
    setSelectedType(type);
    if (onProductTypeSelect) {
      onProductTypeSelect(type);
    }
  }, [onProductTypeSelect]);

  useEffect(() => {
    if (productTypes && productTypes.length > 0 && !selectedType) {
      handleTypeSelect(productTypes[0]);
    }
  }, [productTypes, selectedType, handleTypeSelect]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-medium text-gray-900">Loại sản phẩm</h2>
      </div>
      {productTypes.length === 1 ? (
        <div>
          <button
            key={productTypes[0]}
            onClick={() => handleTypeSelect(productTypes[0])}
            className={`py-3 px-8 border rounded-md text-center font-medium transition-colors
              ${selectedType === productTypes[0]
                ? 'border-red-600 bg-red-50 text-red-600'
                : 'border-gray-300 hover:border-gray-400 text-gray-900'
              }`}
          >
            {productTypes[0]}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {productTypes.map((type, index) => (
            <button
              key={`${type}-${index}`}
              onClick={() => handleTypeSelect(type)}
              className={`py-3 border rounded-md text-center font-medium transition-colors
                ${selectedType === type 
                  ? 'border-red-600 bg-red-50 text-red-600' 
                  : 'border-gray-300 hover:border-gray-400 text-gray-900'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductTypeSelector; 