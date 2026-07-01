'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Workflow,
  Database,
  Globe,
  Cpu,
  ArrowRight,
  Zap,
  MessageSquare,
  Sparkles,
  Shield,
  AlertCircle,
  Check,
  ChevronDown,
  Play,
  Star,
  Rocket,
  Lock,
  Headphones,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// ─── FAQ Data (Honest) ───────────────────────────────────
const faqs = [
  {
    q: 'What\'s actually working right now?',
    a: 'The core AI chatbot is live — it answers questions from a knowledge base using AI, shows a real-time workflow pipeline, and gracefully handles questions it can\'t answer. You can try it right now in our live demo. We\'re in early access, so n8n/Make.com integration, self-hosting, and analytics are on the roadmap.',
  },
  {
    q: 'How is Solvio different from Intercom or Zendesk AI?',
    a: 'Solvio is being built specifically for automation-first teams — teams already using n8n and Make.com. Our vision is a support bot that doesn\'t just answer questions, it triggers your existing workflows (create tickets, update CRMs, send notifications). Plus, we\'re building a self-hosted option for data privacy. Generic tools don\'t do this.',
  },
  {
    q: 'Can I self-host Solvio on my own servers?',
    a: 'Self-hosting is on our roadmap for Pro and Enterprise plans. This is critical for GDPR compliance, healthcare (HIPAA), and finance companies. If this is important to you, join the waitlist and tell us — it helps us prioritize.',
  },
  {
    q: 'How does the knowledge base work?',
    a: 'Right now, the demo uses keyword matching to find relevant answers. We\'re building full RAG (Retrieval-Augmented Generation) with vector embeddings — so you\'ll be able to upload PDFs, docs, and URLs, and the bot will do semantic search to find the best match. No hallucinations — answers come only from YOUR docs.',
  },
  {
    q: 'What happens when the bot can\'t answer?',
    a: 'The bot tells the user it doesn\'t have the information and suggests contacting a human agent. On our roadmap: automatic ticket creation in Zendesk/Intercom, Slack notifications, and configurable handoff workflows via n8n/Make.com.',
  },
  {
    q: 'What\'s on the roadmap?',
    a: 'Our top priorities based on early feedback: (1) Real RAG with vector search, (2) n8n & Make.com webhook integration, (3) Embeddable chat widget for your website, (4) Zendesk/Intercom handoff, (5) Self-hosted Docker image, (6) Analytics dashboard. Early adopters get direct input into what we build next.',
  },
];

// ─── Pipeline Steps (visual only) ─────────────────────────
const pipelineSteps = [
  { icon: <Globe className="w-5 h-5" />, label: 'Webhook', desc: 'Receives user message', color: 'emerald' },
  { icon: <Database className="w-5 h-5" />, label: 'Knowledge Base', desc: 'Searches your docs', color: 'amber' },
  { icon: <Cpu className="w-5 h-5" />, label: 'AI Agent', desc: 'Generates grounded answer', color: 'violet' },
  { icon: <MessageSquare className="w-5 h-5" />, label: 'Response', desc: 'Sends reply + takes action', color: 'sky' },
];

// ─── Roadmap Items ─────────────────────────────────────────
const liveFeatures = [
  { icon: <Database className="w-4 h-4" />, title: 'AI-Powered Chat', desc: 'Answers from knowledge base using AI' },
  { icon: <Workflow className="w-4 h-4" />, title: 'Pipeline Visualization', desc: 'Real-time n8n-style workflow animation' },
  { icon: <AlertCircle className="w-4 h-4" />, title: 'Graceful Fallback', desc: 'Admits when it can\'t help, suggests human contact' },
  { icon: <Zap className="w-4 h-4" />, title: 'Quick Actions', desc: 'Pre-built questions for instant answers' },
];

