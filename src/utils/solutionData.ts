import { TrendingUp, Users, Server, Zap, Shield, Clock, Layout } from 'lucide-react';

export interface Challenge {
    title: string;
    description: string;
    solvedBy?: string;
}

export interface SolutionFeature {
    title: string;
    description: string;
    icon: any;
}

export interface SolutionData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage?: string;
    challenges: Challenge[];
    features: SolutionFeature[];
    keywords?: string;
}

export const SOLUTION_DATA: Record<string, SolutionData> = {
    '/solutions/manufacturing': {
        id: 'manufacturing',
        title: 'Manufacturing Intelligence',
        subtitle: 'Precision, Prediction, Profit',
        description: 'Unify factory telemetry, ERP data, and AI scheduling into a single pane of glass. Recover lost production and optimize resource allocation in real-time.',
        keywords: 'manufacturing telemetry AI integration, AI production scheduling engine, real-time factory floor analytics, predictive maintenance AI',
        challenges: [
            {
                title: 'Disconnected Legacy Systems',
                description: 'Data trapped in silos prevents a unified view of factory floor operations.',
                solvedBy: 'Unified data layer connects legacy ERPs and modern IoT sensors into one dashboard.'
            },
            {
                title: 'Inefficient Scheduling',
                description: 'Manual production planning leads to downtime and material waste.',
                solvedBy: 'AI scheduling engine optimizes runs based on supply chain reality and machine health.'
            },
            {
                title: 'Unseen Production Losses',
                description: '24/7 plants often lose tonnes of output due to undetected micro-stoppages.',
                solvedBy: 'Live telemetry detects and alerts on performance drops before they become failures.'
            },
        ],
        features: [
            { title: 'Live Factory Telemetry', description: 'Real-time sensor integration for every machine on the floor.', icon: Server },
            { title: 'AI Scheduling Engine', description: 'Dynamic production planning that adapts to supply chain shifts.', icon: Zap },
            { title: 'Cost Intelligence', description: 'Automated per-batch cost tracking and anomaly detection.', icon: TrendingUp },
        ]
    },
    '/solutions/web3': {
        id: 'web3',
        title: 'Fintech & Custom Wallets',
        subtitle: 'Save Gateway Commissions with Closed-Loop Fan Currency',
        description: 'A centralized, closed-loop digital currency engineered specifically for sports fans and affiliated clubs. Functioning as a next-generation digital loyalty programme that bypasses traditional payment processors to eliminate standard gateway commissions.',
        keywords: 'closed-loop digital fan currency wallets, zero gateway commission sports crypto wallets, custom web3 loyalty programs UK, sports club fintech solutions',
        challenges: [
            {
                title: 'Gateway Commissions & Leakage',
                description: 'Standard payment processing takes up to 3.5% of high-volume ticket and sports merchandise sales.',
                solvedBy: 'A centralized, closed-loop digital fan currency that bypasses middleman processing gatekeepers entirely.'
            },
            {
                title: 'Wallet Onboarding Friction',
                description: 'Traditional crypto wallets, seed phrases, and gas fees scare off mainstream sports fans.',
                solvedBy: 'Custom programmable wallets provisioned automatically on fan sign-up with standard email login.'
            },
            {
                title: 'Loyalty Retention & Utility',
                description: 'Legacy reward points lack immediate utility and fail to motivate fan engagement.',
                solvedBy: 'Next-generation digital loyalty programme dynamics that grant tokens real purchasing power inside club storefronts.'
            },
        ],
        features: [
            { title: 'Custom Fan Wallets', description: 'Provision secure closed-loop wallets instantly during sign-up to manage loyalty balances.', icon: Shield },
            { title: '0% Gateway Commissions', description: 'Save millions by conducting high-volume checkout flows on-chain and keeping margins intact.', icon: Layout },
            { title: 'Closed-Loop Sports Currency', description: 'Ensure fan spending remains entirely within the club and affiliated merchant ecosystem.', icon: Clock },
        ]
    },
    // Fallback
    'generic': {
        id: 'generic',
        title: 'Enterprise AI Solutions',
        subtitle: 'Transform Your Business',
        description: 'Leverage the power of artificial intelligence to solve your most critical business challenges. Scalable, secure, and custom-tailored to your needs.',
        keywords: 'custom enterprise AI solutions USA, bespoke AI agent development India, secure scalable AI architecture UK, enterprise digital transformation AI',
        challenges: [
            {
                title: 'Operational Efficiency',
                description: 'Rising costs and manual processes slowing growth.',
                solvedBy: 'End-to-end automation reduces operational costs by up to 60%.'
            },
            {
                title: 'Competitive Edge',
                description: 'Falling behind competitors who are adopting AI.',
                solvedBy: 'Stay ahead with cutting-edge agents that evolve with your business.'
            },
            {
                title: 'Data-Driven Decisions',
                description: 'Struggling to extract insights from overwhelming amounts of data.',
                solvedBy: 'AI-powered analytics transform raw data into actionable intelligence in real-time.'
            },
        ],
        features: [
            { title: 'Custom AI Models', description: 'Train models on your proprietary data for unique insights.', icon: TrendingUp },
            { title: 'Secure Integration', description: 'Enterprise-grade security and compliance built-in.', icon: Shield },
            { title: 'Scalable Architecture', description: 'Grow from pilot to enterprise-wide deployment effortlessly.', icon: Server },
        ]
    }
};
