import React from "react";
import { useToast } from "native-base";
import { Alert, VStack, HStack, Text, IconButton, Center } from "native-base";
import { CloseIcon } from "native-base";
import { useAppSelector } from "@src/redux/store";
import AppText from "../Text/AppText";

interface ToastDetailsItem {
  title?: string | null;
  variant?:
    | "solid"
    | "outline"
    | "subtle"
    | "left-accent"
    | "top-accent"
    | "outline-light";
  description?: string | null;
  isClosable?: boolean;
  status?: "error" | "success" | "warning" | "info";
}

const ToastAlert: React.FC<
  ToastDetailsItem & {
    id: number;
  }
> = ({
  id,
  status = "success",
  variant = "solid",
  title,
  description,
  isClosable = false,
  ...rest
}) => {
  const toast = useToast();
  const { theme } = useAppSelector(state => state.theme);

  return (
    <Alert
      maxWidth="95%"
      alignSelf="center"
      flexDirection="row"
      status={status ? status : "info"}
      variant={variant}
      {...rest}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            {title && <Alert.Icon />}
            {title && (
              <AppText
                fontStyle="600.bold"
                size={18}
                color={
                  variant === "solid"
                    ? theme.white
                    : variant !== "outline"
                      ? theme.black
                      : undefined
                }>
                {title}
              </AppText>
            )}
          </HStack>
          {isClosable ? (
            <IconButton
              variant="unstyled"
              icon={<CloseIcon size="3" />}
              _icon={{
                color: variant === "solid" ? "lightText" : "darkText",
              }}
              onPress={() => toast.close(id)}
            />
          ) : null}
        </HStack>
        {description && (
          <AppText
            fontStyle="500.semibold"
            size={14}
            color={
              variant === "solid"
                ? theme.white
                : variant !== "outline"
                  ? theme.black
                  : undefined
            }>
            {description}
          </AppText>
        )}
      </VStack>
    </Alert>
  );
};

const useAppToast = () => {
  const toast = useToast();
  const { theme } = useAppSelector(state => state.theme);

  const showToast = (
    toastDetails: ToastDetailsItem & {
      duration?: number;
      placement?:
        | "top"
        | "bottom"
        | "top-right"
        | "top-left"
        | "bottom-left"
        | "bottom-right";
    },
  ) => {
    toast.show({
      render: ({ id }) => {
        return <ToastAlert id={id} {...toastDetails} />;
      },
      placement: toastDetails?.placement ?? "bottom",
      duration: toastDetails?.duration,
    });
  };

  const showNormalToast = (data: {
    title: string;
    duration?: number;
    backgroundColor?: string;
    placement?:
      | "top"
      | "bottom"
      | "top-right"
      | "top-left"
      | "bottom-left"
      | "bottom-right";
  }) => {
    toast.show({
      title: data.title,
      placement: data?.placement ?? "bottom",
      duration: data?.duration ?? 1500,
      backgroundColor: data?.backgroundColor ?? theme.green,
      fontSize: 10,
      fontFamily: theme.Font_Regular,
      fontWeight: "400",
    });
  };

  return { showToast, showNormalToast };
};

export default useAppToast;
