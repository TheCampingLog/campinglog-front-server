// (client) Redux Provider 래퍼
// src/app/Providers.tsx
"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";


export default function Providers({ children }: { children: React.ReactNode }) {
return <Provider store={store}>{children}</Provider>;
}