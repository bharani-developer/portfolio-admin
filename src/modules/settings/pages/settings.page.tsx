// src\modules\settings\pages\settings.page.tsx
"use client";

import { SettingsForm } from "../components";

/* -------------------------------------------------------------------------- */
/*                               Settings Page                                */
/* -------------------------------------------------------------------------- */

export function SettingsPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      {/* Page Header */}

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

        <p className="text-muted-foreground">
          Manage portfolio branding, contact information, social profiles, and
          SEO configuration.
        </p>
      </div>

      {/* Settings Form */}

      <SettingsForm />
    </div>
  );
}

export default SettingsPage;
