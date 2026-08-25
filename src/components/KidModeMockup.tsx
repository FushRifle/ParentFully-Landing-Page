'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Circle, Cog, GripVertical, MoreVertical, PartyPopper, Pen, Plus } from 'lucide-react';

const routineTasks = [
    { id: 'teeth', title: 'Brush teeth', time: '7:00 AM', duration: '3 mins', icon: '🪥' },
    { id: 'dressed', title: 'Get dressed', time: '7:10 AM', duration: '10 mins', icon: '👕' },
    { id: 'bag', title: 'Pack school bag', time: '7:25 AM', duration: '5 mins', icon: '🎒' },
];

type ProfileTab = 'Goals' | 'Routine' | 'Discipline';

export default function KidModeMockup() {
    const [activeTab, setActiveTab] = useState<ProfileTab>('Routine');
    const [selected, setSelected] = useState<string[]>([]);
    const [completed, setCompleted] = useState<string[]>([]);
    const [celebrating, setCelebrating] = useState(false);
    const availableTasks = routineTasks.filter((task) => !completed.includes(task.id));
    const selectedCount = selected.length;
    const allComplete = completed.length === routineTasks.length;
    const progress = Math.round((completed.length / routineTasks.length) * 100);

    const label = useMemo(() => allComplete ? 'Routine complete!' : `${completed.length} of ${routineTasks.length} completed`, [allComplete, completed.length]);

    const toggleTask = (id: string) => {
        if (completed.includes(id)) return;
        setSelected((current) => current.includes(id) ? current.filter((taskId) => taskId !== id) : [...current, id]);
    };

    const completeSelected = () => {
        if (!selected.length) return;
        const nextCompleted = completed.concat(selected.filter((taskId) => !completed.includes(taskId)));
        setCompleted(nextCompleted);
        setSelected([]);
        if (nextCompleted.length === routineTasks.length) setCelebrating(true);
    };

    const resetRoutine = () => {
        setSelected([]);
        setCompleted([]);
        setCelebrating(false);
    };

    return (
        <div className="relative mx-auto w-[278px] rounded-[2.8rem] border-[9px] border-[#17211c] bg-[#17211c] p-1.5 shadow-[0_32px_80px_rgba(15,23,42,0.35)] sm:w-[315px]">
            <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-[#17211c]" />
            <div className="relative h-[570px] overflow-hidden rounded-[2.05rem] bg-[#f7f8f7] font-sans sm:h-[644px]">
                <div className="bg-gradient-to-br from-[#003D1F] to-[#006B38] px-4 pb-4 pt-9 text-white sm:px-5">
                    <div className="flex items-center justify-between text-[10px] font-bold opacity-90"><span>9:41</span><span>● ● ●</span></div>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2"><button type="button" aria-label="Back" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15"><ChevronLeft className="h-4 w-4" /></button><h2 className="text-[16px] font-black">Child Profile</h2></div>
                        <button type="button" aria-label="Settings" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15"><Cog className="h-4 w-4" /></button>
                    </div>
                </div>

                <div className="px-3 pt-2.5 sm:px-4">
                    <div className="flex items-center gap-2.5 rounded-2xl border border-gray-200 bg-white p-2.5 shadow-sm">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F38500]/20 text-lg">👧🏾</div>
                        <div className="min-w-0 flex-1"><p className="text-[13px] font-black text-gray-800">Maya <span className="text-[9px] font-medium text-gray-400">6 yrs</span></p><div className="mt-1 flex gap-1.5"><span className="rounded-full border border-gray-200 px-2 py-0.5 text-[8px] font-bold text-[#006838]">4 Mastered</span><span className="rounded-full border border-gray-200 px-2 py-0.5 text-[8px] font-bold text-[#006838]">120 pts</span></div></div>
                    </div>

                    <div className="mt-2 flex rounded-full border border-gray-200 bg-white p-1">
                        {(['Goals', 'Routine', 'Discipline'] as ProfileTab[]).map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`h-7 flex-1 rounded-full text-[9px] font-bold transition ${activeTab === tab ? 'bg-[#149B2B] text-white shadow-sm' : 'text-gray-600'}`}>{tab}</button>)}
                    </div>

                    {activeTab === 'Routine' ? (
                        <>
                            <div className="mt-3 flex items-center justify-between px-1"><div><p className="text-[13px] font-black text-gray-800">Morning Routine</p><p className="text-[9px] text-gray-500">3 tasks</p></div><div className="flex gap-1"><button type="button" aria-label="Add a routine task" className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-[#149B2B] shadow-sm transition hover:bg-[#E8F6E7]"><Plus className="h-3 w-3" strokeWidth={2.75} /></button><button type="button" aria-label="Edit routine" className="flex h-6 w-6 items-center justify-center rounded-full bg-[#149B2B] text-white shadow-sm transition hover:bg-[#107d23]"><Pen className="h-[11px] w-[11px]" strokeWidth={2.5} /></button></div></div>

                            {/** 
                            <div className="mt-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm"><div className="flex items-center justify-between"><span className="text-[10px] font-black text-gray-700">Today&apos;s progress</span><span className="text-[9px] font-bold text-[#149B2B]">{label}</span></div><div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-[#149B2B] transition-all duration-500" style={{ width: `${progress}%` }} /></div></div>*/}

                            <div className="mt-2 space-y-1.5">
                                {routineTasks.map((task, index) => {
                                    const isCompleted = completed.includes(task.id);
                                    const isSelected = selected.includes(task.id);
                                    return <button key={task.id} type="button" onClick={() => toggleTask(task.id)} disabled={isCompleted} className={`w-full overflow-hidden rounded-xl border text-left transition ${isCompleted ? 'border-[#149B2B] bg-[#E8F6E7]' : isSelected ? 'border-[#8ACB95] bg-[#EFF8F0]' : 'border-gray-200 bg-white shadow-sm hover:border-[#8ACB95]'}`}>
                                        <div className={`h-1 ${isCompleted || isSelected ? 'bg-[#149B2B]' : ['bg-[#006838]', 'bg-[#F38500]', 'bg-[#FED835]'][index]}`} />
                                        <div className="flex items-center gap-1.5 px-2 py-1.5"><GripVertical className="h-3.5 w-3 shrink-0 text-gray-300" /><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f8f8f7] text-sm">{task.icon}</span><span className="min-w-0 flex-1"><span className={`block text-[11px] font-black ${isCompleted ? 'text-[#163D1C] line-through' : 'text-gray-800'}`}>{task.title}</span><span className="block text-[8px] text-gray-500">{task.time} · {task.duration}</span>{isCompleted && <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[#DFF1D9] px-1.5 py-0.5 text-[7px] font-bold text-[#157D28]"><Check className="h-2 w-2" /> Completed</span>}</span>{isCompleted || isSelected ? <span className="flex h-4.5 w-4.5 items-center justify-center rounded-md bg-[#149B2B] p-0.5 text-white"><Check className="h-3 w-3" /></span> : <Circle className="h-4.5 w-4.5 text-gray-300" />}<MoreVertical className="h-3.5 w-3.5 text-gray-400" /></div>
                                    </button>;
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm"><div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#E2FDF8] text-lg">{activeTab === 'Goals' ? '🎯' : '🧡'}</div><p className="mt-2 text-[11px] font-black text-gray-800">{activeTab === 'Goals' ? 'Maya’s growth goals' : 'Maya’s guidance plan'}</p><p className="mt-1 text-[9px] leading-relaxed text-gray-500">Everything that helps Maya grow lives in one place.</p></div>
                    )}
                </div>

                {activeTab === 'Routine' && <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#f7f8f7] via-[#f7f8f7] to-transparent px-3 pb-3 pt-10 sm:px-4 sm:pb-4">
                    {allComplete ? <button type="button" onClick={resetRoutine} className="flex w-full items-center justify-between rounded-xl border border-[#8ACB95] bg-white px-3 py-2.5 text-left shadow-lg"><span><span className="block text-[10px] font-black text-[#157D28]">All done for today!</span><span className="text-[8px] text-gray-500">Tap to start again</span></span><ChevronRight className="h-4 w-4 text-[#149B2B]" /></button> : <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-[0_-5px_14px_rgba(0,0,0,0.08)]"><span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${selectedCount ? 'bg-[#149B2B]' : 'bg-gray-200'} text-white`}><Check className="h-3.5 w-3.5" /></span><span className={`min-w-0 flex-1 text-[9px] font-bold ${selectedCount ? 'text-[#149B2B]' : 'text-gray-400'}`}>{selectedCount} of {availableTasks.length} selected</span><button type="button" onClick={completeSelected} disabled={!selectedCount} className="flex h-6 items-center gap-1 rounded-lg bg-[#149B2B] px-2 text-[9px] font-black text-white transition disabled:bg-gray-200">Complete <ChevronRight className="h-3 w-3" /></button></div>}
                </div>}

                {celebrating && <button type="button" onClick={() => setCelebrating(false)} className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#005A31]/95 px-7 text-center text-white"><PartyPopper className="h-12 w-12 text-[#FED835]" /><p className="mt-4 text-2xl font-black">Amazing work!</p><p className="mt-2 text-sm text-white/80">Morning Routine complete. You earned 10 points!</p><span className="mt-6 rounded-full bg-white px-4 py-2 text-xs font-black text-[#005A31]">Tap to continue</span></button>}
            </div>
        </div>
    );
}
