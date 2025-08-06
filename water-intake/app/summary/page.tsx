'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Layout from '../components/Layout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface WaterSummary {
  date: string;
  totalIntake: number;
  percentageOfGoal: number;
}

export default function SummaryPage() {
  const [data, setData] = useState<WaterSummary[]>([]);
  const [message, setMessage] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('http://localhost:3004/water-log/summary/user1');
        const summary = await res.json();
        setData(summary);
        const daysMetGoal = summary.filter((log: WaterSummary) => log.totalIntake >= 2000).length;
        if (daysMetGoal >= 5) {
          setMessage('Well done! You met the goal on 5+ days!');
        }
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };
    fetchSummary();
  }, []);

  return (
    <Layout>
    <div className="min-h-screen flex flex-col bg-gray-50">

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
            Weekly Water Intake Summary
          </h2>

          <div className="flex justify-center overflow-x-auto">
            <BarChart width={600} height={300} data={data}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#374151" />
              <YAxis stroke="#374151" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  color: '#1f2937',
                }}
              />
              <ReferenceLine
                y={2000}
                stroke="#ef4444"
                label={{ value: 'Goal (2000ml)', fill: '#ef4444' }}
              />
              <Bar dataKey="totalIntake" fill="#00000" />
            </BarChart>
          </div>

          {message && (
            <p className="mt-6 text-center text-[#51E34F] text-2xl font-semibold">{message}</p>
          )}
        </div>
      </main>

    </div>
    </Layout>
  );
}
