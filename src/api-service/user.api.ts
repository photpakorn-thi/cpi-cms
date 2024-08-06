import { ACTIVE_STATUS } from "@/interface/response";
import {
  fetchWithDelete,
  fetchWithGetParams,
  fetchWithPostParams,
  fetchWithPutParams,
  getUrlWithParams,
} from "@/utils/fetcher.util";
import { IParamFindAll, IResFindAll } from "./common.interface";

export interface IResUserData {
  id: number;
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  status: ACTIVE_STATUS;
  createdAt: string;
  updatedAt: string;
}

// IResFindAll

export interface IResListUser extends IResFindAll {
  data: IResUserData[];
}

export interface IBodyUser {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  status?: ACTIVE_STATUS;
}

export interface IParamUsers extends IParamFindAll {
  search?: string;
}

const baseUrl = "users";

export async function findAllUsers(
  params?: IParamUsers
): Promise<IResListUser | null> {
  try {
    const res = await fetchWithGetParams(baseUrl, params);
    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function innerFindAllUsers(
  params?: IParamUsers
): Promise<IResListUser | null> {
  try {
    const urlWithParams = getUrlWithParams(baseUrl, params);

    const res = await fetch(urlWithParams);
    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createUser(
  body: IBodyUser
): Promise<IResUserData | null> {
  try {
    const res = await fetchWithPostParams(baseUrl, body);

    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateUser(
  body: IBodyUser,
  id: number
): Promise<IResUserData | null> {
  try {
    const res = await fetchWithPutParams(`${baseUrl}/${id}`, body);
    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function removeUser(id: number): Promise<IResUserData | null> {
  try {
    const res = await fetchWithDelete(`${baseUrl}/${id}`);
    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
