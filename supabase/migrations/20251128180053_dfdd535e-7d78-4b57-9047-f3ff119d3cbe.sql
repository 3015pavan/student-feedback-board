-- Create student_feedback table
CREATE TABLE IF NOT EXISTS public.student_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  course_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comments TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.student_feedback ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anyone to read and insert feedback (public feedback board)
CREATE POLICY "Anyone can view feedback"
  ON public.student_feedback
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit feedback"
  ON public.student_feedback
  FOR INSERT
  WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX idx_feedback_created_at ON public.student_feedback(created_at DESC);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.student_feedback;