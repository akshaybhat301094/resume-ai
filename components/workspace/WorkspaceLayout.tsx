'use client'

import ChatPanel from '@/components/chat/ChatPanel'
import ImprovementPanel from '@/components/ImprovementPanel'
import ResumePreview from '@/components/ResumePreview'
import MobileNav from '@/components/workspace/MobileNav'
import useUIStore from '@/lib/store';

export default function WorkspaceLayout() {
    const {
        activeTab,
        isPreviewOpen,
        isAnalysisOpen,
    } = useUIStore();

    return (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative pb-[max(0px,env(safe-area-inset-bottom))]">

            {/* Resume Preview Panel */}
            <div className={`transition-all duration-300 ease-in-out bg-white overflow-hidden shrink-0 flex-col
              ${activeTab === 'preview' ? 'flex flex-1 lg:flex-none' : 'hidden lg:flex'}
              ${isPreviewOpen ? 'lg:w-[500px] lg:border-r-2 border-black lg:h-full' : 'lg:w-0 lg:border-r-0 lg:pointer-events-none lg:h-full'}`}>
                <div className="w-full lg:w-[500px] h-full overflow-hidden">
                    <ResumePreview />
                </div>
            </div>

            {/* Main Chat Console */}
            <div className={`flex-col overflow-hidden relative
              ${activeTab === 'chat' ? 'flex flex-1' : 'hidden lg:flex lg:flex-1 lg:h-full'}`}>
                <ChatPanel />
            </div>

            {/* Analysis Panel */}
            <div className={`transition-all duration-300 ease-in-out bg-white overflow-hidden shrink-0 flex-col
              ${activeTab === 'analysis' ? 'flex flex-1 lg:flex-none' : 'hidden lg:flex'}
              ${isAnalysisOpen ? 'lg:w-[450px] lg:border-l-2 border-black lg:h-full' : 'lg:w-0 lg:border-l-0 lg:pointer-events-none lg:h-full'}`}>
                <div className="w-full lg:w-[450px] h-full overflow-hidden">
                    <ImprovementPanel />
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <MobileNav />
        </div>
    );
}
