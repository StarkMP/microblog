"use client";

import { checkSession } from "@app/actions/auth";
import { useState } from "react";

type UseFetchReturn<T extends (...args: any[]) => Promise<unknown>> = [
  (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>,
  {
    isError: boolean;
    error: unknown | null;
    isLoading: boolean;
    data: Awaited<ReturnType<T>> | null;
  }
];

type UseFetchOptions = {
  withAuth?: boolean;
};

export const useFetch = <T extends (...args: any[]) => Promise<unknown>>(
  promiseFn: T,
  options?: UseFetchOptions
): UseFetchReturn<T> => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<T>> | null>(null);

  const fetchCallback = async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    setIsLoading(true);

    try {
      if (options?.withAuth) {
        await checkSession();
      }

      const response = (await promiseFn(...args)) as Awaited<ReturnType<T>>;

      setData(response);

      return response;
    } catch (err) {
      setIsError(true);
      setError(err);

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchCallback, { isError, error, isLoading, data }];
};
