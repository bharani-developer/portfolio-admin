import type { EducationFormValues } from "../schemas";

import type {
  ICreateEducationPayload,
  IUpdateEducationPayload,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                       Build Education Create Payload                       */
/* -------------------------------------------------------------------------- */

export function buildCreateEducationPayload(
  values: EducationFormValues,
): ICreateEducationPayload {
  return {
    institution: values.institution,

    degree: values.degree,

    fieldOfStudy: values.fieldOfStudy,

    educationLevel: values.educationLevel,

    educationType: values.educationType,

    location: values.location,

    startDate: values.startDate,

    endDate: values.endDate.trim() ? values.endDate : null,

    isCurrent: values.isCurrent,

    gradeType: values.gradeType,

    ...(values.grade.trim() && {
      grade: values.grade.trim(),
    }),

    ...(values.description.trim() && {
      description: values.description.trim(),
    }),

    achievements: values.achievements,

    skills: values.skills,

    ...(values.institutionWebsite.trim() && {
      institutionWebsite: values.institutionWebsite.trim(),
    }),

    sortOrder: values.sortOrder,

    isActive: values.isActive,

    ...(values.institutionLogo
      ? {
          institutionLogo: values.institutionLogo,
        }
      : {}),
  };
}

/* -------------------------------------------------------------------------- */
/*                       Build Education Update Payload                       */
/* -------------------------------------------------------------------------- */

export function buildUpdateEducationPayload(
  values: EducationFormValues,
): IUpdateEducationPayload {
  return buildCreateEducationPayload(values);
}
