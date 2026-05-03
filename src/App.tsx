/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, Award, Users, Globe, History, 
  Settings, ShieldCheck, Zap, Mail, MapPin, Phone, 
  ArrowRight, MessageSquare, Compass, Layers, Globe2, Shield,
  Flame, Hammer, Sparkles, Search, CheckCircle2
} from 'lucide-react';
import { useInView, useSpring } from 'motion/react';

// --- Components ---

const StatCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
  });
  
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
};

const AnimatedCompass = () => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <div className="absolute inset-0 border border-accent/20 rounded-full animate-ping opacity-20" />
    <motion.div
      animate={{ rotate: [0, 45, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Compass className="text-accent w-10 h-10" strokeWidth={1} />
    </motion.div>
  </div>
);

const AnimatedHinges = () => (
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="w-16 h-16 flex items-center justify-center"
  >
    <Layers className="text-accent w-10 h-10" strokeWidth={1} />
  </motion.div>
);

const AnimatedGlobe = () => (
  <motion.div
    animate={{ rotateY: [0, 360] }}
    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    className="w-16 h-16 flex items-center justify-center"
  >
    <Globe2 className="text-accent w-10 h-10" strokeWidth={1} />
  </motion.div>
);

const AnimatedShield = () => (
  <div className="relative w-16 h-16 flex items-center justify-center overflow-hidden">
    <Shield className="text-accent w-10 h-10" strokeWidth={1} />
    <motion.div
      animate={{ x: [-100, 100] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
      className="absolute top-0 bottom-0 w-4 bg-white/30 skew-x-12 blur-md"
    />
  </div>
);

const LuxuryLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="text-ink/60 hover:text-accent uppercase tracking-[0.2em] text-[10px] sm:text-xs font-medium transition-colors duration-300"
  >
    {children}
  </a>
);

const SectionTitle = ({ subtitle, title }: { subtitle: string; title: string }) => (
  <div className="mb-12 overflow-hidden text-center sm:text-left">
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-accent text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold block mb-2"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tighter text-ink leading-[0.9]"
    >
      {title}
    </motion.h2>
  </div>
);

export function MainContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      image: "https://visible-jade-zlxwydahf7.edgeone.app/1.jpg?q=80&w=2000&auto=format&fit=crop",
      tag: "Established 1984 — Rajkot",
      title: <>The <span className="font-bold italic text-accent">Alchemy</span> <br/> of Precision.</>,
      desc: "Engineering architectural brass hardware with industrial rigor and artisanal soul. Built for longevity, designed for distinction."
    },
    {
      image: "https://convenient-amaranth-vcnylcil5l.edgeone.app/4.jpg?q=80&w=2000&auto=format&fit=crop",
      tag: "Engineering Excellence",
      title: <>Industrial <span className="font-bold italic text-accent">Strength</span> <br/> Refined.</>,
      desc: "From heavy-duty hinges to aesthetic architectural accents, our components exceed international benchmarks for durability."
    },
    {
      image: "https://acute-peach-k8wcqwmz2l.edgeone.app/2.jpg?q=80&w=2000&auto=format&fit=crop",
      tag: "Global Footprint",
      title: <>Generations <br/> of <span className="font-bold italic text-accent">Trust</span>.</>,
      desc: "A legacy of 35+ years serving 12,000+ global architectural partners with bespoke hardware solutions."
    }
  ];

  const featuredProducts = [
    {
      image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1200&auto=format&fit=crop",
      title: "Imperial Ball Bearing Hinge",
      specs: "Series 04 // Grade 316 Stainless Brass",
      ref: "ABD-2026-X"
    },
    {
      image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?q=80&w=1200&auto=format&fit=crop",
      title: "Titan Security Bolt",
      specs: "Series 02 // Anti-Pick Core",
      ref: "ABD-2026-Y"
    },
    {
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e15ca?q=80&w=1200&auto=format&fit=crop",
      title: "Nexus Gate Hook",
      specs: "Series 08 // Industrial Grade",
      ref: "ABD-2026-Z"
    },
    {
      image: "https://images.unsplash.com/photo-1542156822-6924d1a71ace?q=80&w=1200&auto=format&fit=crop",
      title: "Heritage Pull Handle",
      specs: "Series 05 // Hand Polished",
      ref: "ABD-2026-A"
    },
    {
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1200&auto=format&fit=crop",
      title: "Marine Alloy Bracket",
      specs: "Series 03 // Salt Protected",
      ref: "ABD-2026-B"
    }
  ];

  const [activeProductIndex, setActiveProductIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProductIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass shadow-sm' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img 
              src="https://fancy-harlequin-ipyvwodwrb.edgeone.app/PT_LOGO-01.png" 
              alt="PRIMETURN COMPONENTS" 
              className="h-8 md:h-10 w-auto"
            />
          </a>

          <div className="hidden lg:flex gap-8 items-center text-ink/60">
            <LuxuryLink href="#top">Home</LuxuryLink>
            <LuxuryLink href="#products">Products</LuxuryLink>
            <LuxuryLink href="#process">Process</LuxuryLink>
            <LuxuryLink href="#gallery">Gallery</LuxuryLink>
            <LuxuryLink href="#about">About</LuxuryLink>
            <LuxuryLink href="#contact">Contact</LuxuryLink>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a 
              href="#contact" 
              className="px-6 py-2 border border-accent text-accent text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all accent-glow"
            >
              Get Quote
            </a>
          </div>

          <button className="md:hidden text-ink/60 hover:text-ink" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <LuxuryLink href="#top" onClick={() => setIsMenuOpen(false)}>Home</LuxuryLink>
            <LuxuryLink href="#products" onClick={() => setIsMenuOpen(false)}>Products</LuxuryLink>
            <LuxuryLink href="#process" onClick={() => setIsMenuOpen(false)}>Process</LuxuryLink>
            <LuxuryLink href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</LuxuryLink>
            <LuxuryLink href="#about" onClick={() => setIsMenuOpen(false)}>About</LuxuryLink>
            <LuxuryLink href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</LuxuryLink>
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 px-8 py-3 bg-accent text-white text-[10px] font-bold uppercase tracking-widest"
            >
              Get Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="top" className="min-h-screen pt-32 pb-20 relative flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-paper/10 to-paper z-10" />
            <motion.img 
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "linear" }}
              src={heroSlides[currentSlide].image} 
              alt="Industrial Banner" 
              className="w-full h-full object-cover opacity-50 saturate-[0.3] contrast-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 text-center max-w-4xl px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="text-accent tracking-[0.6em] text-[10px] sm:text-xs font-bold uppercase mb-6 block">
                {heroSlides[currentSlide].tag}
              </span>
              <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-ink mb-8 leading-[0.95]">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-ink/60 text-base md:text-lg font-light mb-12 max-w-xl mx-auto leading-relaxed">
                {heroSlides[currentSlide].desc}
              </p>
              <a 
                href="#products" 
                className="inline-flex items-center gap-4 bg-accent text-white px-10 py-5 accent-glow uppercase tracking-[0.3em] text-[10px] font-black"
              >
                Explore Collection
                <ChevronRight size={14} />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
          {heroSlides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className="group flex flex-col items-center gap-2"
            >
              <div className={`h-px transition-all duration-700 ${currentSlide === i ? 'w-12 bg-accent' : 'w-6 bg-ink/10'}`} />
              <span className={`text-[8px] font-black tracking-widest transition-colors ${currentSlide === i ? 'text-accent' : 'text-ink/20'}`}>
                0{i + 1}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative bg-[#121212] overflow-hidden border-y border-white/5">
        {/* Background Texture & Blueprint Art */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Decorative Technical Circle */}
        <div className="absolute -top-24 -left-24 w-96 h-96 border border-white/5 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-[30rem] h-[30rem] border border-white/5 rounded-full animate-[spin_90s_linear_infinite_reverse] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {[
            { label: "Years of Engineering", value: 35, suffix: "+", icon: <AnimatedCompass />, desc: "Legacy of precision tools" },
            { label: "Hardware Lines", value: 900, suffix: "+", icon: <AnimatedHinges />, desc: "Bespoke component portfolio" },
            { label: "Global Partners", value: 12, suffix: "k", icon: <AnimatedGlobe />, desc: "Architectural trust worldwide" },
            { label: "ISO 9001 Compliance", value: 9001, suffix: "", icon: <AnimatedShield />, desc: "Standard of industrial excellence" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="group relative bg-white/[0.02] border border-white/5 p-6 rounded-sm hover:-translate-y-4 hover:border-accent/30 transition-all duration-500 overflow-hidden"
              style={{
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)"
              }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 transition-all duration-500 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_15px_rgba(238,78,78,0.5)]">
                  {stat.icon}
                </div>
                <div className="text-5xl md:text-6xl font-light text-white mb-3 tracking-tighter tabular-nums drop-shadow-2xl">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] text-accent uppercase tracking-[0.3em] font-black mb-4">
                  {stat.label}
                </div>
                <div className="h-px w-8 bg-white/10 group-hover:w-24 group-hover:bg-accent transition-all duration-700 mb-4" />
                <p className="text-white/30 text-[9px] uppercase tracking-widest leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
 
      {/* Advanced Products Ledger Section */}
      <section id="products" className="py-16 md:py-24 bg-paper relative overflow-hidden border-y border-ink/5">
        {/* Engineering Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="technical-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1C1C1C" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#technical-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            {/* Left: Interactive Display Area */}
            <div className="w-full lg:w-3/5 lg:sticky lg:top-32">
              <div className="relative aspect-square sm:aspect-square md:aspect-video lg:aspect-square overflow-hidden bg-ink/5 border border-ink/10 rounded-sm">
                {/* Product Image Stage */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProductIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={featuredProducts[activeProductIndex].image} 
                      alt={featuredProducts[activeProductIndex].title} 
                      className="w-full h-full object-cover grayscale brightness-90 contrast-110 hover:grayscale-0 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent opacity-80" />
                  </motion.div>
                </AnimatePresence>

                {/* Technical Overlay Graphics */}
                <div className="absolute top-6 left-6 flex flex-col gap-1">
                  <div className="text-accent text-[8px] font-black tracking-[0.5em] uppercase">Ref: {featuredProducts[activeProductIndex].ref}</div>
                  <div className="h-px w-16 bg-accent/50" />
                </div>
                <div className="absolute bottom-6 right-6 text-right">
                  <div className="text-ink/20 text-[10px] font-mono tracking-widest">MEASUREMENTS IN MM</div>
                  <div className="text-ink/40 text-[8px] font-mono">TOLERANCE +/- 0.02</div>
                </div>

                {/* Animated Dimension Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 100 100">
                  <motion.path 
                    key={activeProductIndex}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M 10 20 L 10 80 M 90 20 L 90 80 M 10 50 L 90 50" 
                    fill="none" 
                    stroke="#EE4E4E" 
                    strokeWidth="0.1" 
                  />
                </svg>

                {/* Progress Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {featuredProducts.map((_, idx) => (
                    <motion.div 
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-500 ${activeProductIndex === idx ? 'w-8 bg-accent' : 'w-2 bg-ink/20'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
                <div>
                  <h4 className="text-ink text-lg font-light tracking-tight uppercase leading-none">{featuredProducts[activeProductIndex].title}</h4>
                  <p className="text-ink/40 text-[10px] uppercase tracking-widest mt-2">{featuredProducts[activeProductIndex].specs}</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveProductIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)}
                    className="p-3 border border-ink/10 rounded-full hover:border-accent hover:text-accent transition-all text-ink/40"
                  >
                    <ChevronRight className="rotate-180 w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveProductIndex((prev) => (prev + 1) % featuredProducts.length)}
                    className="p-3 border border-ink/10 rounded-full hover:border-accent hover:text-accent transition-all text-ink/40"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: The Ledger / Catalog List */}
            <div className="w-full lg:w-2/5 flex flex-col gap-2 md:gap-4">
              <div className="mb-6 md:mb-8">
                <div className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-2 md:mb-4">The Collection</div>
                <h2 className="text-3xl md:text-4xl font-light text-ink tracking-tighter leading-tight uppercase text-balance">Architectural <br className="hidden md:block"/> Ledger</h2>
              </div>

              {[
                { 
                  id: "01", 
                  title: "Heavy Duty Hinges", 
                  specs: "250KG Load / Ball Bearing", 
                  desc: "Precision-engineered for oversized architectural entryways. Self-lubricating core." 
                },
                { 
                  id: "02", 
                  title: "Tower & Gate Bolts", 
                  specs: "Anti-Pick / Solid Billet", 
                  desc: "Security solutions for primary gates and reinforced doors. Machined from solid brass." 
                },
                { 
                  id: "03", 
                  title: "Bespoke Pull Handles", 
                  specs: "Custom Lengths / 3D Textures", 
                  desc: "Signature hardware for high-end cabinetry and main doors. Knurled and polished finishes." 
                },
                { 
                  id: "04", 
                  title: "Mortise Lock Sets", 
                  specs: "Low Friction / 5-Lever Mech", 
                  desc: "Internal latching systems with superior tactile feedback and silent operation." 
                },
                { 
                  id: "05", 
                  title: "Window Fasteners", 
                  specs: "Weather Sealed / Friction Stay", 
                  desc: "Slim-profile hardware for modern casement and sliding window systems." 
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative cursor-pointer"
                >
                  <div className="relative z-10 py-6 border-b border-ink/5 flex items-center justify-between group-hover:border-accent/50 transition-colors">
                    <div className="flex items-center gap-8">
                      <span className="text-ink/10 text-2xl font-black italic tracking-tighter group-hover:text-accent transition-colors">{item.id}</span>
                      <div>
                        <h3 className="text-xl font-light text-ink group-hover:text-accent transition-colors tracking-tight uppercase">{item.title}</h3>
                        <p className="text-[9px] text-ink/40 uppercase tracking-widest mt-1">{item.specs}</p>
                      </div>
                    </div>
                    <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      <ArrowRight className="text-accent w-5 h-5" />
                    </div>
                  </div>
                  
                  {/* Expansion Detail on Hover */}
                  <div className="max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-500 ease-in-out">
                    <div className="py-4 pl-16 pr-8">
                      <p className="text-ink/60 text-xs leading-relaxed font-light">
                        {item.desc}
                      </p>
                      <button className="mt-4 text-accent text-[9px] uppercase font-black tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                        Technical Catalog <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="mt-12 p-8 bg-accent border border-accent rounded-sm group cursor-pointer shadow-lg shadow-accent/10"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-ink text-xl font-bold uppercase tracking-tighter">Full 2026 Catalog</h4>
                    <p className="text-ink/60 text-[10px] uppercase tracking-widest font-bold">1,200+ Components / PDF v4.2</p>
                  </div>
                  <div className="w-12 h-12 bg-ink flex items-center justify-center rounded-full shadow-xl">
                    <ArrowRight className="text-accent w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Strip */}
      <section className="bg-gradient-to-r from-accent to-[#FF7B7B] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-paper text-2xl font-bold uppercase tracking-tighter italic">Technical Deep-Dive</h4>
            <p className="text-paper/70 text-xs font-semibold uppercase tracking-widest">Grade-A Brass • Zero Corrosion • Diamond Finish</p>
          </div>
          <div className="flex gap-12">
             <div className="text-center">
               <div className="text-paper font-bold text-2xl">100%</div>
               <div className="text-paper/60 text-[9px] uppercase font-bold tracking-[0.3em]">Recyclable</div>
             </div>
             <div className="text-center">
               <div className="text-paper font-bold text-2xl">0.05</div>
               <div className="text-paper/60 text-[9px] uppercase font-bold tracking-[0.3em]">Tolerance mm</div>
             </div>
          </div>
        </div>
      </section>

      <section id="process" className="relative bg-paper py-20 overflow-hidden border-y border-ink/5">
        {/* Factory Floor Ghost Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2000&auto=format&fit=crop" 
            alt="Factory Floor" 
            className="w-full h-full object-cover grayscale"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent text-[10px] uppercase tracking-[0.5em] font-black block mb-4"
            >
              The Journey of Brass
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-light text-ink tracking-tighter leading-none uppercase mb-6">
              Our <span className="text-accent italic font-bold">Craftsmanship</span> <br/> Process
            </h2>
            <p className="text-ink/60 text-base font-light leading-relaxed">
              Combining three decades of heritage with modern robotic precision to deliver hardware that lasts a lifetime. From molten alloys to hand-polished masterpieces.
            </p>
          </div>

          <div className="relative">
            {/* Liquid Brass Connecting Line */}
            <div className="absolute left-[31px] top-0 bottom-0 w-0.5 bg-ink/5 hidden md:block">
              <motion.div 
                className="w-full bg-accent shadow-[0_0_10px_rgba(238,78,78,0.3)]"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            <div className="space-y-20">
              {[
                {
                  id: "01",
                  title: "Material Selection",
                  desc: "We source only the highest grade lead-free brass to ensure structural integrity and zero corrosion. Every ingot is verified for purity.",
                  icon: <Flame className="w-6 h-6" />,
                  image: "https://images.unsplash.com/photo-1590117075775-603126f5f3e0?q=80&w=1200",
                  tag: "Sourcing & Melting"
                },
                {
                  id: "02",
                  title: "Precision Forging",
                  desc: "Using high-pressure forging and robotic CNC machining to eliminate internal flaws and ensure sub-micron tolerances of +/- 0.02mm.",
                  icon: <Hammer className="w-6 h-6" />,
                  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200",
                  tag: "Machining Core"
                },
                {
                  id: "03",
                  title: "Artisanal Finishing",
                  desc: "Every piece is hand-polished by master craftsmen to achieve our signature 'Royal Gold' luster, followed by nano-ceramic coating.",
                  icon: <Sparkles className="w-6 h-6" />,
                  image: "https://images.unsplash.com/photo-1635338165796-7a71be7bf2d1?q=80&w=1200",
                  tag: "Hand Buffing"
                },
                {
                  id: "04",
                  title: "Rigorous Testing",
                  desc: "Every batch undergoes high-pressure cycles, salt-spray resistance, and load-bearing tests to exceed ISO 9001 global standards.",
                  icon: <Search className="w-6 h-6" />,
                  image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?q=80&w=1200",
                  tag: "Quality Audit"
                }
              ].map((step, idx) => (
                <div key={idx} className="group relative flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                  {/* Icon Node */}
                  <div className="relative z-10 w-16 h-16 bg-white border border-ink/5 rounded-sm flex items-center justify-center group-hover:border-accent transition-all duration-500 shadow-xl">
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors" />
                    <div className="text-ink/30 group-hover:text-accent transition-colors">
                      {step.icon}
                    </div>
                    {/* Node Number */}
                    <div className="absolute -right-3 -top-3 w-6 h-6 bg-accent flex items-center justify-center rounded-full text-[8px] font-black text-white">
                      {step.id}
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="flex-1 flex flex-col md:flex-row gap-8 items-center">
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="flex-1 order-2 md:order-1"
                    >
                      <div className="text-accent text-[9px] font-black uppercase tracking-[0.4em] mb-2">{step.tag}</div>
                      <h3 className="text-2xl md:text-3xl font-light text-ink tracking-tight uppercase mb-4">{step.title}</h3>
                      <p className="text-ink/60 font-light leading-relaxed text-sm max-w-md">
                        {step.desc}
                      </p>
                      
                      <div className="mt-6 flex items-center gap-4 group/btn cursor-pointer">
                        <div className="w-6 h-px bg-accent/30 group-hover/btn:w-12 transition-all" />
                        <span className="text-accent text-[9px] font-black uppercase tracking-widest">Detail Specs</span>
                      </div>
                    </motion.div>

                    {/* Step Visual */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="w-full md:w-[320px] aspect-video md:aspect-[4/3] relative overflow-hidden rounded-sm border border-ink/5 order-1 md:order-2"
                    >
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover grayscale brightness-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent opacity-40" />
                      
                      {/* Step Overlay Info */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="h-0.5 w-full bg-ink/5 overflow-hidden">
                          <motion.div 
                            className="h-full bg-accent"
                            initial={{ x: '-100%' }}
                            whileInView={{ x: '0%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - The Architectural Collection */}
      <section id="gallery" className="py-32 bg-paper border-y border-ink/5 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] -z-0 rounded-full opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-20 text-center mx-auto md:text-left md:mx-0">
            <SectionTitle subtitle="Visual Portfolio" title="The Collection of Distinction" />
            <p className="text-ink/60 font-light text-lg leading-relaxed -mt-8">
              Explore our diverse portfolio of brass and hardware solutions, where engineering excellence meets architectural elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
            {[
              {
                title: "Imperial Series Hinge",
                category: "Architectural Fittings",
                image: "https://kind-salmon-14kwvb7w54.edgeone.app/Artboard%207.png?q=80&w=1200",
                span: "sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1" // Wide
              },
              {
                title: "Satin Lever Handle",
                category: "Hardware",
                image: "https://feminist-copper-vkcdmr8uyh.edgeone.app/Artboard%201%20(2).png?q=80&w=800",
                span: "sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1" // Standard
              },
              {
                title: "Vintage Tower Bolt",
                category: "Traditional Collection",
                image: "https://feminist-copper-vkcdmr8uyh.edgeone.app/Artboard%201.png?q=80&w=800",
                span: "sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1" // Standard
              },
              {
                title: "Artisan Knobs",
                category: "Cabinet Accents",
                image: "https://feminist-copper-vkcdmr8uyh.edgeone.app/Artboard%202.png?q=80&w=800",
                span: "sm:col-span-1 sm:row-span-2 lg:col-span-1 lg:row-span-2" // Tall
              },
              {
                title: "Curtain Finials",
                category: "Drapery Systems",
                image: "https://feminist-copper-vkcdmr8uyh.edgeone.app/Artboard%2012.png?q=80&w=800",
                span: "sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1" // Standard
              },
              {
                title: "Engraved Brass Path",
                category: "Custom Engraving",
                image: "https://feminist-copper-vkcdmr8uyh.edgeone.app/Artboard%204.png?q=80&w=800",
                span: "sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1" // Square
              },
              {
                title: "Minimalist Brass Hook",
                category: "Sanitary Fittings",
                image: "https://feminist-copper-vkcdmr8uyh.edgeone.app/Contact%20pins.png?q=80&w=800",
                span: "sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1" // Standard
              },
              {
                title: "Industrial Latch",
                category: "Heavy Duty",
                image: "https://feminist-copper-vkcdmr8uyh.edgeone.app/Artboard%207.png?q=80&w=1200",
                span: "sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1" // Wide
              },
              {
                title: "Casement Stay",
                category: "Window Systems",
                image: "https://feminist-copper-vkcdmr8uyh.edgeone.app/Artboard%206.png?q=80&w=800",
                span: "sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1" // Square
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`${item.span} group relative overflow-hidden bg-steel border border-ink/5 cursor-pointer h-[250px] sm:h-auto`}
              >
                {/* Desaturated Image */}
                <motion.img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover Overlays */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/30 transition-colors duration-500 radial-gradient" />
                
                {/* Shimmer Effect */}
                <motion.div 
                  initial={false}
                  whileHover={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-150%] pointer-events-none"
                />

                {/* Text Reveal - Simplified for mobile */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 transform translate-y-full lg:group-hover:translate-y-0 lg:transition-transform lg:duration-500 lg:ease-out bg-gradient-to-t from-paper/90 to-transparent flex flex-col justify-end h-full md:h-auto lg:h-full lg:block group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-accent text-[8px] font-black uppercase tracking-[0.4em] mb-1">{item.category}</p>
                  <h4 className="text-lg lg:text-xl font-light text-ink uppercase tracking-tighter">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - The Brass Journey Roadmap */}
      <section id="about" className="py-32 bg-[#FAFAFA] relative overflow-hidden">
        {/* Parallax Floating Hardware Background Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] opacity-[0.03] pointer-events-none"
        >
          <Layers className="w-64 h-64 text-accent transform rotate-12" strokeWidth={0.5} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-[5%] opacity-[0.03] pointer-events-none"
        >
          <Settings className="w-80 h-80 text-accent transform -rotate-12" strokeWidth={0.5} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-32">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-accent text-[10px] uppercase tracking-[0.6em] font-black block mb-4"
            >
              The Narrative
            </motion.span>
            <h2 className="text-4xl md:text-7xl font-light text-ink tracking-tighter uppercase">Our <span className="text-accent italic font-bold">Heritage</span> Thread</h2>
          </div>

          <div className="relative">
            {/* The Brass Thread SVG */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 hidden lg:block">
              <svg width="32" height="100%" viewBox="0 0 32 1000" preserveAspectRatio="none" className="h-full">
                <motion.path 
                  d="M 16 0 Q 32 250 16 500 Q 0 750 16 1000" 
                  fill="none" 
                  stroke="#EE4E4E" 
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ margin: "-100px" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </svg>
            </div>

            <div className="space-y-12 md:space-y-48">
              {[
                {
                  id: "1993",
                  title: "Our Legacy Begins",
                  tag: "The Foundation",
                  desc: "Born in a humble Rajkot workshop, Ashok Brass Industries was founded on a singular vision: to translate the raw strength of brass into architectural precision. Our first hinges were hand-cast with a commitment to durability that remains our standard today.",
                  icon: <History className="w-8 h-8 md:w-12 md:h-12" />,
                  alignment: "left"
                },
                {
                  id: "Infrastructure",
                  title: "Engineered for Scale",
                  tag: "The Facility",
                  desc: "As demand grew, so did our technical ambition. We transitioned to high-capacity CNC precision lines, integrating robotic machining that ensures sub-micron accuracy. Today, our facility stands as a beacon of high-end manufacturing efficiency.",
                  icon: <Settings className="w-8 h-8 md:w-12 md:h-12" />,
                  alignment: "right"
                },
                {
                  id: "Quality",
                  title: "Uncompromising Standards",
                  tag: "The ISO Seal",
                  desc: "Quality is not an inspection; it is an obsession. With ISO 9001 certification, every batch undergoes accelerated salt-spray and 500k-cycle load tests. Our 'Quality Seal' is a promise of industrial-grade perfection.",
                  icon: <ShieldCheck className="w-8 h-8 md:w-12 md:h-12" />,
                  alignment: "left"
                },
                {
                  id: "Export",
                  title: "Beyond Borders",
                  tag: "Global Reach",
                  desc: "Through 12,000+ global partnerships, we have carried Indian manufacturing excellence to continents across the globe. Our hardware secures doors in luxury skyscrapers from Dubai to New York.",
                  icon: <Globe className="w-8 h-8 md:w-12 md:h-12" />,
                  alignment: "right"
                },
                {
                  id: "2030",
                  title: "The Next Generation",
                  tag: "Vision 2030",
                  desc: "We are pivoting toward a sustainable future. Our initiatives include lead-free alloy recycling and the integration of smart-latch technologies—ensuring that the hardware of tomorrow remains as timeless as our heritage.",
                  icon: <Zap className="w-8 h-8 md:w-12 md:h-12" />,
                  alignment: "left"
                }
              ].map((stage, idx) => (
                <div key={idx} className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${stage.alignment === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content Column */}
                  <motion.div 
                    initial={{ opacity: 0, x: stage.alignment === 'left' ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 text-center lg:text-left"
                  >
                    <div className="text-accent font-mono text-sm mb-4 tracking-widest">{stage.id}</div>
                    <div className="text-ink/30 text-[10px] font-black uppercase tracking-[0.4em] mb-4">{stage.tag}</div>
                    <h3 className="text-2xl md:text-3xl lg:text-5xl font-light text-ink tracking-tighter uppercase mb-4 md:mb-6 leading-[1.1]">{stage.title}</h3>
                    <p className="text-ink/60 font-light leading-relaxed text-sm md:text-base lg:text-lg max-w-xl mx-auto lg:mx-0">
                      {stage.desc}
                    </p>
                  </motion.div>

                  {/* Graphic Column */}
                  <div className="flex-1 flex justify-center">
                    <motion.div 
                      initial={{ scale: 0.5, rotateY: 90 }}
                      whileInView={{ scale: 1, rotateY: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, type: "spring", stiffness: 50 }}
                      className="w-48 h-48 md:w-64 md:h-64 bg-white border border-accent/20 flex items-center justify-center rounded-sm shadow-2xl relative group"
                    >
                      <div className="absolute inset-0 bg-accent/5 blur-xl group-hover:bg-accent/10 transition-all opacity-50" />
                      <div className="text-accent group-hover:scale-110 transition-transform duration-500">
                        {stage.icon}
                      </div>
                      
                      {/* Technical Detail Lines */}
                      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-accent/30" />
                      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-accent/30" />
                      
                      {/* Floating Badge */}
                      <div className="absolute -bottom-4 -right-4 bg-ink px-4 py-2 text-white text-[8px] font-black uppercase tracking-widest shadow-xl">
                        {stage.tag}
                      </div>
                    </motion.div>
                  </div>

                  {/* Desktop Center Connector */}
                  <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-white z-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* B2B Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-steel/30">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-px bg-ink/5 border border-ink/5 overflow-hidden">
          {/* Left: Info */}
          <div className="bg-paper p-8 sm:p-12 md:p-20 flex flex-col justify-center">
            <h2 className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Bulk Procurement</h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tighter text-ink mb-8 leading-[1.1] md:leading-[0.9]">B2B Portal <br/> & Inquiries.</h3>
            
            <div className="space-y-6 md:space-y-8 mt-4">
               <div className="flex flex-col">
                 <span className="text-ink/40 text-[9px] uppercase tracking-widest font-bold mb-1">Headquarters</span>
                 <span className="text-sm font-bold text-ink">Industrial Estate, Rajkot, India</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-ink/40 text-[9px] uppercase tracking-widest font-bold mb-1">Commercial Line</span>
                 <span className="text-sm font-bold text-accent">+91 (281) 455-BRASS</span>
               </div>
               <div className="flex items-center gap-4 bg-ink/5 p-3 rounded-sm border border-ink/5 self-start pr-6">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-ink/60">WhatsApp Inquiry Active</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-8 sm:p-12 md:p-20 flex flex-col justify-center">
            <form className="space-y-8 md:space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                <div className="relative group">
                  <input type="text" id="name" className="w-full bg-transparent border-b border-ink/10 py-3 focus:border-accent outline-none transition-colors peer text-ink text-sm font-medium" placeholder=" " />
                  <label htmlFor="name" className="absolute left-0 top-3 text-ink/30 peer-focus:text-accent peer-focus:-top-4 transition-all text-[10px] uppercase tracking-widest font-bold pointer-events-none">Company Name</label>
                </div>
                <div className="relative group">
                  <input type="email" id="email" className="w-full bg-transparent border-b border-ink/10 py-3 focus:border-accent outline-none transition-colors peer text-ink text-sm font-medium" placeholder=" " />
                  <label htmlFor="email" className="absolute left-0 top-3 text-ink/30 peer-focus:text-accent peer-focus:-top-4 transition-all text-[10px] uppercase tracking-widest font-bold pointer-events-none">Work Email</label>
                </div>
              </div>
              
              <div className="relative group">
                <select id="service" className="w-full bg-transparent border-b border-ink/10 py-3 focus:border-accent outline-none transition-colors peer text-ink/60 text-sm font-medium appearance-none">
                  <option value="">Inquiry Type</option>
                  <option value="oem">OEM Manufacturing</option>
                  <option value="distributor">Distribution Rights</option>
                  <option value="project">Real Estate Project</option>
                </select>
              </div>

              <div className="relative group">
                <textarea id="message" rows={3} className="w-full bg-transparent border-b border-ink/10 py-3 focus:border-accent outline-none transition-colors peer text-ink text-sm font-medium resize-none" placeholder=" " />
                <label htmlFor="message" className="absolute left-0 top-3 text-ink/30 peer-focus:text-accent peer-focus:-top-4 transition-all text-[10px] uppercase tracking-widest font-bold pointer-events-none">Quantity & Requirements</label>
              </div>

              <button type="submit" className="w-full bg-ink text-white py-5 uppercase tracking-[0.3em] font-black text-[10px] hover:bg-accent transition-colors flex items-center justify-center gap-4 group">
                Request Quotation
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-paper py-16 md:py-24 pb-12 border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-6">
                <img 
                  src="https://fancy-harlequin-ipyvwodwrb.edgeone.app/PT_LOGO-01.png" 
                  alt="PRIMETURN COMPONENTS" 
                  className="h-10 md:h-12 w-auto"
                />
              </div>
              <p className="text-ink/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed mb-6 max-w-xs">
                Redefining the landscape of industrial brass hardware through precision engineering.
              </p>
            </div>
            
            <div>
              <h4 className="text-ink text-[10px] uppercase tracking-[0.3em] font-black mb-8">Hardware</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-ink/40 hover:text-ink text-[10px] uppercase tracking-widest font-bold transition-colors">Precision Hinges</a></li>
                <li><a href="#" className="text-ink/40 hover:text-ink text-[10px] uppercase tracking-widest font-bold transition-colors">Tower Bolts</a></li>
                <li><a href="#" className="text-ink/40 hover:text-ink text-[10px] uppercase tracking-widest font-bold transition-colors">Gate Hardware</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-ink text-[10px] uppercase tracking-[0.3em] font-black mb-8">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-ink/40 hover:text-ink text-[10px] uppercase tracking-widest font-bold transition-colors">Project Gallery</a></li>
                <li><a href="#" className="text-ink/40 hover:text-ink text-[10px] uppercase tracking-widest font-bold transition-colors">Spec Sheets</a></li>
                <li><a href="#" className="text-ink/40 hover:text-ink text-[10px] uppercase tracking-widest font-bold transition-colors">B2B Portal</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-ink text-[10px] uppercase tracking-[0.3em] font-black mb-8">Bulk Support</h4>
              <a 
                href="#" 
                className="inline-flex items-center gap-3 bg-paper border border-ink/10 px-6 py-4 text-[10px] text-ink uppercase tracking-widest font-bold hover:border-accent transition-all"
              >
                WhatsApp Portal
              </a>
              <p className="mt-4 text-[9px] text-ink/30 uppercase tracking-[0.2em] font-bold">Responds within 1 hour</p>
            </div>
          </div>
          
          <div className="pt-12 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-[9px] text-ink/30 uppercase tracking-[0.3em] font-bold">© 2026 Primeturn Brass Industry.</span>
            <div className="flex gap-8">
              <a href="#" className="text-[9px] text-ink/30 hover:text-ink uppercase tracking-widest font-bold transition-colors">Privacy</a>
              <a href="#" className="text-[9px] text-ink/30 hover:text-ink uppercase tracking-widest font-bold transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/919988776655" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-[60] bg-white border border-ink/10 p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group"
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
        <MessageSquare size={18} className="sm:size-[20px]" />
      </div>
      <div className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 ease-in-out md:block hidden">
        <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-ink px-2">Whatapp Us</span>
      </div>
    </div>
  </a>
);

export default function App() {
  return (
    <>
      <MainContent />
      <WhatsAppButton />
    </>
  );
}
