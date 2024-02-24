import { Button } from "@/shared/ui";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/knetwork">
        <Button>
          Knowledge Network
        </Button>
      </Link>
    </>
  );
}
