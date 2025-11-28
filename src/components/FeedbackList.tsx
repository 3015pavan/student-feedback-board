import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

type Feedback = {
  id: string;
  name: string;
  email: string;
  course_name: string;
  rating: number;
  comments: string | null;
  created_at: string;
};

export const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();

    const channel = supabase
      .channel("feedback-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "student_feedback",
        },
        () => {
          fetchFeedbacks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFeedbacks = async () => {
    const { data, error } = await supabase
      .from("student_feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching feedback:", error);
    } else {
      setFeedbacks(data || []);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading feedback...</p>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-12 bg-accent/50 rounded-2xl border border-border">
        <p className="text-muted-foreground">No feedback yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <div
          key={feedback.id}
          className="bg-card p-6 rounded-2xl shadow-md border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg text-foreground">
                  {feedback.name}
                </h3>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < feedback.rating
                          ? "fill-secondary text-secondary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-primary font-medium mb-1">
                {feedback.course_name}
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                {format(new Date(feedback.created_at), "MMM d, yyyy 'at' h:mm a")}
              </p>
              {feedback.comments && (
                <p className="text-foreground/80 leading-relaxed">
                  {feedback.comments}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
