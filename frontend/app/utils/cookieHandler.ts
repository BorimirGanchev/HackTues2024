// import Cookies, { CookieAttributes } from 'js-cookie';

// class CookieWrapper {
//   static setCookie(name: string, value: string, options?: Cookies.CookieAttributes): void {
//     Cookies.set(name, value, options);
//   }

//   static async getCookie(name: string): Promise<string> {
//     return Cookies.get(name);
//   }
// }


// class CookieBuilder {
//   private cookieObject: { [key: string]: { set: (value: string, options?: CookieAttributes) => void; get: () => string | undefined } } = {};

//   setCookie(key: string, options?: CookieAttributes): this {
//     this.cookieObject[key] = {
//       set: (value: string, cookieOptions?: CookieAttributes) => {
//         Cookies.set(key, value, cookieOptions);
//       },
//       get: () => {
//         return Cookies.get(key);
//       },
//     };
//     return this;
//   }

//   build(): { [key: string]: { set: (value: string, options?: CookieAttributes) => void; get: () => string | undefined } } {
//     return this.cookieObject;
//   }
// }

// // Usage example
// const cookies = new CookieBuilder()
// .setCookie('usern')
//   .setCookie('user')
//   .setCookie('token', { expires: 7 }) // Example with options
//   .build();

// // console.log(cookies.user.get()); // Get 'user' cookie
// // console.log(cookies.token.get()); // Get 'token' cookie
// // cookies.user.set('John Doe'); // Set 'user' cookie
// // console.log(cookies.user.get()); // Get 'user' cookie after setting

// cookies.u