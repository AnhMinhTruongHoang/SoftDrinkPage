import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  full?: boolean;
};

export const Bounded = ({
  as: Comp = "section",
  className,
  children,
  full = false,
  ...restProps
}: BoundedProps) => {
  return (
    <Comp
      className={clsx(
        full ? "" : "px-4 first:pt-10 md:px-6", // ⬅️ bỏ padding khi full
        className,
      )}
      {...restProps}
    >
      <div
        className={clsx(
          "flex w-full flex-col items-center",
          full ? "" : "mx-auto max-w-7xl",
        )}
      >
        {children}
      </div>
    </Comp>
  );
};
