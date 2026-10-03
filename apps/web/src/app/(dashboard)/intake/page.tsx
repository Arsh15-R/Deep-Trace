"use client";

import React from "react";
import EvidenceIntakeWizard from "@/components/EvidenceIntakeWizard";
import { Page } from "@/animations";

export default function IntakePage() {
  return (
    <Page className="w-full">
      <EvidenceIntakeWizard />
    </Page>
  );
}
