"use client";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useShowToast } from "@/components/Toast";
import AuthConnect from "@/modules/AuthConnect";
import { errorMessage } from "@/utils/error";
import { useTellProfile } from "@/services/Tell";
import useInTransaction from "@/hooks/useInTransaction";

const TellBoard: React.FC = () => {
  const showToast = useShowToast();
  const { tellProfile } = useTellProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ profileId: string }>();

  const onSubmit = useCallback(async (data: { profileId: string }) => {
    try {
      const { profileId } = data;
      await tellProfile(profileId);
      showToast({ content: "tell request has been sent", type: "success" });
    } catch (err) {
      if (err instanceof Error) {
        const message = errorMessage(err);
        showToast({ content: message, type: "failed" });
      }
    }
  }, []);
  const { loading, handleExecAction } = useInTransaction(onSubmit);

  return (
    <div className="flex flex-col justify-center gap-y-[24px]">
      <div className="font-medium text-[24px] leading-[32px]">
        What does the profile tell?
      </div>
      <Input
        error={!!errors.profileId}
        title="enter the profile id"
        {...register("profileId", { required: true })}
      />
      <AuthConnect>
        <Button disabled={loading} onClick={handleSubmit(handleExecAction)}>
          TELL
        </Button>
      </AuthConnect>
    </div>
  );
};

export default TellBoard;
