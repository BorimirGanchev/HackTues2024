import Cookies from "js-cookie";
class CookieWrapper {
  static setCookie(
    name: string,
    value: string,
    options?: Cookies.CookieAttributes
  ): void {
    Cookies.set(name, value, options);
  }

  static getCookie(name: string): string | undefined {
    return Cookies.get(name);
  }
}

interface CookieSettings {
  user: number;
  token: string;
}

class CookieBuilder {
  private cookieObject: {
    [K in keyof CookieSettings]: {
      set: (
        value: CookieSettings[K],
        options?: Cookies.CookieAttributes
      ) => void;
      get: () => CookieSettings[K] | null;
    };
  } = {} as any;

  setCookie<K extends keyof CookieSettings>(
    key: K,
    options?: Cookies.CookieAttributes
  ): this {
    this.cookieObject[key] = {
      set: (
        value: CookieSettings[K],
        cookieOptions?: Cookies.CookieAttributes
      ) => {
        CookieWrapper.setCookie(
          String(key),
          JSON.stringify(value),
          cookieOptions
        );
      },
      get: () => {
        const cookieValue = CookieWrapper.getCookie(String(key));
        return cookieValue
          ? (JSON.parse(cookieValue) as CookieSettings[K])
          : null;
      },
    } as any;
    return this;
  }

  build(): {
    [K in keyof CookieSettings]: {
      set: (
        value: CookieSettings[K],
        options?: Cookies.CookieAttributes
      ) => void;
      get: () => CookieSettings[K] | null;
    };
  } {
    return this.cookieObject;
  }
}

// Usage example
const cookies = new CookieBuilder()
  .setCookie("user")
  .setCookie("token", { expires: 7 }) // Example with options
  .build();

cookies.user.set(123);
console.log(cookies.user.get());
cookies.token.set("abc");
console.log(cookies.token.get());
