import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course_name: "",
    rating: 0,
    comments: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from("student_feedback")
      .insert([formData]);

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to submit feedback. Please try again.");
      console.error("Error submitting feedback:", error);
    } else {
      toast.success("Thank you for your feedback!");
      setFormData({
        name: "",
        email: "",
        course_name: "",
        rating: 0,
        comments: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl shadow-lg border border-border">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          placeholder="your.email@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="course_name">Course Name</Label>
        <Input
          id="course_name"
          value={formData.course_name}
          onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
          required
          placeholder="e.g., Introduction to Computer Science"
        />
      </div>

      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({ ...formData, rating: star })}
              className="transition-all hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= formData.rating
                    ? "fill-secondary text-secondary"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comments">Comments (Optional)</Label>
        <Textarea
          id="comments"
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          placeholder="Share your thoughts about the course..."
          rows={4}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-teal)]"
      >
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
};
