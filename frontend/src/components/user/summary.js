import { generateColor } from "@/lib/colors";

export const UserSummary = ({ user, size, className, ...props }) => {
  return (
    <div
      className={`flex justify-center items-center gap-2 w-fit text-start ${className}`}
      {...props}
    >
      <UserAvatar size={size} user={user} />
      <div className="overflow-x-hidden">
        <p className="text-sm">{user.first_name + " " + user.last_name}</p>
        <p className="text-gray-500 text-xs">{user.email}</p>
      </div>
    </div>
  );
};

export const UserAvatar = ({ user, size = "sm", className, ...props }) => {
  const bgColor = generateColor(user.email);

  const padding = {
    xs: "p-1.5",
    sm: "p-2",
    base: "p-2.5",
    lg: "p-3",
    xl: "p-3.5",
    "2xl": "p-4",
    "3xl": "p-5",
    "4xl": "p-6",
    "5xl": "p-7",
    "6xl": "p-8",
    "7xl": "p-9",
    "8xl": "p-10",
    "9xl": "p-11",
  };

  const textSize = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
    "9xl": "text-9xl",
  };

  return (
    <div className={`avatar avatar-placeholder ${className}`} {...props}>
      <div
        className={`text-neutral-content ${padding[size]} rounded-full`}
        style={{ backgroundColor: bgColor }}
      >
        <span className={`${textSize[size]} uppercase`}>
          {user.first_name.slice(0, 1) || "A"}
          {user.last_name.slice(0, 1) || "F"}
        </span>
      </div>
    </div>
  );
};
