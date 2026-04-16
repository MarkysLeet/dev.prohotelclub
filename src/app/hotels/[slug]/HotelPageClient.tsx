"use client";

import { useEffect } from "react";
import { headerStore } from "@/lib/useHeaderStore";

export function HotelPageClient({ hotelName }: { hotelName: string }) {
  useEffect(() => {
    headerStore.setState({ title: hotelName, showBack: true });
    return () => {
      headerStore.reset();
    };
  }, [hotelName]);

  return null;
}
