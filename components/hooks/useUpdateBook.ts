"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import type { IUpdateBookService } from "@/interfaces/IUpdateBookService";
import { getErrorMessage } from "@/lib/apiError";
import type { Book } from "@/models/Book";
import type { BookCategory } from "@/models/BookCategory";
import type { BookUpdate } from "@/models/BookUpdate";

type UpdateBookErrors = Partial<
  Record<keyof BookUpdate | "submit" | "system", string>
>;

const initialFormData: BookUpdate = {
  bookUuid: "",
  title: "",
  author: "",
  categoryId: "",
  categoryName: "",
  stock: 0,
};

export function useUpdateBook() {
  const service = useMemo(
    () => container.get<IUpdateBookService>(TYPES.IUpdateBookService),
    [],
  );

  const [formData, setFormData] = useState<BookUpdate>(initialFormData);
  const [categories, setCategories] = useState<BookCategory[]>([]);
  const [errors, setErrors] = useState<UpdateBookErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await service.getCategories();
        setCategories(data);
      } catch (error: unknown) {
        setErrors((prev) => ({
          ...prev,
          system: getErrorMessage(error, "分類一覧の取得に失敗しました。"),
        }));
      }
    };

    fetchCategories();
  }, [service]);

  const setBookForUpdate = useCallback(
    (book: Book) => {
      const category = categories.find((item) => item.name === book.category);

      setFormData({
        bookUuid: book.bookUuid,
        title: book.title,
        author: book.author,
        categoryId: category?.categoryUuid ?? "",
        categoryName: book.category,
        stock: book.stock,
      });
      setErrors({});
      setIsSuccess(false);
    },
    [categories],
  );

  const validate = useCallback(() => {
    const nextErrors: UpdateBookErrors = {};

    if (!formData.bookUuid) {
      nextErrors.bookUuid = "変更対象の図書を選択してください。";
    }

    if (!formData.title.trim()) {
      nextErrors.title = "書名を入力してください。";
    } else if (formData.title.trim().length > 50) {
      nextErrors.title = "書名は50文字以内で入力してください。";
    }

    if (!formData.author.trim()) {
      nextErrors.author = "著者名を入力してください。";
    } else if (formData.author.trim().length > 30) {
      nextErrors.author = "著者名は30文字以内で入力してください。";
    }

    if (!formData.categoryId) {
      nextErrors.categoryId = "分類を選択してください。";
    }

    if (!Number.isInteger(formData.stock) || formData.stock < 0) {
      nextErrors.stock = "蔵書数は0以上の整数で入力してください。";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" ? Number(value) : value,
    }));
  }, []);

  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      const category = categories.find((item) => item.categoryUuid === categoryId);

      setFormData((prev) => ({
        ...prev,
        categoryId,
        categoryName: category?.name ?? "",
      }));
    },
    [categories],
  );

  const handleSubmit = useCallback(async () => {
    if (!validate()) {
      return null;
    }

    setIsLoading(true);

    try {
      const result = await service.execute({
        ...formData,
        title: formData.title.trim(),
        author: formData.author.trim(),
      });
      setIsSuccess(true);
      return result;
    } catch (error: unknown) {
      setErrors((prev) => ({
        ...prev,
        submit: getErrorMessage(error, "図書変更に失敗しました。"),
      }));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [formData, service, validate]);

  const canSubmit =
    formData.bookUuid.length > 0 &&
    formData.title.trim().length > 0 &&
    formData.title.trim().length <= 50 &&
    formData.author.trim().length > 0 &&
    formData.author.trim().length <= 30 &&
    formData.categoryId.length > 0 &&
    Number.isInteger(formData.stock) &&
    formData.stock >= 0 &&
    !isLoading;

  return {
    formData,
    categories,
    errors,
    isLoading,
    isSuccess,
    canSubmit,
    setBookForUpdate,
    handleChange,
    handleCategoryChange,
    handleSubmit,
  };
}
