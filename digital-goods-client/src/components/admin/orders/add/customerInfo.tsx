"use client";

import { Input } from "@/components/ui/input";
import { User, Phone } from "lucide-react";

export default function CustomerInfo({ customer, updateCustomer }: { customer: { fullName: string; phone: string }, updateCustomer: (field: keyof typeof customer, value: string) => void }) {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-3">
            <User size={20} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Thông tin cá nhân</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <User size={16} className="mr-2 text-gray-500" />
              Họ và tên *
            </label>
            <Input
              type="text"
              placeholder="Nhập họ và tên khách hàng"
              value={customer.fullName || ""}
              onChange={(e) => updateCustomer("fullName", e.target.value)}
              className="h-12 bg-gray-50 border-gray-200 rounded-xl hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Phone size={16} className="mr-2 text-gray-500" />
              Số điện thoại *
            </label>
            <Input
              type="tel"
              placeholder="Nhập số điện thoại"
              value={customer.phone || ""}
              onChange={(e) => updateCustomer("phone", e.target.value)}
              className="h-12 bg-gray-50 border-gray-200 rounded-xl hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}