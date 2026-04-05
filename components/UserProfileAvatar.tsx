import { PersonIcon } from "@/helper/Icon";
import Image from "next/image";
import Link from "next/link";

function UserAvatar({ user }: { user?: { name: string; avatarUrl?: string } }) {
  return (
    <Link
      href="/profile"
      className="relative flex shrink-0 items-center justify-center"
    >
      {/* Person icon circle */}
      {user?.avatarUrl ? (
        <Image
          width={36}
          height={36}
          src={user.avatarUrl}
          alt={user.name}
          className="size-9 rounded-full object-cover border border-grey-200"
        />
      ) : (
        <div className="flex size-9 items-center justify-center rounded-full border border-grey-200 bg-white text-grey-500 hover:border-purple-300 transition-colors">
          <PersonIcon />
        </div>
      )}
      {/* Orange status dot */}
      <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-[#f4a316] ring-2 ring-grey-100" />
    </Link>
  );
}

export default UserAvatar;
