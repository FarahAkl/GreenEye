const getCookie = ({ name }: { name: string }): string | undefined => {
  if (!name) {
    console.warn("Cookie name is required");
    return undefined;
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

interface ISetCookie {
  name: string;
  value: string;
  days?: number;
}
const setCookie = ({ name, value, days }: ISetCookie): void => {
  if (!name) {
    console.warn("Cookie name is required");
    return;
  }
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${
    value || ""
  }; ${expires}; path=/; secure; SameSite=Strict;`;
};

const deleteCookie = ({ name }: { name: string }): void => {
  if (!name) {
    console.warn("Cookie name is required");
    return;
  }
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; SameSite=Strict;`;
};

export { getCookie, setCookie, deleteCookie };
