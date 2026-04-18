'use client'

import { IconResume, IconConsole, IconAnalysis } from '@/components/icons'
import useUIStore from '@/lib/store';

type Tab = 'preview' | 'chat' | 'analysis'

type NavButtonProps = {
    tab: Tab
    label: string
    Icon: React.FC
    activeTab: Tab
    onTabChange: (tab: Tab) => void
}

function NavButton({ tab, label, Icon, activeTab, onTabChange }: NavButtonProps) {
    return (
        <button
            onClick={() => onTabChange(tab)}
            className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-4 border-r-2 last:border-r-0 border-black transition-colors ${activeTab === tab ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
            <Icon />
            <span className="font-display font-black text-[8px] uppercase tracking-widest leading-none">{label}</span>
        </button>
    )
}

export default function MobileNav() {
    const { activeTab, setActiveTab } = useUIStore();

    return (
        <div 
            className="lg:hidden flex border-t-2 border-black bg-white shrink-0 z-50"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
            <NavButton tab="preview" label="Resume" Icon={IconResume} activeTab={activeTab} onTabChange={setActiveTab} />
            <NavButton tab="chat" label="Console" Icon={IconConsole} activeTab={activeTab} onTabChange={setActiveTab} />
            <NavButton tab="analysis" label="Analysis" Icon={IconAnalysis} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    )
}
