import { Construction } from 'lucide-react';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-white/50 space-y-4 pt-20">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
        <Construction size={32} className="text-[#818CF8]" />
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p>This module is currently under development.</p>
    </div>
  );
}
