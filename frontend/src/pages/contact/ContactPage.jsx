import Breadcrumb from "@/components/layouts/Breadcrumb";
import React from "react";
import ContactForm from "./ContactForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Target, ShieldCheck, Code2, Bug } from "lucide-react";

export default function ContactPage() {
  const tips = [
    {
      icon: Target,
      title: "Clear Requirements",
      description:
        "Provide detailed specifications of your trading strategy, risk tolerance, and expected outcomes.",
    },
    {
      icon: ShieldCheck,
      title: "Strict NDA",
      description: "Strict NDA Strategy Confidentiality",
    },
    {
      icon: Code2,
      title: "100% Unlocked Source Code",
      description: "100% Unlocked Source Code Ownership",
    },
    {
      icon: Bug,
      title: "180 Days Bug-Free Guarantee",
      description: "180 Days Bug-Free Guarantee Support",
    },
  ];
  return (
    <div className="min-h-screen container px-4 mx-auto flex items-center flex-col gap-4">
      <Breadcrumb />

      <div className="grid lg:grid-cols-2 gap-4 w-full ">
        <div className="flex flex-col gap-4">
          <Badge className="p-4  shadow-lg" variant="outline">
            Get in Touch
          </Badge>

          <div className="flex flex-col gap-4 max-w-xl">
            <h1 className="text-4xl font-bold">
              Ready to Automate Your Trading Strategy?
            </h1>
            <p className="text-muted-foreground">
              Let's discuss how we can engineer your custom Expert Advisor (EA),
              indicator, copy trading system, or API bridge. Every project
              includes a signed NDA, full source code delivery, and 6 months of
              bug support.
            </p>
          </div>

          <hr className="border-border" />

          <div>
            <div className="mb-5">
              <p className="text-sm font-medium text-primary">
                WHY WORK WITH US
              </p>

              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Built with confidence
              </h2>
            </div>

            <Card className="overflow-hidden border-border/60 bg-background/60 shadow-sm backdrop-blur">
              <CardContent className="p-0">
                {tips.map((tip, index) => {
                  const Icon = tip.icon;

                  return (
                    <div
                      key={tip.title}
                      className={`group flex gap-4 p-5 transition-colors hover:bg-muted/40 ${
                        index !== tips.length - 1
                          ? "border-b border-border/60"
                          : ""
                      }`}
                    >
                      {/* Number / Icon */}
                      <div className="flex shrink-0 flex-col items-center gap-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform group-hover:scale-105">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-semibold">{tip.title}</h3>

                          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
