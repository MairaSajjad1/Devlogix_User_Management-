
"use client"

import React, { useEffect, useState } from 'react';
import { getSpecificOrder } from './_actions';
import { OrderDetail } from './_types';

interface DetailOrderProps {
  orderId: string;
}

function OrderDetailsPage({ orderId }: DetailOrderProps) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (orderId) {
          const orderData = await getSpecificOrder(Number(orderId));
          setOrder(orderData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toDateString();
  };

  if (loading) {
    return <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
    Loading ...
  </div>
  }

  if (!order) {
    return <div>Error fetching order details</div>;
  }
  

  return (
    <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
      <h1 className="font-semibold text-xl text-[#080808]">Order Details</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Order No:</h3>
          
          <h3>{order.order_no}</h3>
        </div>
       
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Payment Status:</h3>
          <h3>{order.payment_status}</h3>
        </div>
        {/* <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Order Date:</h3>
          <h3>{new Date(order?.data?.[0]?.created_at).toDateString()}</h3>
        </div> */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Price:</h3>
          <h3>{order.final_total}</h3>
        </div>
      </div>

      {/* shipment detail here */}
      <div>
        <h1 className="font-semibold text-xl text-[#080808]">Shipment Details</h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Product Name:</h3>
          <h3>{order.order_lines[0]?.product?.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Qty:</h3>
          <h3>{order.order_lines[0]?.qty}</h3>
        </div>
      </div>

      {/* delivery location here */}
      <div>
        <h1 className="font-semibold text-xl text-[#080808]">Delivery Location</h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Customer Name</h3>
          <h3>{order.customer?.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Customer Phone</h3>
          <h3>{order.customer?.mobile_no}</h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Address:</h3>
          <h3>{order.address}</h3>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
