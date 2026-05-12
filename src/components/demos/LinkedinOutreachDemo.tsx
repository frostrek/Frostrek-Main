import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

const LinkedinOutreachDemo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSend = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
            setTimeout(() => setIsSent(false), 3000);
        }, 1500);
    };

    return (
        <div className="rounded-2xl p-6 border bg-gradient-to-br from-[#0077B5]/5 to-white border-[#0077B5]/20 shadow-lg">
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0077B5] to-[#004785] flex items-center justify-center text-white font-bold text-sm">
                        JD
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">John Doe</h4>
                        <p className="text-sm text-slate-500">CEO at TechCorp | Growth & Innovation</p>
                        <p className="text-xs text-slate-400 mt-1">Connect • 2nd degree connection</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                        Hi John,
                        <br /><br />
                        I noticed your expertise in AI solutions. We recently helped similar companies increase their data quality by 40%.
                        <br /><br />
                        Would you be open to a quick chat about how we're helping teams build production-ready AI systems?
                    </p>
                </div>

                <button
                    onClick={handleSend}
                    disabled={isLoading || isSent}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#0077B5] hover:bg-[#005885] disabled:opacity-60 text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
                >
                    {isSent ? (
                        <>
                            <CheckCircle2 className="w-4 h-4" />
                            Message Sent!
                        </>
                    ) : isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Send Message
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default LinkedinOutreachDemo;
