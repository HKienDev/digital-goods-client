import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, Ruler, Palette, AlertCircle } from "lucide-react";
import { ProductFormData } from "@/types/product";
import { useState } from "react";
import { toast } from "sonner";

interface SizeColorFormProps {
  formData: ProductFormData;
  onFieldChange: (field: keyof ProductFormData, value: string[] | boolean) => void;
}

export default function SizeColorForm({
  formData,
  onFieldChange,
}: SizeColorFormProps) {
  const [newProductType, setNewProductType] = useState("");
  const [newDuration, setNewDuration] = useState("");

  // Đảm bảo productTypes và durations là mảng
  const productTypes = Array.isArray(formData.productTypes) ? formData.productTypes : [];
  const durations = Array.isArray(formData.durations) ? formData.durations : [];

  const handleAddProductType = () => {
    if (!newProductType.trim()) return;
    
    if (productTypes.includes(newProductType.trim())) {
      toast.error('Loại sản phẩm này đã tồn tại');
      return;
    }

    onFieldChange('productTypes', [...productTypes, newProductType.trim()]);
    setNewProductType("");
  };

  const handleAddDuration = () => {
    if (!newDuration.trim()) return;
    
    if (durations.includes(newDuration.trim())) {
      toast.error('Thời hạn này đã tồn tại');
      return;
    }

    onFieldChange('durations', [...durations, newDuration.trim()]);
    setNewDuration("");
  };

  const handleRemoveProductType = (productType: string) => {
    onFieldChange('productTypes', productTypes.filter(s => s !== productType));
  };

  const handleRemoveDuration = (duration: string) => {
    onFieldChange('durations', durations.filter(c => c !== duration));
  };

  return (
    <div className="space-y-8 border-2 border-gray-300 rounded-xl p-6 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b-2 border-orange-200">
        <Ruler className="w-7 h-7 text-orange-500" />
        <h3 className="text-xl font-bold text-gray-900">Thuộc tính sản phẩm</h3>
      </div>

      {/* Sizes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-orange-500" />
            Loại sản phẩm
          </Label>
          {productTypes.length === 0 && (
            <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-4 h-4" />
              Bắt buộc
            </span>
          )}
        </div>
        <div className="flex gap-3 flex-col sm:flex-row">
          <Input
            value={newProductType}
            onChange={(e) => setNewProductType(e.target.value)}
            placeholder="Ví dụ: Tài khoản tạo sẵn, Key kích hoạt, Share account"
            className="flex-1 rounded-xl border-2 border-gray-200 transition-all duration-200 hover:border-orange-500 focus:border-orange-500 focus:ring-orange-500 text-base px-4 py-3"
          />
          <Button 
            onClick={handleAddProductType} 
            size="lg" 
            className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-200"
            disabled={!newProductType.trim()}
          >
            <Plus className="w-5 h-5 mr-2" />
            Thêm
          </Button>
        </div>
        {productTypes.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-2">
            {productTypes.map((productType) => (
              <div key={productType} className="bg-orange-50 rounded-full px-5 py-2 flex items-center gap-2 group hover:bg-orange-100 transition-all duration-200">
                <span className="text-base font-semibold text-orange-700">{productType}</span>
                <button 
                  onClick={() => handleRemoveProductType(productType)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1"
                >
                  <X className="w-4 h-4 text-orange-500 hover:text-orange-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Colors Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
            <Palette className="w-5 h-5 text-orange-500" />
            Thời hạn
          </Label>
          {durations.length === 0 && (
            <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-4 h-4" />
              Bắt buộc
            </span>
          )}
        </div>
        <div className="flex gap-3 flex-col sm:flex-row">
          <Input
            value={newDuration}
            onChange={(e) => setNewDuration(e.target.value)}
            placeholder="Ví dụ: 1 tháng, 3 tháng, 12 tháng, Vĩnh viễn"
            className="flex-1 rounded-xl border-2 border-gray-200 transition-all duration-200 hover:border-orange-500 focus:border-orange-500 focus:ring-orange-500 text-base px-4 py-3"
          />
          <Button 
            onClick={handleAddDuration} 
            size="lg" 
            className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-200"
            disabled={!newDuration.trim()}
          >
            <Plus className="w-5 h-5 mr-2" />
            Thêm
          </Button>
        </div>
        {durations.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-2">
            {durations.map((duration) => (
              <div key={duration} className="bg-orange-50 rounded-full px-5 py-2 flex items-center gap-2 group hover:bg-orange-100 transition-all duration-200">
                <span className="text-base font-semibold text-orange-700">{duration}</span>
                <button 
                  onClick={() => handleRemoveDuration(duration)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1"
                >
                  <X className="w-4 h-4 text-orange-500 hover:text-orange-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 