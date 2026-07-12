// src/modules/hero/pages/hero.page.tsx

import type { ReactElement } from "react";

import { Sparkles } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

import { PageTitle } from "@/components/common/page-title";

import { HeroForm } from "../components/hero-form";

/* -------------------------------------------------------------------------- */
/*                                 Hero Page                                  */
/* -------------------------------------------------------------------------- */

export function HeroPage(): ReactElement {
  return (
    <PageContainer>
      <div className="space-y-6">
        <PageTitle
          title="Hero Section"
          description="
            Manage hero content, introduction text,
            profile highlights, call-to-action buttons,
            social links and resume settings.
          "
          actions={
            <Sparkles
              className="
                text-muted-foreground
                size-5
              "
            />
          }
        />

        <HeroForm />
      </div>
    </PageContainer>
  );
}

export default HeroPage;
