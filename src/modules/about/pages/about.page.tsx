// src/modules/about/pages/about.page.tsx

import type { ReactElement } from "react";

import { UserRound } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

import { PageTitle } from "@/components/common/page-title";

import { AboutForm } from "../components/about-form";

/* -------------------------------------------------------------------------- */
/*                                About Page                                  */
/* -------------------------------------------------------------------------- */

export function AboutPage(): ReactElement {
  return (
    <PageContainer ultraWide>
      <div className="space-y-6">
        <PageTitle
          title="About"
          description="
            Manage your professional profile,
            biography, achievements, personal
            information, statistics and portfolio
            introduction content.
          "
          actions={
            <UserRound
              className="
                text-muted-foreground
                size-5
              "
            />
          }
        />

        <AboutForm />
      </div>
    </PageContainer>
  );
}

export default AboutPage;