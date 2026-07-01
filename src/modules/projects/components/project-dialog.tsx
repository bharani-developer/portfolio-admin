import type { ReactElement } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ProjectForm } from "./project-form";

import type { IProject } from "../types";

import type { ProjectFormValues } from "../schemas";

interface ProjectDialogProps {
  open: boolean;

  project?: IProject | null;

  isLoading?: boolean;

  onOpenChange: (open: boolean) => void;

  onSubmit: (values: ProjectFormValues) => Promise<void>;
}

export function ProjectDialog({
  open,
  project,
  isLoading = false,
  onOpenChange,
  onSubmit,
}: ProjectDialogProps): ReactElement {
  const defaultValues: Partial<ProjectFormValues> | undefined = project
    ? {
        title: project.title,

        shortDescription: project.shortDescription,

        description: project.description,

        thumbnail: project.thumbnail,

        gallery: project.gallery ?? [],

        technologies: project.technologies ?? [],

        category: project.category,

        status: project.status,

        githubUrl: project.githubUrl ?? "",

        liveUrl: project.liveUrl ?? "",

        startDate: project.startDate ?? "",

        endDate: project.endDate ?? "",

        sortOrder: project.sortOrder,

        featured: project.featured,

        isActive: project.isActive,
      }
    : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-h-[90vh]
          overflow-y-auto
          sm:max-w-5xl
        "
      >
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Create Project"}
          </DialogTitle>

          <DialogDescription>
            Manage project details, technologies, media assets, visibility,
            portfolio settings, and project metadata.
          </DialogDescription>
        </DialogHeader>

        <ProjectForm
          {...(defaultValues ? { defaultValues } : {})}
          isLoading={isLoading}
          submitText={project ? "Update Project" : "Create Project"}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ProjectDialog;
