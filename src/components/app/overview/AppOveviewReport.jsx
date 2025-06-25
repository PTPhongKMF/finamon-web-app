import { useMutation } from "@tanstack/react-query";
import { m } from "../../../i18n/paraglide/messages";
import { Button } from "../../shadcn/button";
import { Card } from "../../shadcn/ui/card";
import clsx from "clsx";
import { ListPlus, Trash2, TriangleAlert, X } from "lucide-react";
import { ScrollArea } from "../../shadcn/scroll-area";
import { useAppReportStore } from "../../../stores/appJournalStore";
import { useShallow } from "zustand/shallow";
import { format } from "@formkit/tempo";
import { kyDjango } from "../../../api/ky";
import { generateReportMessage } from "../../../utils/aiChat";
import ReactMarkdown from "react-markdown";
import { Alert, AlertDescription, AlertTitle } from "../../shadcn/alert";
import { useUserStore } from "../../../stores/userStore";
import { useState } from "react";

export default function AppOveviewReport({ chartData }) {
  const [showReportAlert, setShowReportAlert] = useState(() => {
    return localStorage.getItem("showReportAlert") ? false : true
  })

  const user = useUserStore(state => state.user);

  const { reports, setReports } = useAppReportStore(useShallow(
    state => ({
      reports: state.reports,
      setReports: state.setReports
    })
  ));

  const generateReport = useMutation({
    mutationFn: async () => {
      return await kyDjango.post("api/chat/", {
        json: {
          message: generateReportMessage(chartData)
        },
        timeout: false
      }).json()
    },
    onSuccess: (data) => {
      setReports({
        text: data.reply,
        date: new Date()
      })
    }
  })

  return (
    <Card className="flex flex-col gap-2 bg-neutral-50 border-t-8 border-x-2 border-yellow-400">

      <div className="flex justify-between items-center px-4 py-2 shadow-sm">
        <p className="text-xl font-semibold">{m["app.expenseReport"]() + " : "}</p>
        <div className="flex justify-center items-center gap-2">
          <Button disabled={generateReport.isPending} onClick={generateReport.mutate}
            className={clsx("flex justify-center items-center",
              generateReport.isPending ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-amber-400 hover:bg-yellow-600"
            )}>
            <ListPlus />
            {m["app.generateReport"]()}
          </Button>

          <Button disabled={generateReport.isPending} onClick={() => setReports(null)}
            className={clsx("flex justify-center items-center",
              generateReport.isPending ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-red-400 hover:bg-red-600"
            )}>
            <Trash2 />
            {m["app.clearReport"]()}
          </Button>
        </div>
      </div>

      {generateReport.isError && (
        <p className="text-sm text-red-500 px-4 font-semibold">
          {generateReport.error.message}
        </p>
      )}

      <ScrollArea className="flex justify-center items-center px-2 pb-1 w-full">
        <div className="flex flex-col gap-8 p-2 w-full h-fit max-h-140 rounded-lg">
          {!reports?.stored[0] ? (
            <p className="italic flex justify-center items-center text-gray-400 rounded-lg min-h-50">{m["common.empty"]()}</p>
          ) : (
            reports?.stored && (
              reports.stored?.slice().reverse().map((report, index) => (
                <div key={index} className="grid auto-rows-auto gap-1">
                  <p className="text-xs text-gray-400 justify-self-start">{format(report.date, "DD/MM/YYYY, HH:mm:ss")}</p>
                  <div className="text-sm p-2 rounded-md bg-gray-200">
                    <ReactMarkdown>
                      {report.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </ScrollArea>

      {(user.subscription !== "Pro" && showReportAlert) && (
        <Alert
        className="rounded-none rounded-b-xl text-amber-600">
          <TriangleAlert />
          <AlertTitle className="flex justify-between">
            <p>{m["app.alert.headsup"]()}</p>
            <button className="hover:bg-black/10 cursor-pointer rounded-md" onClick={() => {setShowReportAlert(false); localStorage.setItem("showReportAlert", "1")}}>
            <X />
            </button>
            </AlertTitle>
          <AlertDescription className="text-yellow-600">
            {m["app.alert.reportFreeSubscription"]()}
          </AlertDescription>
        </Alert>
      )}

    </Card>
  )
}
