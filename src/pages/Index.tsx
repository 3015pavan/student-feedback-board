import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackList } from "@/components/FeedbackList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 via-background to-accent/20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Student Feedback Board
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your course experience and help us improve education for everyone
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Submit Your Feedback
            </h2>
            <FeedbackForm />
          </div>

          <div className="animate-in fade-in slide-in-from-right duration-700">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Recent Feedback
            </h2>
            <FeedbackList />
          </div>
        </div>

        <footer className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Your feedback helps create better learning experiences
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
