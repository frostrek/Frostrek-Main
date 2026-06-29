import { useState, useEffect } from 'react';
import { motion, useMotionValue, MotionValue } from 'framer-motion';
import {
    Brain,
    Workflow,
    Zap,
    ZoomIn,
    ZoomOut,
    MousePointer2,
    MoreHorizontal,
    Play,
    GitBranch,
    Search,
    CheckCircle2
} from 'lucide-react';
import type { ProductProcessStep } from '../../utils/productData';


// Draggable Node Component
const CanvasNode = ({
    step,
    index,
    x,
    y,
    icon: Icon
}: {
    step: ProductProcessStep,
    index: number,
    x: MotionValue<number>,
    y: MotionValue<number>,
    icon: any
}) => {
    return (
        <motion.div
            drag
            dragMomentum={false}
            style={{ x, y }}
            whileHover={{ scale: 1.02, cursor: 'grab' }}
            whileTap={{ scale: 0.98, cursor: 'grabbing' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="absolute top-0 left-0 p-4.5 w-60 rounded-2xl border shadow-lg group transition-all duration-300 z-20 bg-white border-[#2D6A4F]/15 hover:border-[#2D6A4F]/40 hover:shadow-xl"
        >
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 bg-[#E8F5EE] border-[#2D6A4F]/15 text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D6A4F]">{step.step}</span>
                        <MoreHorizontal className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                    </div>
                    <h3 className="font-serif font-bold text-gray-900 mb-1 text-sm leading-tight">{step.title}</h3>
                    <p className="text-xs leading-relaxed line-clamp-2 text-slate-500 font-medium">{step.description}</p>
                </div>
            </div>

            {/* Drag Handle hint */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[9px] font-bold rounded-full opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap bg-[#2D6A4F] text-white shadow-sm">
                Drag to move
            </div>
        </motion.div>
    );
};

// Dynamic Connection Line with execution animation
const DynamicConnection = ({
    startX, startY, endX, endY, delay,
    startOffset = { x: 240, y: 36 },
    endOffset = { x: 0, y: 36 },
    isVertical = false,
    isExecuting = false,
    executionDelay = 0
}: {
    startX: MotionValue<number>, startY: MotionValue<number>,
    endX: MotionValue<number>, endY: MotionValue<number>,
    delay: number,
    startOffset?: { x: number, y: number },
    endOffset?: { x: number, y: number },
    isVertical?: boolean,
    isExecuting?: boolean,
    executionDelay?: number
}) => {

    const [pathD, setPathD] = useState('');

    useEffect(() => {
        const updatePath = () => {
            const sx = startX.get();
            const sy = startY.get();
            const ex = endX.get();
            const ey = endY.get();

            // Adjust offsets based on layout
            const sOffset = isVertical ? { x: 120, y: 140 } : startOffset;
            const eOffset = isVertical ? { x: 120, y: 0 } : endOffset;

            const sX = sx + sOffset.x;
            const sY = sy + sOffset.y;
            const eX = ex + eOffset.x;
            const eY = ey + eOffset.y;

            if (isVertical) {
                const midY = (sY + eY) / 2;
                setPathD(`M ${sX} ${sY} C ${sX} ${midY}, ${eX} ${midY}, ${eX} ${eY}`);
            } else {
                const midX = (sX + eX) / 2;
                setPathD(`M ${sX} ${sY} C ${midX} ${sY}, ${midX} ${eY}, ${eX} ${eY}`);
            }
        };

        updatePath();

        const unsubscribers = [
            startX.on('change', updatePath),
            startY.on('change', updatePath),
            endX.on('change', updatePath),
            endY.on('change', updatePath),
        ];

        return () => unsubscribers.forEach(unsub => unsub());
    }, [startX, startY, endX, endY, isVertical, startOffset, endOffset]);

    return (
        <svg
            className="absolute inset-0 pointer-events-none z-10"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
            <defs>
                <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background track */}
            <motion.path
                d={pathD}
                fill="none"
                stroke="#E8F5EE"
                strokeWidth="4"
            />

            {/* Default connector */}
            <motion.path
                d={pathD}
                fill="none"
                stroke="#2D6A4F"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{
                    pathLength: 1,
                    stroke: '#2D6A4F'
                }}
                transition={{ duration: 1.5, delay, ease: "easeInOut" }}
            />

            {/* Execution flow animation (green pulse traveling along the path) */}
            {isExecuting && (
                <>
                    {/* Glowing green overlay */}
                    <motion.path
                        d={pathD}
                        fill="none"
                        stroke="#34A853"
                        strokeWidth="3"
                        strokeLinecap="round"
                        filter="url(#glowGreen)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: executionDelay, ease: "easeOut" }}
                    />

                    {/* Traveling dot */}
                    <motion.circle
                        r="6"
                        fill="#2D6A4F"
                        filter="url(#glowGreen)"
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 0.8, delay: executionDelay, ease: "easeInOut" }}
                        style={{ offsetPath: `path("${pathD}")` }}
                    />
                </>
            )}
        </svg>
    );
};

export const WorkflowBuilder = ({ steps }: { steps: ProductProcessStep[] }) => {
    const [zoom, setZoom] = useState(100);
    const [isVertical, setIsVertical] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 150));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));

    const handleExecute = () => {
        if (isExecuting || isCompleted) return;
        setIsExecuting(true);

        setTimeout(() => {
            setIsExecuting(false);
            setIsCompleted(true);

            setTimeout(() => {
                setIsCompleted(false);
            }, 3000);
        }, 3000);
    };

    // Initial positions
    const x1 = useMotionValue(20);
    const y1 = useMotionValue(130);

    const x2 = useMotionValue(320);
    const y2 = useMotionValue(60);

    const x3 = useMotionValue(620);
    const y3 = useMotionValue(130);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsVertical(true);
                const mobileX = 40;

                x1.set(mobileX);
                y1.set(50);

                x2.set(mobileX);
                y2.set(250);

                x3.set(mobileX);
                y3.set(450);
            } else {
                setIsVertical(false);
                x1.set(20);
                y1.set(130);

                x2.set(320);
                y2.set(60);

                x3.set(620);
                y3.set(130);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [x1, y1, x2, y2, x3, y3]);

    return (
        <div className="w-full max-w-6xl mx-auto font-body">
            {/* FIXED: beautiful white container panel with thin green borders to match the light theme */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border shadow-xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[500px] bg-white border-[#2D6A4F]/15"
            >
                {/* 1. Sidebar Palette */}
                <div className="w-full md:w-64 border-r p-6 flex flex-col gap-6 relative z-30 bg-[#F9FBFA] border-[#2D6A4F]/15">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-serif font-black text-sm bg-[#2D6A4F] text-white">W</div>
                        <span className="font-serif font-extrabold text-[#2D6A4F]">Workflow</span>
                    </div>

                    <div className="space-y-4">
                        <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6A4F]">Process Blocks</div>
                        {[
                            { icon: Brain, label: "AI Analysis" },
                            { icon: GitBranch, label: "Logic Branch" },
                            { icon: MousePointer2, label: "Manual Input" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 5 }}
                                className="p-3.5 border rounded-2xl shadow-sm flex items-center gap-3 transition-all bg-white border-[#2D6A4F]/10 hover:border-[#2D6A4F]/30"
                            >
                                <item.icon className="w-4.5 h-4.5 text-[#2D6A4F]" />
                                <span className="text-sm font-bold text-gray-700">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        onClick={handleExecute}
                        whileHover={{ scale: (isExecuting || isCompleted) ? 1 : 1.02 }}
                        whileTap={{ scale: (isExecuting || isCompleted) ? 1 : 0.98 }}
                        className={`mt-auto p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                            isExecuting || isCompleted
                                ? 'bg-[#E8F5EE] border-[#2D6A4F]/30'
                                : 'bg-[#E8F5EE]/40 border-[#2D6A4F]/15 hover:bg-[#E8F5EE]/80'
                        }`}
                    >
                        <div className={`flex items-center gap-2 mb-2 font-extrabold text-sm transition-colors duration-300 ${
                            isExecuting || isCompleted ? 'text-[#2D6A4F]' : 'text-[#2D6A4F]/85'
                        }`}>
                            {isExecuting ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-[#2D6A4F] border-t-transparent rounded-full"
                                />
                            ) : isCompleted ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-4 h-4"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                                </motion.div>
                            ) : (
                                <Play className="w-4 h-4 fill-current text-[#2D6A4F]" />
                            )}

                            {isExecuting
                                ? 'Running Workflow...'
                                : isCompleted
                                    ? 'Workflow Completed!'
                                    : 'Ready to automate?'}
                        </div>
                        <p className="text-xs text-[#2D6A4F]/70 font-medium">
                            {isExecuting
                                ? 'Optimizing logic paths...'
                                : isCompleted
                                    ? 'Process successfully automated.'
                                    : 'Click here to see the workflow in action!'}
                        </p>
                    </motion.div>
                </div>

                {/* 2. Main Canvas Grid Panel */}
                <div className="flex-1 relative group cursor-default min-h-[650px] md:min-h-0 bg-[#FAFCFB]">
                    
                    {/* Floating Editor Toolbar */}
                    <div className="absolute bottom-6 md:top-6 md:bottom-auto left-1/2 -translate-x-1/2 backdrop-blur-md border rounded-full px-5 py-2.5 shadow-lg flex items-center gap-4.5 z-30 bg-white/95 border-[#2D6A4F]/15">
                        <button className="transition-colors text-[#2D6A4F] hover:text-[#1B4332] cursor-pointer"><MousePointer2 className="w-4 h-4" /></button>
                        <div className="w-px h-4 bg-[#2D6A4F]/20" />
                        <button onClick={handleZoomOut} className="transition-colors text-[#2D6A4F] hover:text-[#1B4332] cursor-pointer"><ZoomOut className="w-4 h-4" /></button>
                        <span className="text-xs font-bold font-mono min-w-[3ch] text-center text-[#2D6A4F]">{zoom}%</span>
                        <button onClick={handleZoomIn} className="transition-colors text-[#2D6A4F] hover:text-[#1B4332] cursor-pointer"><ZoomIn className="w-4 h-4" /></button>
                    </div>

                    {/* Nodes and Connections Container */}
                    <motion.div
                        className="relative w-full h-full origin-center"
                        animate={{ scale: zoom / 100 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Dynamic lines with custom styling */}
                        <DynamicConnection startX={x1} startY={y1} endX={x2} endY={y2} delay={0.5} isVertical={isVertical} isExecuting={isExecuting} executionDelay={0} />
                        <DynamicConnection startX={x2} startY={y2} endX={x3} endY={y3} delay={1.0} isVertical={isVertical} isExecuting={isExecuting} executionDelay={0.8} />

                        {/* Draggable Nodes */}
                        <CanvasNode step={steps[0]} index={0} x={x1} y={y1} icon={Search} />
                        <CanvasNode step={steps[1]} index={1} x={x2} y={y2} icon={Workflow} />
                        <CanvasNode step={steps[2]} index={2} x={x3} y={y3} icon={Zap} />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
