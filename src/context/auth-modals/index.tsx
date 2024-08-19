"use client";

// I created this context module for better management of auth modals
// + we render only one instance of each modal. useful

import { MODAL_FADE_TRANSITION_DELAY } from "@constants";
import { LoginModal, SignUpModal } from "@features";
import { useDisclosure } from "@mantine/hooks";
import { useAppSelector } from "@store/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type JSX, type ReactNode, createContext, useContext, useEffect } from "react";

type AuthModalsContextProps = {
  loginModalOpened: boolean;
  signUpModalOpened: boolean;
  openLoginModal: () => void;
  openSignUpModal: () => void;
  closeLoginModal: () => void;
  closeSignUpModal: () => void;
};

const AuthModalsContext = createContext<AuthModalsContextProps>({} as AuthModalsContextProps);

export const useAuthModals = (): AuthModalsContextProps => useContext(AuthModalsContext);

const AUTH_SEARCH_PARAM = "auth";
const LOGIN_PARAM_VALUE = "login";
const SIGNUP_PARAM_VALUE = "signup";

export const AuthModalsProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [loginModalOpened, { close: closeLoginModal, open: openLogin }] = useDisclosure(false);
  const [signUpModalOpened, { close: closeSignUpModal, open: openSignUp }] = useDisclosure(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  useEffect(() => {
    const hasAuthModalParam = searchParams.has(AUTH_SEARCH_PARAM);

    if (hasAuthModalParam) {
      const value = searchParams.get(AUTH_SEARCH_PARAM);

      if (value === LOGIN_PARAM_VALUE) {
        openLoginModal();
      }

      if (value === SIGNUP_PARAM_VALUE) {
        openSignUpModal();
      }
    }
  }, []);

  useEffect(() => {
    const hasAuthModalParam = searchParams.has(AUTH_SEARCH_PARAM);
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));

    if (hasAuthModalParam) {
      if (!loginModalOpened && !signUpModalOpened) {
        currentSearchParams.delete(AUTH_SEARCH_PARAM);
      }
    }

    if (loginModalOpened) {
      currentSearchParams.set(AUTH_SEARCH_PARAM, LOGIN_PARAM_VALUE);
    }

    if (signUpModalOpened) {
      currentSearchParams.set(AUTH_SEARCH_PARAM, SIGNUP_PARAM_VALUE);
    }

    const search = currentSearchParams.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }, [loginModalOpened, signUpModalOpened]);

  const handleSwitchModal = (isLogin: boolean): void => {
    if (isLogin) {
      closeLoginModal();
      setTimeout(openSignUpModal, MODAL_FADE_TRANSITION_DELAY);
    } else {
      closeSignUpModal();
      setTimeout(openLoginModal, MODAL_FADE_TRANSITION_DELAY);
    }
  };

  const openLoginModal = (): void => {
    if (isAuth || loginModalOpened) {
      return;
    }

    openLogin();
  };

  const openSignUpModal = (): void => {
    if (isAuth || signUpModalOpened) {
      return;
    }

    openSignUp();
  };

  return (
    <AuthModalsContext.Provider
      value={{
        loginModalOpened,
        signUpModalOpened,
        openLoginModal,
        openSignUpModal,
        closeLoginModal,
        closeSignUpModal,
      }}
    >
      {children}

      <LoginModal
        opened={loginModalOpened}
        onClose={closeLoginModal}
        onSwitch={(): void => handleSwitchModal(true)}
      />
      <SignUpModal
        opened={signUpModalOpened}
        onClose={closeSignUpModal}
        onSwitch={(): void => handleSwitchModal(false)}
      />
    </AuthModalsContext.Provider>
  );
};
