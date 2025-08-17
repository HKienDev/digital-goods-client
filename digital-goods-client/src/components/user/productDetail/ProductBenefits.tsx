import React from 'react';
import { Headset, RefreshCcw, BadgeCheck } from 'lucide-react';

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface ProductBenefitsProps {
  benefits?: Benefit[];
}

const ProductBenefits: React.FC<ProductBenefitsProps> = ({ 
  benefits = [
    {
      title: "Hỗ trợ 24/7",
      description: "Liên hệ qua email/Livechat khi gặp vấn đề.",
      icon: <Headset className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      title: "Bảo hành tài khoản",
      description: "Đổi mới trong 3 ngày nếu không đăng nhập được",
      icon: <RefreshCcw className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      title: "Đảm bảo chính hãng",
      description: "Sản phẩm được mua trực tiếp từ nhà phát hành",
      icon: <BadgeCheck className="w-5 h-5" />,
      color: "text-purple-600"
    }
  ]
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Chính Sách Của Hàng</h3>
      
      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3 group hover:bg-white/50 rounded-lg p-2 transition-colors duration-200">
            <div className={`flex-shrink-0 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200 ${benefit.color}`}>
              {benefit.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm group-hover:text-gray-800 transition-colors duration-200">
                {benefit.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBenefits; 