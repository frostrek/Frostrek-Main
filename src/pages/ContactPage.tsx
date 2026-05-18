import { useState } from 'react';
import { Mail, Send, Check, Loader2, ArrowRight, MessageCircle, Phone, Globe, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';
import emailjs from '@emailjs/browser';
import FlipText from '../components/ui/FlipText';
import SplitTextReveal from '../components/ui/SplitTextReveal';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        jobTitle: '',
        workEmail: '',
        reachType: 'Sales Enquiry',
        projectDetails: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!formData.firstName.trim()) {
            setError("First name is required");
            return false;
        }

        if (!formData.lastName.trim()) {
            setError("Last name is required");
            return false;
        }

        if (!formData.workEmail.trim()) {
            setError("Work email is required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.workEmail)) {
            setError("Please enter a valid email address");
            return false;
        }

        if (!formData.projectDetails.trim()) {
            setError("Project description is required");
            return false;
        }

        const wordCount = formData.projectDetails.trim().split(/\s+/).length;
        if (wordCount < 3) {
            setError("Please provide a bit more detail regarding your enquiry");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const fullName = `${formData.firstName} ${formData.lastName}`;
            const messageContent = `
Name: ${fullName}
Company: ${formData.company || 'N/A'}
Job Title: ${formData.jobTitle || 'N/A'}
Email: ${formData.workEmail}
Inquiry Type: ${formData.reachType}

Message:
${formData.projectDetails}
            `.trim();

            await emailjs.send(
                'service_jia14ic',
                'template_hygc11p',
                {
                    to_email: 'contact@frostrek.ai',
                    from_name: fullName,
                    user_name: fullName,
                    name: fullName,
                    from_email: formData.workEmail,
                    user_email: formData.workEmail,
                    email: formData.workEmail,
                    reply_to: formData.workEmail,
                    subject: `New Contact Inquiry: ${formData.reachType}`,
                    message: messageContent,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    company: formData.company,
                    job_title: formData.jobTitle,
                    work_email: formData.workEmail,
                    reach_type: formData.reachType,
                    project_details: formData.projectDetails
                },
                'BiiX__h7V1vLoyEQb'
            );

            setIsSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                company: '',
                jobTitle: '',
                workEmail: '',
                reachType: 'Sales Enquiry',
                projectDetails: ''
            });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            console.error('EmailJS Error:', err);
            setError('Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-white via-[#FAFCFB] to-white relative font-body overflow-hidden">
            <SEO 
                title="Contact Us | Frostrek" 
                description="Get in touch with Frostrek to explore how AI can transform your business. We are here to help." 
                path="/contact" 
            />

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] bg-[#E8F5EE]/40" />
                <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] bg-[#E8F5EE]/40" />
                <div className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: 'linear-gradient(#2d6a4f 1px, transparent 1px), linear-gradient(90deg, #2d6a4f 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    {/* Left Side: Information & Branding */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8 lg:sticky lg:top-28"
                    >
                        <div>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 bg-[#E8F5EE] border border-[#2D6A4F]/20 text-[#2D6A4F] font-bold text-[11px] uppercase tracking-wider">
                                <Sparkles size={12} className="animate-pulse" />
                                <span>Get In Touch</span>
                            </div>

                            <div className="flex flex-col">
                                <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-gray-950 leading-tight">
                                    <SplitTextReveal as="span" type="chars" stagger={0.03} once={false} trigger="load">
                                        Let's Start a Conversation
                                    </SplitTextReveal>
                                </div>
                            </div>
                            <SplitTextReveal
                                as="p"
                                className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-lg mt-4"
                                type="words"
                                stagger={0.015}
                                once={false}
                                delay={0.6}
                                trigger="load"
                            >
                                Have a project in mind or want to explore how AI can transform your business? We're here to help.
                            </SplitTextReveal>
                        </div>

                        {/* Contact Methods Container */}
                        <div className="space-y-6 max-w-xl">
                            {/* Call & Direct Contact Details */}
                            <div className="p-8 rounded-3xl bg-white border border-[#2D6A4F]/10 shadow-xl shadow-gray-100/50 space-y-6">
                                <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-body">
                                    Direct Connect
                                </h3>
                                
                                {/* CALL US Feature Card */}
                                <a
                                    href="tel:+916399999955"
                                    className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white shadow-xl shadow-[#2D6A4F]/15 transition-all duration-300 transform hover:scale-[1.01] group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-white/15">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white/80 uppercase tracking-wider font-body leading-none mb-1">Call Us</h4>
                                            <p className="font-serif font-black text-lg md:text-xl text-white tracking-wide">+91 6399999955</p>
                                        </div>

                                    </div>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-all">
                                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </a>

                                {/* Row for Email and WhatsApp */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <a
                                        href="mailto:contact@frostrek.ai"
                                        className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAFCFB] border border-[#2D6A4F]/5 hover:border-[#2D6A4F]/25 hover:bg-white transition-all duration-300 group shadow-sm hover:shadow-md"
                                    >
                                        <div className="p-2.5 rounded-xl bg-[#E8F5EE] text-[#2D6A4F] transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-bold text-xs text-gray-950 mb-0.5 font-body uppercase tracking-wider">Email Us</h4>
                                            <p className="text-sm text-slate-600 font-semibold truncate">contact@frostrek.ai</p>
                                        </div>
                                    </a>
                                    <a
                                        href="https://wa.me/17574722491"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAFCFB] border border-[#2D6A4F]/5 hover:border-[#2D6A4F]/25 hover:bg-white transition-all duration-300 group shadow-sm hover:shadow-md"
                                    >
                                        <div className="p-2.5 rounded-xl bg-[#E8F5EE] text-[#2D6A4F]">
                                            <MessageCircle className="w-5 h-5 text-[#2D6A4F]" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-bold text-xs text-gray-950 mb-0.5 font-body uppercase tracking-wider">WhatsApp (US)</h4>
                                            <p className="text-sm text-slate-600 font-semibold truncate">+1 757 472 2491</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* GLOBAL OFFICES Section */}
                            <div className="p-8 rounded-3xl bg-white border border-[#2D6A4F]/10 shadow-xl shadow-gray-100/50">
                                <div className="flex items-center gap-2 mb-6 border-b border-gray-150/50 pb-4">
                                    <Globe className="w-4 h-4 text-[#2D6A4F]" />
                                    <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-body">
                                        GLOBAL OFFICES
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        {
                                            title: 'India (HQ)',
                                            address: '4th Floor, Unit No. 455, JMD Empire, Sector 62, Gurugram',
                                            mapUrl: 'https://www.google.com/maps/search/?api=1&query=4th+Floor+Unit+No+455+JMD+Empire+Sector+62+Gurugram+India',
                                            isHQ: true
                                        },
                                        {
                                            title: 'USA',
                                            address: '701 Tillery Street Unit 12-3227, Austin, Texas 78702, United States',
                                            mapUrl: 'https://www.google.com/maps/search/?api=1&query=701+Tillery+Street+Unit+12-3227+Austin+Texas+78702+United+States',
                                            isHQ: false
                                        },
                                        {
                                            title: 'UK',
                                            address: '24–26 Arcadia Avenue, Fin009/8701, London, United Kingdom, N3 2JU',
                                            mapUrl: 'https://www.google.com/maps/search/?api=1&query=24-26+Arcadia+Avenue+London+N3+2JU+United+Kingdom',
                                            isHQ: false
                                        },
                                    ].map((office, i) => (
                                        <a
                                            key={i}
                                            href={office.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 rounded-2xl border border-transparent bg-[#FAFCFB] hover:bg-white hover:border-[#2D6A4F]/20 hover:shadow-md transition-all duration-300 group"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-serif font-black text-sm text-gray-950 transition-colors group-hover:text-[#2D6A4F]">
                                                        {office.title}
                                                    </h4>
                                                    {office.isHQ && (
                                                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] border border-[#2D6A4F]/10">
                                                            HQ
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                                    {office.address}
                                                </p>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-all text-[#2D6A4F]">
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Message Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="p-8 sm:p-10 rounded-3xl border shadow-2xl bg-white border-[#2D6A4F]/10 shadow-[#2D6A4F]/5">
                            
                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="border-b border-gray-100 pb-4">
                                        <h3 className="text-2xl font-serif font-black text-gray-950">Send Us a Message</h3>
                                        <p className="text-xs text-slate-400 font-medium mt-1">Please fill in the form below and we'll connect shortly.</p>
                                    </div>

                                    {/* Name Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <InputGroup
                                            label="First name*"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="John"
                                        />
                                        <InputGroup
                                            label="Last name*"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Doe"
                                        />
                                    </div>

                                    {/* Company Details Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <InputGroup
                                            label="Company name"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Acme Corp"
                                            required={false}
                                        />
                                        <InputGroup
                                            label="Job title"
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                            placeholder="Director of Operations"
                                            required={false}
                                        />
                                    </div>

                                    {/* Work Email */}
                                    <InputGroup
                                        label="Work email*"
                                        name="workEmail"
                                        type="email"
                                        value={formData.workEmail}
                                        onChange={handleChange}
                                        placeholder="john.doe@company.com"
                                    />

                                    {/* Enquiry Reach Selection */}
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-body">
                                            Who are you trying to reach?<span className="text-red-500">*</span>
                                        </label>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            {[
                                                "Sales Enquiry", 
                                                "Project Enquiry", 
                                                "Partnerships", 
                                                "Support", 
                                                "Careers", 
                                                "Other"
                                            ].map((option) => {
                                                const isSelected = formData.reachType === option;
                                                return (
                                                    <label 
                                                        key={option} 
                                                        className={`
                                                            flex items-center gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                                            ${isSelected 
                                                                ? 'bg-[#E8F5EE]/40 border-[#2D6A4F] shadow-sm' 
                                                                : 'bg-[#FAFCFB] border-gray-150 hover:border-[#2D6A4F]/25 hover:bg-white'}
                                                        `}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="reachType"
                                                            value={option}
                                                            checked={isSelected}
                                                            onChange={handleChange}
                                                            className="sr-only"
                                                        />
                                                        <div className={`
                                                            w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                                            ${isSelected ? 'border-[#2D6A4F]' : 'border-slate-300'}
                                                        `}>
                                                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />}
                                                        </div>
                                                        <span className={`text-xs font-semibold ${isSelected ? 'text-gray-950 font-bold' : 'text-slate-600'}`}>
                                                            {option}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Message Textarea */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-body">
                                            Please provide details regarding your enquiry.<span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="projectDetails"
                                            value={formData.projectDetails}
                                            onChange={handleChange}
                                            rows={4}
                                            required
                                            placeholder="Tell us a bit more about what you're looking for..."
                                            className="w-full px-4 py-3.5 rounded-2xl outline-none border transition-all duration-300 resize-none text-sm bg-white border-gray-200 focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#E8F5EE]/50 text-gray-900 placeholder-slate-400"
                                        />
                                    </div>

                                    {/* Privacy Agreement Text */}
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        By submitting this form, your information will be processed securely and in strict accordance with our Privacy Policy.
                                    </p>

                                    {/* Error Display */}
                                    {error && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold"
                                        >
                                            {error}
                                        </motion.div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group w-full py-4 rounded-2xl font-medium text-sm text-white shadow-lg shadow-[#2D6A4F]/10 bg-[#2D6A4F] hover:bg-[#1B4332] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                    >
                                        <FlipText>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" /> Sending Message...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </FlipText>
                                    </button>

                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-16 flex flex-col items-center text-center"
                                >
                                    <div className="w-20 h-20 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/20 flex items-center justify-center mb-6">
                                        <Check className="w-9 h-9 text-[#2D6A4F]" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-black text-gray-950">Message Sent!</h3>
                                    <p className="text-slate-500 text-sm max-w-xs mt-2.5 font-medium">
                                        Thanks for reaching out! We have received your inquiry and will get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="mt-8 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#E8F5EE] border border-[#2D6A4F]/15 text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                                    >
                                        Send another message <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

const InputGroup = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = true
}: any) => (
    <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-body">
            {typeof label === 'string' && label.endsWith('*') ? (
                <>
                    {label.slice(0, -1)}<span className="text-red-500">*</span>
                </>
            ) : (
                label
            )}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="w-full px-4 py-3.5 rounded-2xl outline-none border transition-all duration-300 text-sm bg-white border-gray-200 focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#E8F5EE]/50 text-gray-900 placeholder-slate-400 font-medium"
        />
    </div>
);

export default ContactPage;