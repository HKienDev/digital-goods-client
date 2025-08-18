import Image from "next/image";
import { User, Phone, Edit3, CheckCircle, Shield } from "lucide-react";

interface CustomerData {
  id: string;
  name: string;
  avatar: string;
  phone: string;
}

interface CustomerInfoProps {
  customer: CustomerData;
}

export default function CustomerInfo({ customer }: CustomerInfoProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-50 to-indigo-50 px-6 py-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-2xl border-4 border-white shadow-lg transition-all duration-300 group-hover:border-indigo-100 group-hover:shadow-xl">
              <Image
                src={customer.avatar || "/avatarDefault.jpg"}
                width={96}
                height={96}
                className="object-cover w-full h-full"
                alt="Avatar khách hàng"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-xl shadow-lg cursor-pointer opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-110">
              <Edit3 size={16} />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                {customer.name || "Chưa cập nhật tên"}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-200">
                  <CheckCircle size={12} />
                  Đã xác thực
                </span>
                <span className="text-indigo-600 flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-full text-xs font-medium border border-indigo-200">
                  <Shield size={12} />
                  Hoạt động
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <User size={14} className="text-indigo-600" />
                </div>
                <span className="text-sm font-medium">ID: #{customer.id.slice(0, 8).toUpperCase()}</span>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Phone size={14} className="text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium">{customer.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Edit3 size={18} className="text-indigo-600" />
            <h3 className="text-lg font-semibold text-slate-800">Thông tin khách hàng</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <User size={16} className="mr-2 text-gray-500" />
              Họ và tên
            </label>
            <div className="h-12 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4">
              {customer.name || "Chưa cập nhật tên"}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Phone size={16} className="mr-2 text-gray-500" />
              Số điện thoại
            </label>
            <div className="h-12 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4">
              {customer.phone || "Chưa cập nhật số điện thoại"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}