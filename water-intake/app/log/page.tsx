"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";

export default function LogPage() {
  const [date, setDate] = useState("");
  const [intakeMl, setIntakeMl] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3004/water-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user1",
          date,
          intakeMl: Number(intakeMl),
        }),
      });

      if (res.ok) {
        toast.success("Water intake logged successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setDate("");
        setIntakeMl("");
        setTimeout(() => {
          router.push("/summary");
        }, 1000);
      } else {
        toast.error("Failed to log water intake.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? `Error: ${error.message}`
          : "An unexpected error occurred.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <Layout>
    <div className="min-h-screen flex flex-col bg-gray-50">

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
            Log Water Intake
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Intake (ml)
              </label>
              <input
                type="number"
                value={intakeMl}
                onChange={(e) => setIntakeMl(e.target.value)}
                required
                min="0"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2.5 rounded-lg transition duration-200"
            >
              Log Intake
            </button>
          </form>
        </div>
        <ToastContainer />
      </main>


    </div>
    </Layout>
  );
}
