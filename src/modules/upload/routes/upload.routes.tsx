// src\modules\upload\routes\upload.routes.tsx
import type { ReactElement } from "react";

import { ImageUpload } from "../components";

import type { IImageUploadValue } from "../types";

/* -------------------------------------------------------------------------- */
/*                               Upload Page                                  */
/* -------------------------------------------------------------------------- */

function UploadPage(): ReactElement {
  const handleChange = (value: IImageUploadValue | null): void => {
    console.log("Uploaded image:", value);
  };

  return (
    <div
      className="
        space-y-6
      "
    >
      <div>
        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
          "
        >
          Upload Manager
        </h1>

        <p
          className="
            text-muted-foreground
            mt-2
            text-sm
          "
        >
          Upload and manage images used throughout the portfolio application.
        </p>
      </div>

      <div
        className="
          max-w-2xl
          rounded-2xl
          border
          bg-card
          p-6
          shadow-sm
        "
      >
        <ImageUpload onChange={handleChange} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export { UploadPage };
