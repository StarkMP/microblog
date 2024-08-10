"use client";

import { AppStore, createStore } from "@store";
import { login, logout } from "@store/reducers/user";
import { useRouter } from "next/navigation";
import { type JSX, type ReactNode, useEffect, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  isAuth,
  refreshToken,
  children,
}: {
  isAuth: boolean;
  refreshToken?: string;
  children: ReactNode;
}): JSX.Element {
  const storeRef = useRef<AppStore | null>(null);
  const router = useRouter();

  if (!storeRef.current) {
    storeRef.current = createStore();

    if (isAuth) {
      storeRef.current.dispatch(login());
    } else {
      storeRef.current.dispatch(logout());
    }
  }

  // Дилемма с refresh token в next.js

  // Client components (изи)
  // сделать "middleware" или кастомный хук для клиентского fetch
  // чтобы при запросе private server action, клиент проверял
  // авторизацию пользователя, и если у него только refreshToken,
  // то мы обновляем токены и только после этого делаем авторизованный запрос
  // + если токенов нет или получили ошибку при обновлении, то срабатывает редирект на страницу авторизации

  // Server components (вот тут потяжелее)
  // с вызовом server action внутри серверного компонента при наличии только refreshToken есть проблемы.
  // токен обновляется в куки через middleware, но данные из cookies() в серверный компонент доходят старые.
  // нужно придумать решение - ловить этот кейс и запрашивать токен на клиенте
  // и обновлять страницу (без допущения ее рендера во время запроса на обновление токена)
  // или как-то обновлять серверный компонент
  // upd: есть решение с чтением новых кук из middleware через headers().get("set-cookie")

  return <Provider store={storeRef.current}>{children}</Provider>;
}
