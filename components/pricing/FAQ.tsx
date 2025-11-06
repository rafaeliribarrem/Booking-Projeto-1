import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I try a class before committing?",
    answer:
      "Absolutely! Our Drop-In option is perfect for first-timers. No commitment required. Just book a class and experience our studio.",
  },
  {
    question: "Do class packs expire?",
    answer:
      "The 5-Class Pack is valid for 3 months from purchase date, giving you plenty of flexibility to attend classes at your own pace.",
  },
  {
    question: "Can I cancel my unlimited membership?",
    answer:
      "Yes, you can cancel anytime. Your access continues until the end of your billing period, so you won't lose any days you've already paid for.",
  },
  {
    question: "What types of yoga classes do you offer?",
    answer:
      "We offer a variety of classes including Vinyasa Flow, Yin Yoga, Power Yoga, Restorative Yoga, and more. All pricing tiers give you access to every class type.",
  },
  {
    question: "Can I share my class pack with someone else?",
    answer:
      "Class packs are non-transferable and can only be used by the person who purchased them. However, unlimited members receive a guest pass each month!",
  },
  {
    question: "What if I need to cancel a booked class?",
    answer:
      "You can cancel up to 2 hours before class starts for a full credit refund. Late cancellations or no-shows will forfeit the class credit.",
  },
];

export function FAQ() {
  return (
    <div className="mt-16 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-sand-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-semibold text-sand-900">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sand-700">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
