import { Sparkles } from 'lucide-react';

interface AIFeedbackCardProps {
  title: string;
  message: string;
}

export default function AIFeedbackCard({ title, message }: AIFeedbackCardProps) {
  return (
    <div className="bg-surface rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <Sparkles size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-text">AI 피드백</h3>
          <p className="text-sm text-text-secondary">{title}</p>
        </div>
      </div>
      <div className="bg-accent rounded-xl p-4">
        <p className="text-text leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