const roadmapFeatures = [
  { icon: <Database className="w-4 h-4" />, title: 'RAG with Vector Search', desc: 'Upload PDFs/docs → semantic search → accurate answers', badge: 'Next' },
  { icon: <Workflow className="w-4 h-4" />, title: 'n8n & Make.com Integration', desc: 'Trigger workflows directly from chat', badge: 'Next' },
  { icon: <MessageSquare className="w-4 h-4" />, title: 'Embeddable Widget', desc: 'One line of code to add Solvio to your site', badge: 'Planned' },
  { icon: <Headphones className="w-4 h-4" />, title: 'Zendesk/Intercom Handoff', desc: 'Auto-create tickets when bot can\'t help', badge: 'Planned' },
  { icon: <Lock className="w-4 h-4" />, title: 'Self-Hosted Option', desc: 'Docker image for GDPR/HIPAA compliance', badge: 'Planned' },
  { icon: <TrendingUp className="w-4 h-4" />, title: 'Analytics Dashboard', desc: 'Resolution rate, topics, accuracy tracking', badge: 'Planned' },
];

// ─── Main Component ────────────────────────────────────────
export default function Home() {
  const [wlEmail, setWlEmail] = useState('');
  const [wlCompany, setWlCompany] = useState('');
  const [wlStatus, setWlStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [wlMessage, setWlMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wlEmail.trim()) return;
    setWlStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: wlEmail, company: wlCompany }),
      });
      const data = await res.json();
      if (res.ok) {
        setWlStatus('success');
        setWlMessage(data.message);
      } else {
        setWlStatus('error');
        setWlMessage(data.error || 'Something went wrong');
      }
    } catch {
      setWlStatus('error');
      setWlMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ─── Navbar ─── */}
      <nav className="border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Workflow className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">Solvio</span>
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-[10px] px-2">
              <Rocket className="w-3 h-3 mr-1" />
              Early Access
            </Badge>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">What's Live</a>
            <a href="#roadmap" className="hover:text-slate-900 transition-colors">Roadmap</a>
            <a href="/demo" className="hover:text-slate-900 transition-colors">Live Demo</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </div>
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join Waitlist
          </Button>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-white" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="outline" className="mb-6 border-emerald-200 text-emerald-700 bg-emerald-50 gap-1.5 px-3 py-1">
              <Sparkles className="w-3.5 h-3.5" />
              Built for n8n &amp; Make.com teams
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              AI Support Bot<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                That Actually Does Things
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-4 leading-relaxed">
              Don&apos;t just answer questions — resolve them. Solvio connects your knowledge base to AI and automation workflows, so your support bot can take action, not just talk.
            </p>
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 max-w-lg mx-auto mb-8">
              <Rocket className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
              <strong>Early Access:</strong> Core chatbot is live. n8n integration &amp; self-hosting on the roadmap. Early adopters shape what we build next.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 gap-2 px-8"
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Early Access
                <ArrowRight className="w-4 h-4" />
              </Button>
              <a href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <Play className="w-4 h-4" />
                  Try Live Demo
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Pipeline Visual ─── */}
      <section className="py-12 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">See How It Works</h2>
            <p className="text-sm text-slate-500">Every message flows through a 4-step AI pipeline</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
            {pipelineSteps.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center w-32 sm:w-36"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
                    step.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                    step.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                    step.color === 'violet' ? 'bg-violet-100 text-violet-600' :
                    'bg-sky-100 text-sky-600'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="text-sm font-semibold text-slate-800">{step.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{step.desc}</div>
                </motion.div>
                {i < pipelineSteps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-300 hidden sm:block mx-2 shrink-0" />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/demo">
              <Button variant="outline" className="gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                <Play className="w-4 h-4" />
                Try This Live
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ─── What's Live ─── */}
      <section id="features" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-3">
              <Check className="w-3 h-3 mr-1" />
              Live Now
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">What&apos;s Working Today</h2>
            <p className="text-slate-600 max-w-lg mx-auto">These features are live and working in the demo right now. Try them.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {liveFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="p-5 h-full border-emerald-200 bg-emerald-50/30">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                    {feat.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1.5">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Roadmap ─── */}
      <section id="roadmap" className="py-16 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 mb-3">
              <Rocket className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">The Roadmap</h2>
            <p className="text-slate-600 max-w-lg mx-auto">We&apos;re building these features next. Early adopters get direct input into what we prioritize.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roadmapFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="p-5 h-full border-slate-200 hover:border-amber-200 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      {feat.icon}
                    </div>
                    {feat.badge && (
                      <Badge className={`text-[10px] ${feat.badge === 'Next' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        {feat.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1.5">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Demo CTA Banner ─── */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="p-8 sm:p-10 bg-gradient-to-br from-emerald-600 to-teal-700 border-0 text-white text-center shadow-xl shadow-emerald-500/20">
            <Bot className="w-10 h-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Try the Live Demo</h2>
            <p className="text-emerald-100 max-w-md mx-auto mb-6">
              The core chatbot is live right now. Ask questions, watch the pipeline animate, and see real AI-powered answers from the knowledge base.
            </p>
            <a href="/demo">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-md gap-2 px-8">
                <Play className="w-4 h-4" />
                Launch Live Demo
              </Button>
            </a>
          </Card>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-16 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Simple, Transparent Pricing</h2>
            <p className="text-slate-600 max-w-lg mx-auto">Start free. Scale as you grow. Early adopters get 3 months free on any paid plan.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: 'Starter',
                price: 'Free',
                period: '',
                desc: 'For trying Solvio on a side project',
                features: ['500 conversations/mo', '1 knowledge base', '1 chat widget', 'Community support', 'Cloud-hosted only'],
                cta: 'Join Waitlist',
                highlight: false,
              },
              {
                name: 'Pro',
                price: '$49',
                period: '/mo',
                desc: 'For growing teams that need real support automation',
                features: ['5,000 conversations/mo', '5 knowledge bases', '3 chat widgets', 'Priority email support', 'Self-hosted option (roadmap)', 'n8n & Make.com integration (roadmap)', 'Custom branding', 'Analytics dashboard (roadmap)'],
                cta: 'Get Early Access',
                highlight: true,
              },
              {
                name: 'Enterprise',
                price: '$149',
                period: '/mo',
                desc: 'For companies with serious support volume',
                features: ['Unlimited conversations', 'Unlimited knowledge bases', 'Unlimited widgets', '24/7 phone support', 'Self-hosted included (roadmap)', 'SSO & RBAC', 'White-label', 'Dedicated account manager', 'SLA guarantee'],
                cta: 'Contact Sales',
                highlight: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className={`p-6 h-full flex flex-col ${plan.highlight ? 'border-emerald-400 border-2 shadow-lg shadow-emerald-500/10 relative' : 'border-slate-200'}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-emerald-600 text-white px-3 py-0.5 text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                      {plan.period && <span className="text-slate-500 text-sm">{plan.period}</span>}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{plan.desc}</p>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm text-slate-600">
                        {feat.includes('roadmap') ? (
                          <Rocket className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        )}
                        {feat.replace(' (roadmap)', '')}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.highlight ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card key={i} className="border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-medium text-slate-900 text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Waitlist CTA ─── */}
      <section id="waitlist" className="py-20 bg-slate-50/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Get Early Access</h2>
            <p className="text-slate-600 mb-4 max-w-md mx-auto">
              Join the waitlist and be among the first to use Solvio. Early adopters get 3 months free on any paid plan and direct input into the roadmap.
            </p>
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 max-w-md mx-auto mb-8">
              <Rocket className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
              The core chatbot works today. RAG, n8n integration &amp; self-hosting are next on the roadmap.
            </p>

            {wlStatus === 'success' ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <Check className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-bold text-emerald-800 text-lg mb-1">You&apos;re on the list!</h3>
                <p className="text-emerald-700 text-sm">{wlMessage}</p>
                <p className="text-emerald-600 text-xs mt-2">We&apos;ll reach out when your spot is ready.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleWaitlist} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={wlEmail}
                    onChange={(e) => setWlEmail(e.target.value)}
                    required
                    className="flex-1 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20"
                  />
                  <Input
                    type="text"
                    placeholder="Company (optional)"
                    value={wlCompany}
                    onChange={(e) => setWlCompany(e.target.value)}
                    className="flex-1 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={wlStatus === 'loading' || !wlEmail.trim()}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 gap-2"
                  size="lg"
                >
                  {wlStatus === 'loading' ? 'Joining...' : 'Join the Waitlist'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
                {wlStatus === 'error' && (
                  <p className="text-red-500 text-sm mt-2">{wlMessage}</p>
                )}
                <p className="text-xs text-slate-400 mt-3">No spam. Unsubscribe anytime. Early adopters get 3 months free.</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-slate-100 bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Workflow className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-slate-700">Solvio</span>
          </div>
          <p>Support, Solved.</p>
          <p>Powered by Solvio AI</p>
        </div>
      </footer>
    </div>
  );
}
