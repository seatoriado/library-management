"use client";
import { aiInsightsBook } from "@/services/book-service";
import { useState } from "react";
import Alert from "../ui/alert";

const BookInsightsButton = ({ id }: { id: string }) => {
  const [insight, setInsight] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const errorProp = {
    type: "error",
    message:
      "Unable to retrieve AI Insights at the time. Please try again later.",
  };

  function onClick() {
    setIsLoading(true);

    aiInsightsBook(id).then((body) => {
      setIsLoading(false);
      if (body) {
        setInsight(body.insights);
        setIsError(false);
      } else {
        setIsError(true);
      }
    });
  }

  return (
    <div className="mt-4">
      {!insight && (
        <button
          className="bg-transparent py-2 px-4 text-blue-700 border border-blue-500 rounded disabled:text-gray-700 disabled:border-gray-500"
          onClick={onClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading" : "AI Insights"}
        </button>
      )}
      {insight && (
        <div>
          <div>AI Insight:</div>
          <div>{insight}</div>
        </div>
      )}
      {isError && <Alert {...errorProp} />}
    </div>
  );
};

export { BookInsightsButton };
