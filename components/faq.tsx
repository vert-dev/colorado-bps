"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "What is Colorado BPS and when does it take effect?",
      answer:
        "Colorado Building Performance Standard (BPS) is a state law (HB 21-1286, passed in 2021) requiring commercial and institutional buildings to meet energy performance standards or report energy use data. It takes effect January 1, 2025, with first compliance deadlines in 2028-2030 depending on building type and size.",
    },
    {
      question: "What's the difference between Tier 1 and Tier 2?",
      answer:
        "Tier 1 covers commercial buildings ≥35,000 sq ft and must meet Energy Use Intensity (EUI) performance targets by June 2028-2030 (based on size). Penalties apply: $5,000 + $1/sq ft annually until compliant. Tier 2 covers commercial buildings 20-35k sq ft and ALL institutional buildings ≥35k sq ft. Tier 2 is reporting-only—NO performance targets, NO penalties. Just benchmark and report energy data by July 2028.",
    },
    {
      question: "What are institutional buildings and why are they Tier 2?",
      answer:
        "Institutional buildings include schools, colleges, hospitals, government buildings, libraries, and community centers. Oregon designated ALL institutional buildings ≥35,000 sq ft as Tier 2 regardless of size, recognizing public entities face different budget constraints. This means a 200,000 sq ft school only reports energy data—no performance requirements, no penalties.",
    },
    {
      question: "How do I know my building's EUI and EUIt?",
      answer:
        "EUI (Energy Use Intensity) is your building's actual energy consumption measured in kBtu per square foot per year, calculated using 12 months of utility bills in EPA's ENERGY STAR Portfolio Manager. EUIt (Energy Use Intensity Target) is Oregon's performance target for your building type, set by Colorado Energy Office based on median or better performance. If your EUI is less than or equal to your EUIt, you comply. If EUI exceeds EUIt, you must implement energy improvements.",
    },
    {
      question: "What happens if my building doesn't meet the EUIt target?",
      answer:
        "For Tier 1 buildings: You must complete an ASHRAE Level 2 energy audit to identify efficiency improvements (ECMs - Energy Conservation Measures), then implement those improvements to reduce your EUI below your EUIt. You can apply for ECAPP ($2M state fund) and BERI ($12M federal grants) to offset costs. If you don't achieve compliance by your deadline, penalties of $5,000 + $1/sq ft apply annually until you comply. For Tier 2 buildings: This doesn't apply—you only report data, no performance targets required.",
    },
    {
      question: "What are ECAPP and BERI incentives?",
      answer:
        "ECAPP (Early Compliance Assistance Pilot Program) is a $2M Oregon state fund (2025-2027) providing competitive grants for energy audits and early compliance projects. BERI (Building Efficiency & Resilience Implementation) is a $12M federal CERTA program for major energy efficiency implementations like HVAC upgrades and building envelope improvements. Both are competitive—apply early to maximize your chances. Projects achieving early compliance have the best shot at funding.",
    },
    {
      question: "How long does it take to achieve compliance?",
      answer:
        "Plan 2-3 years minimum. Energy audits take 3-6 months. Applying for grants takes 3-6 months. Capital improvement projects (HVAC, lighting, envelope) take 6-18 months. After improvements, you need 12 months of utility data to verify your EUI meets the target. Starting early avoids rushed decisions, higher costs, and penalties. Buildings with June 2028 deadlines should begin in 2025-2026.",
    },
    {
      question: "Do I need to hire an engineer or energy auditor?",
      answer:
        "For benchmarking (Tier 2), you can handle this internally or hire a consultant to input utility data into Portfolio Manager. For Tier 1 buildings exceeding EUIt, you'll need a qualified energy auditor (certified by ASHRAE or BPI) to perform the ASHRAE Level 2 audit. Implementation may require mechanical engineers, contractors, and project managers depending on scope. Many firms offer turnkey compliance services handling everything from audits to grant applications to construction management.",
    },
    {
      question: "What are the penalties for non-compliance?",
      answer:
        "Tier 1 only: $5,000 base fine + $1.00 per square foot annually until you achieve compliance. For example, a 100,000 sq ft building faces $105,000/year in penalties. Penalties accrue every year you remain non-compliant—there is no cap. Tier 2: NO penalties. Tier 2 is reporting-only, so failure to report may result in notices but no financial penalties.",
    },
    {
      question: "Can I get an exemption or extension?",
      answer:
        "Colorado BPS includes exemptions for certain building types (industrial, manufacturing, agricultural, data centers, etc.). Check OAR 330-140 administrative rules for the complete list. Extensions may be available in cases of financial hardship, planned demolition, or technical infeasibility, but require formal application to Colorado Energy Office with supporting documentation. Extensions are not guaranteed and must be approved case-by-case.",
    },
    {
      question: "Do Portland buildings have additional requirements?",
      answer:
        "Portland may have local energy benchmarking or building performance ordinances in addition to state requirements. Check with the City of Portland Bureau of Planning and Sustainability to understand if supplementary local regulations apply. Coordinate state and local compliance strategies to avoid duplication and streamline reporting.",
    },
    {
      question: "How much does compliance cost?",
      answer:
        "Costs vary widely based on building condition and current EUI. Benchmarking (Tier 2): $500-$2,000. ASHRAE Level 2 audit: $5,000-$25,000 depending on building size. Energy improvements: Highly variable—$50,000-$500,000+ depending on needed upgrades. However, ECAPP/BERI grants can offset 30-60% of costs, and improved energy efficiency reduces operating expenses by 15-30% annually. Many compliance projects pay for themselves in 3-7 years through energy savings alone.",
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
