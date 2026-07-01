// src/modules/services/hooks/use-services-actions.ts

import { useCallback, useState } from "react";

import type { IService } from "../types";

export interface UseServicesActionsReturn {
  open: boolean;

  selectedService: IService | null;

  createService: () => void;

  editService: (service: IService) => void;

  closeServiceForm: () => void;

  setOpen: (open: boolean) => void;
}

export function useServicesActions(): UseServicesActionsReturn {
  const [open, setOpen] = useState(false);

  const [selectedService, setSelectedService] = useState<IService | null>(null);

  const createService = useCallback((): void => {
    setSelectedService(null);

    setOpen(true);
  }, []);

  const editService = useCallback((service: IService): void => {
    setSelectedService(service);

    setOpen(true);
  }, []);

  const closeServiceForm = useCallback((): void => {
    setSelectedService(null);

    setOpen(false);
  }, []);

  return {
    open,

    selectedService,

    createService,

    editService,

    closeServiceForm,

    setOpen,
  };
}
