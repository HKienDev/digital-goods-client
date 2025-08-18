"use client";

import { createContext, useContext, useState, useCallback } from "react";

export interface CustomerInfo {
  fullName: string;
  phone: string;
}

interface CustomerContextType {
  customer: CustomerInfo;
  updateCustomer: (field: keyof CustomerInfo, value: string) => void;
  resetCustomer: () => void;
}

const initialCustomerState: CustomerInfo = {
  fullName: "",
  phone: "",
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<CustomerInfo>(initialCustomerState);

  const updateCustomer = useCallback((field: keyof CustomerInfo, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetCustomer = useCallback(() => {
    setCustomer(initialCustomerState);
  }, []);

  return (
    <CustomerContext.Provider value={{ customer, updateCustomer, resetCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}