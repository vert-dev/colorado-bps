import type { Metadata } from "next"
import WebinarSignupClientPage from "./WebinarSignupClientPage"

export const metadata: Metadata = {
  title: "Webinar Signup - Access Required",
  robots: {
    index: false,
    follow: false,
  },
}

export default function WebinarSignupPage() {
  return <WebinarSignupClientPage />
}
