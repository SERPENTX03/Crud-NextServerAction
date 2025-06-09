"use client";

import { initialState } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

type FormContainerProps = {
  children: React.ReactNode;
  action: (
    _prevState: initialState,
    formData: FormData
  ) => Promise<initialState>;
  redirect?: string;
};

const FormContainer = ({ children, action, redirect }: FormContainerProps) => {
  const [state, formAction] = useActionState<initialState, FormData>(action, {
    message: "",
    success: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success && state.message) {
      if (redirect) router.push(redirect);
      router.refresh();
      toast(state.message);
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router, redirect]);

  return <form action={formAction}>{children}</form>;
};
export default FormContainer;
