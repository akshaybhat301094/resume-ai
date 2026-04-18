'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SYSTEM_CRASH_REPORT:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen flex items-center justify-center bg-[#F9F9F9] p-6">
          <div className="max-w-xl w-full brutalist-card bg-white p-8 space-y-8">
            <header className="space-y-4">
              <div className="inline-block bg-black text-white px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase animate-pulse">
                CRITICAL_SYSTEM_FAILURE_0x88
              </div>
              <h1 className="text-4xl font-display font-black text-black leading-none uppercase tracking-tighter">
                Connection<br />Lost
              </h1>
              <div className="h-0.5 w-full bg-black/10" />
            </header>

            <div className="space-y-4">
              <p className="font-mono text-xs uppercase font-bold text-gray-400">Error_Payload:</p>
              <div className="p-4 bg-gray-100 border-2 border-black font-mono text-[10px] leading-relaxed break-all">
                {this.state.error?.message || 'UNKNOWN_TRANSMISSION_ERROR'}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={this.handleReset}
                className="brutalist-button-primary flex-1 py-4 text-center"
              >
                REBOOT_SYSTEM
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="brutalist-button-secondary flex-1 py-4 text-center"
              >
                RETURN_TO_BASE
              </button>
            </div>

            <footer className="pt-4 border-t border-black/5 font-mono text-[8px] font-bold text-black/30 uppercase flex justify-between">
              <span>TRNS-ID: ERR-99-AI</span>
              <span>STATUS: OFFLINE</span>
            </footer>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
