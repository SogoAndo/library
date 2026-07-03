"use client";

import { useCallback, useMemo, useState } from "react";
import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import type { IDeleteBookService } from "@/interfaces/IDeleteBookService";
import { getErrorMessage } from "@/lib/apiError";
import type { Book } from "@/models/Book";
import type { BookDeletion } from "@/models/BookDeletion";

type DeleteBookErrors = Partial<
  Record<keyof BookDeletion | "submit", string>
>;

const initialFormData: BookDeletion = {
  bookUuid: "",
};

export function useDeleteBook() {
  const service = useMemo(
    () => container.get<IDeleteBookService>(TYPES.IDeleteBookService),
    [],
  );

  const [formData, setFormData] = useState<BookDeletion>(initialFormData);
  const [targetBook, setTargetBook] = useState<Book | null>(null);
  const [errors, setErrors] = useState<DeleteBookErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const setBookForDeletion = useCallback((book: Book) => {
    setTargetBook(book);
    setFormData({ bookUuid: book.bookUuid });
    setErrors({});
    setIsSuccess(false);
  }, []);

  const validate = useCallback(() => {
    const nextErrors: DeleteBookErrors = {};

    if (!formData.bookUuid) {
      nextErrors.bookUuid = "削除対象の図書を選択してください。";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) {
      return false;
    }

    setIsLoading(true);

    try {
      await service.execute(formData);
      setIsSuccess(true);
      setTargetBook(null);
      setFormData(initialFormData);
      return true;
    } catch (error: unknown) {
      setErrors((prev) => ({
        ...prev,
        submit: getErrorMessage(error, "図書削除に失敗しました。"),
      }));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [formData, service, validate]);

  const canSubmit = formData.bookUuid.length > 0 && !isLoading;

  return {
    targetBook,
    errors,
    isLoading,
    isSuccess,
    canSubmit,
    setBookForDeletion,
    handleSubmit,
  };
}
