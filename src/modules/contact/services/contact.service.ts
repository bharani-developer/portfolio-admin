// src/modules/contact/services/contact.service.ts

import { API_ENDPOINTS } from "@/constants/api-endpoints.constants";
import { httpClient } from "@/shared/services/http-client";

import type {
  IContactQueryParams,
  IContactResponse,
  IContactsResponse,
  IContactStatsResponse,
  ICreateContactPayload,
  ICreateContactResponse,
  IDeleteContactResponse,
  IUpdateContactPayload,
  IUpdateContactResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                              Contact Service                               */
/* -------------------------------------------------------------------------- */

class ContactService {
  /* ------------------------------------------------------------------------ */
  /*                               URL Helpers                                */
  /* ------------------------------------------------------------------------ */

  private readonly endpoint = API_ENDPOINTS.CONTACT;

  private byId(id: string): string {
    return `${this.endpoint}/${id}`;
  }

  /* ------------------------------------------------------------------------ */
  /*                               Get Contacts                               */
  /* ------------------------------------------------------------------------ */

  async getContacts(params?: IContactQueryParams): Promise<IContactsResponse> {
    const { data } = await httpClient.get<IContactsResponse>(this.endpoint, {
      params,
    });

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                              Get Contact                                 */
  /* ------------------------------------------------------------------------ */

  async getContactById(id: string): Promise<IContactResponse> {
    const { data } = await httpClient.get<IContactResponse>(this.byId(id));

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                            Contact Statistics                            */
  /* ------------------------------------------------------------------------ */

  async getContactStats(): Promise<IContactStatsResponse> {
    const { data } = await httpClient.get<IContactStatsResponse>(
      `${this.endpoint}/stats`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                             Active Contacts                              */
  /* ------------------------------------------------------------------------ */

  async getActiveContacts(): Promise<IContactsResponse> {
    const { data } = await httpClient.get<IContactsResponse>(
      `${this.endpoint}/active`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                             Unread Contacts                              */
  /* ------------------------------------------------------------------------ */

  async getUnreadContacts(): Promise<IContactsResponse> {
    const { data } = await httpClient.get<IContactsResponse>(
      `${this.endpoint}/unread`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                               Read Contacts                              */
  /* ------------------------------------------------------------------------ */

  async getReadContacts(): Promise<IContactsResponse> {
    const { data } = await httpClient.get<IContactsResponse>(
      `${this.endpoint}/read`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                            Replied Contacts                              */
  /* ------------------------------------------------------------------------ */

  async getRepliedContacts(): Promise<IContactsResponse> {
    const { data } = await httpClient.get<IContactsResponse>(
      `${this.endpoint}/replied`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                              Create Contact                              */
  /* ------------------------------------------------------------------------ */

  async createContact(
    payload: ICreateContactPayload,
  ): Promise<ICreateContactResponse> {
    const { data } = await httpClient.post<ICreateContactResponse>(
      this.endpoint,
      payload,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                              Update Contact                              */
  /* ------------------------------------------------------------------------ */

  async updateContact(
    id: string,
    payload: IUpdateContactPayload,
  ): Promise<IUpdateContactResponse> {
    const { data } = await httpClient.patch<IUpdateContactResponse>(
      this.byId(id),
      payload,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                              Delete Contact                              */
  /* ------------------------------------------------------------------------ */

  async deleteContact(id: string): Promise<IDeleteContactResponse> {
    const { data } = await httpClient.delete<IDeleteContactResponse>(
      this.byId(id),
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                              Mark As Read                                */
  /* ------------------------------------------------------------------------ */

  async markAsRead(id: string): Promise<IUpdateContactResponse> {
    const { data } = await httpClient.patch<IUpdateContactResponse>(
      `${this.byId(id)}/read`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                            Mark As Replied                               */
  /* ------------------------------------------------------------------------ */

  async markAsReplied(id: string): Promise<IUpdateContactResponse> {
    const { data } = await httpClient.patch<IUpdateContactResponse>(
      `${this.byId(id)}/replied`,
    );

    return data;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const contactService = new ContactService();
