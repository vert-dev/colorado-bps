import type { Metadata } from "next"
import EmpOMChecklistClientPage from "./EmpOMChecklistClientPage"

export const metadata: Metadata = {
  title: "EMP + O&M Checklist - Access Required",
  robots: {
    index: false,
    follow: false,
  },
}

export default function EMPOMChecklistPage() {
  return <EmpOMChecklistClientPage />
}
