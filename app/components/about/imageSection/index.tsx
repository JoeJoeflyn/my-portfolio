import Image from "next/image";

export default function ProfileSection() {
  return (
    <div className="relative h-16 w-16">
      <Image
        fill={true}
        src="/images/avatar.jpg"
        alt="Avatar"
        className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
      />
    </div>
  );
}
