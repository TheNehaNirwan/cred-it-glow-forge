import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    description: ""
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || formData.rating === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and provide a rating.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await api.submitTestimonial(formData.name, formData.rating, formData.description);
      
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });

      // Reset form
      setFormData({
        name: "",
        rating: 0,
        description: ""
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isActive = starValue <= (hoveredRating || formData.rating);
      
      return (
        <Star
          key={index}
          className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
            isActive 
              ? "text-yellow-400 fill-yellow-400 scale-110" 
              : "text-gray-300 hover:text-yellow-200"
          }`}
          onClick={() => handleRatingClick(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
        />
      );
    });
  };

  return (
    <div className="mt-12">
      <Card className="border-0 shadow-elegant animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground text-center">
            Share Your Experience
          </CardTitle>
          <p className="text-muted-foreground text-center">
            We'd love to hear about your experience with our services!
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Name *
              </label>
              <Input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="h-12"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Rating *
              </label>
              <div className="flex justify-center gap-2 mb-2">
                {renderStars()}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {formData.rating > 0 && `${formData.rating} star${formData.rating > 1 ? 's' : ''}`}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Feedback *
              </label>
              <Textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell us about your experience with our services..."
                className="min-h-32 resize-none"
                required
              />
            </div>

            <Button 
              type="submit"
              variant="hero" 
              size="lg" 
              className="w-full group animate-pulse-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
              <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackForm;