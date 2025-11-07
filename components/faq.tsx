"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "What is Colorado BPS and when does it take effect?",
      answer:
        "Colorado Building Performance Standard (BPS) is a state law (HB 21-1286, passed in 2021) requiring buildings ≥50,000 sq ft to benchmark energy use annually and meet performance targets through one of three compliance pathways. Benchmarking enforcement began January 1, 2024. Critical deadline: December 31, 2025 for energy audit + compliance plan + pathway selection.",
    },
    {
      question: "Which buildings are covered?",
      answer:
        "All buildings ≥50,000 sq ft are covered, regardless of type—commercial, institutional, residential (multifamily), government buildings, etc. There is a single threshold with no tier structure. Buildings must benchmark annually (August 1 deadline) and meet performance targets by December 31, 2026 (interim) and December 31, 2030 (final).",
    },
    {
      question: "What are the three compliance pathways?",
      answer:
        "Colorado offers three pathways: (1) Energy Efficiency - reduce Site EUI by 7% (2026) and 20% (2030); (2) GHG Reduction - reduce greenhouse gas emissions by 7% (2026) and 20% (2030); (3) Standard % Reduction - fixed 13% (interim) and 29% (final) reductions, available only if 2021 baseline EUI is 29%+ above target. You must select a pathway by December 31, 2025, but can change it in future cycles.",
    },
    {
      question: "How do I benchmark my building?",
      answer:
        "Use EPA's ENERGY STAR Portfolio Manager to track energy use. Input 12 months of utility data (electricity, natural gas, etc.) to calculate your building's Site EUI (kBtu/sq ft/year). Connect Portfolio Manager to Colorado's BEAM Portal via Web Services, then submit annual benchmarking report + $100 fee by August 1 each year. Benchmarking is required regardless of which compliance pathway you choose.",
    },
    {
      question: "What is the 2021 baseline and why does it matter?",
      answer:
        "Your 2021 baseline is your building's energy use or GHG emissions from calendar year 2021. This baseline is fixed and used to calculate your 7% (2026) and 20% (2030) reduction targets. If you don't have 2021 data, Colorado Energy Office provides alternative baseline calculation methods. Your pathway selection and compliance status depend on this baseline.",
    },
    {
      question: "What happens if I don't meet the targets?",
      answer:
        "If you don't meet interim targets by December 31, 2026, monthly penalties begin June 1, 2027. If you don't meet final targets by December 31, 2030, monthly penalties begin June 1, 2031. Penalty amounts are determined based on degree of non-compliance. To avoid penalties, complete energy audits early, implement improvements, and track progress monthly.",
    },
    {
      question: "Can I get an exemption or extension?",
      answer:
        "Colorado BPS includes exemptions for certain building types (industrial, manufacturing, agricultural, data centers, etc.). Check with Colorado Energy Office for the complete list. Extensions may be available for financial hardship, planned demolition, or technical infeasibility, but require formal application with supporting documentation. Extensions are not guaranteed and must be approved case-by-case.",
    },
    {
      question: "How long does it take to achieve compliance?",
      answer:
        "Plan 18-24 months minimum. Energy audits take 3-6 months. Applying for federal IRA tax credits takes 2-4 months. Capital improvement projects (HVAC, envelope, controls) take 6-18 months. After improvements, you need 12 months of utility data to verify you've met targets. Starting now for the December 2025 audit deadline is critical—delayed starts lead to rushed decisions and higher costs.",
    },
    {
      question: "Do I need to hire an engineer or energy auditor?",
      answer:
        "For benchmarking, you can handle data entry internally or hire a consultant. For pathway selection and compliance planning, you'll likely need a qualified energy auditor (certified by ASHRAE or BPI) to assess your building and recommend the best pathway. Implementation may require mechanical engineers, contractors, and project managers depending on scope. Many firms offer turnkey compliance services from audit through construction.",
    },
    {
      question: "What are the penalties for non-compliance?",
      answer:
        "Benchmarking non-compliance: $500 (first occurrence), $2,000 (subsequent occurrences). Performance standard non-compliance: Monthly penalties begin June 1, 2027 (interim targets) and June 1, 2031 (final targets). Penalty amounts are determined by degree of non-compliance—exact amounts are set by Colorado Energy Office based on shortfall from targets.",
    },
    {
      question: "Are there incentives to help pay for compliance?",
      answer:
        "Colorado has limited state grant funding compared to other states. Focus on federal incentives: IRA Tax Credit 179D (up to $5/sqft for energy efficiency), IRA 45L (new construction), and utility rebate programs from Xcel Energy, Black Hills Energy, and others. Check Colorado Energy Office's Building Owner Portal for current incentive listings and technical assistance programs.",
    },
    {
      question: "How much does compliance cost?",
      answer:
        "Costs vary widely. Annual benchmarking: $500-$2,000. Energy audit: $5,000-$25,000 depending on building size. Energy improvements: $50,000-$500,000+ depending on current condition and needed upgrades. However, federal IRA tax credits can offset 20-50% of costs, and improved energy efficiency reduces operating expenses by 15-30% annually. Many compliance projects pay for themselves in 4-8 years through energy savings alone.",
    },
  ]

  return (
    <section id="faq" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-slate-600 mb-12">
            Common questions about Colorado Building Performance Standard compliance
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-slate-200 rounded-lg px-6 bg-white"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline text-slate-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-4 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 bg-colorado-blue-50 border border-colorado-blue-200 rounded-lg text-center">
            <h3 className="font-semibold text-colorado-blue-800 mb-2">Still Have Questions?</h3>
            <p className="text-sm text-colorado-blue-700 mb-4">
              Schedule a free consultation to get personalized answers about your building's compliance path.
            </p>
            <button
              className="bg-colorado-blue-500 hover:bg-colorado-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium"
              onClick={() => document.getElementById("compliance-help")?.scrollIntoView({ behavior: "smooth" })}
            >
              Schedule Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
