import { fetchJson } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { User } from '@/lib/user';

interface SignInVariables {
  email: string;
  password: string;
}

interface SignUpVariables {
  username: string;
  email: string;
  password: string;
}

interface UseSingInResult {
  signIn: (email: string, password: string) => Promise<boolean>;
  signInError: boolean;
  signInLoading: boolean;
}

interface UseSingUpResult {
  signUp: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  signUpError: boolean;
  signUpLoading: boolean;
}

const USER_QUERY_KEY = 'user';

export function useSignIn(): UseSingInResult {
  const queryClient = useQueryClient();
  const mutation = useMutation<User, Error, SignInVariables>(
    ({ email, password }) =>
      fetchJson('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
  ); //post put delete
  return {
    signIn: async (email: string, password: string) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueriesData(USER_QUERY_KEY, user);
        return true;
      } catch (err) {
        return false;
      }
    },
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
  };
}

export function useSignUp(): UseSingUpResult {
  const queryClient = useQueryClient();
  const mutation = useMutation<User, Error, SignUpVariables>(
    ({ username, email, password }) =>
      fetchJson('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })
  ); //post put delete
  return {
    signUp: async (username, email, password) => {
      try {
        const user = await mutation.mutateAsync({ username, email, password });
        queryClient.setQueriesData(USER_QUERY_KEY, user);
        return true;
      } catch (error) {
        return false;
      }
    },
    signUpError: mutation.isError,
    signUpLoading: mutation.isLoading,
  };
}

export function useSignOut(): () => Promise<void> {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => fetchJson('/api/logout')); //post put delete
  return async () => {
    await mutation.mutateAsync();
    queryClient.setQueriesData(USER_QUERY_KEY, undefined);
  };
}

export function useUser(): User | undefined {
  const query = useQuery<User>(
    USER_QUERY_KEY,
    async () => {
      try {
        return await fetchJson('/api/user');
      } catch (err) {
        // not signed in
        return undefined;
      }
    },
    {
      cacheTime: Infinity,
      staleTime: 30_000, //ms
    }
  );
  return query.data;
}
