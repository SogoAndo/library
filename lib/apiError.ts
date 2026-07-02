const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getValidationMessages = (errors: unknown): string | null => {
  if (!isRecord(errors)) {
    return null;
  }

  const messages = Object.values(errors)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter((value): value is string => typeof value === "string");

  return messages.length > 0 ? messages.join("\n") : null;
};

export const getErrorMessage = (
  error: unknown,
  fallback = "予期せぬエラーが発生しました。",
): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

export const getResponseErrorMessage = async (
  response: Response,
  fallback: string,
): Promise<string> => {
  const errorData: unknown = await response.json().catch(() => null);

  if (isRecord(errorData)) {
    if (typeof errorData.message === "string") {
      return errorData.message;
    }

    const validationMessages = getValidationMessages(errorData.errors);
    if (validationMessages) {
      return validationMessages;
    }
  }

  return fallback;
};
