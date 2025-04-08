"use client";
import { redirect, useRouter } from "next/navigation";
import { useAuthStore } from "./store/useAuthStore";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const session = useAuthStore((state) => state.session);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!session) {
      redirect("/SignIn");
    }
  }, [session]);
  useEffect(() => {
    const loadingState = async () => {
      setTimeout(() => setLoading(false), 1000);
    };
    loadingState();
  }, [loading]);
  return (
    <>
      <Layout>{loading ? <Loading /> : <>HomePage</>}</Layout>
    </>
  );
}
