const APP_TIME_ZONE = "Africa/Cairo";
const UTC_WITHOUT_TIMEZONE_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/;

const parseAppDate = (value: string) => {
  const normalizedValue = UTC_WITHOUT_TIMEZONE_REGEX.test(value)
    ? `${value}Z`
    : value;

  return new Date(normalizedValue);
};

export const formatDate = (
  value?: string | null,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: APP_TIME_ZONE,
  },
) => {
  if (!value) return "N/A";

  const date = parseAppDate(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(locale, options);
};

export const formatDateTime = (
  value?: string | null,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: APP_TIME_ZONE,
  },
) => {
  if (!value) return "N/A";

  const date = parseAppDate(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString(locale, options);
};
