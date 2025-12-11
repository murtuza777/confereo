import CallList from "@/components/ui/CallList";

export default function RecordingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white">Meeting Recordings</h1>
      <CallList type="recordings"/>
    </div>
  )
}