import React from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

export default function ShadcnAccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. It comes with default styles that match the other components.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. Height animation is included by default for open and close.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
